// ============================================================
// InstaViz — Data Service (Supabase → Apify Format)
// ============================================================
// Capa de abstracción que lee de Supabase y retorna datos
// en el formato Apify que todas las páginas esperan.
// ============================================================

const DataService = (() => {
    let _client = null;
    let _cache = null;

    /**
     * Inicializa y retorna el cliente de Supabase.
     */
    function getClient() {
        if (!_client) {
            if (typeof supabase === 'undefined' || !supabase.createClient) {
                console.error('[DataService] Supabase JS no cargado. Incluye el CDN.');
                return null;
            }
            _client = supabase.createClient(
                CONFIG.SUPABASE_URL,
                CONFIG.SUPABASE_ANON_KEY
            );
            console.log('[DataService] Cliente Supabase inicializado');
        }
        return _client;
    }

    /**
     * Mapea un post de Supabase al formato Apify.
     * Supabase: { likes_count, comments_count, display_url, published_at, post_url, ... }
     * Apify:    { likesCount, commentsCount, displayUrl, timestamp, url, ... }
     */
    function mapPostToApify(post, profile) {
        return {
            // Identifiers
            id: post.id,
            shortCode: post.shortcode || '',

            // Owner info (from joined profile)
            ownerUsername: profile ? profile.username : (post.owner_username || ''),
            ownerFullName: profile ? profile.full_name : (post.owner_full_name || ''),

            // Engagement
            likesCount: Number(post.likes_count || 0),
            commentsCount: Number(post.comments_count || 0),
            videoViewCount: Number(post.video_views || 0),

            // Content
            caption: post.caption || '',
            hashtags: post.hashtags || [],
            type: post.type || 'Image',

            // Media
            displayUrl: post.display_url || '',
            images: post.display_url ? [post.display_url] : [],

            // Dates
            timestamp: post.published_at || post.created_at || new Date().toISOString(),

            // Links
            url: post.post_url || '',

            // Keep original Supabase data for reference
            _supabase: post
        };
    }

    /**
     * Carga TODOS los posts desde Supabase con join a profiles.
     * Retorna un array en formato Apify compatible.
     */
    async function loadAllPosts() {
        // Return cache if available
        if (_cache) {
            console.log('[DataService] Retornando datos cacheados');
            return _cache;
        }

        const client = getClient();
        if (!client) throw new Error('Supabase no disponible');

        console.log('[DataService] Cargando posts desde Supabase...');

        // Load posts with profile join
        const { data, error } = await client
            .from('posts')
            .select('*, profiles!inner(username, full_name)')
            .order('published_at', { ascending: false });

        if (error) {
            console.error('[DataService] Error cargando posts:', error);
            throw error;
        }

        // Map to Apify format
        const posts = (data || []).map(row => {
            const profile = row.profiles || {};
            return mapPostToApify(row, profile);
        });

        console.log(`[DataService] ${posts.length} posts cargados desde Supabase`);
        _cache = posts;
        return posts;
    }

    /**
     * Invalida el cache para forzar recarga.
     */
    function clearCache() {
        _cache = null;
        console.log('[DataService] Cache invalidado');
    }

    /**
     * Trigger scraping nativo via /api/start-scrape (async Apify run).
     * Fires the run immediately (< 2s), then polls /api/fetch-run every 5s
     * until the run succeeds or fails. Compatible con Vercel Hobby (60s limit).
     */
    async function triggerScrape(profileUrl, postsLimit = 10) {
        // Extract bare username from a full Instagram URL or plain username
        const match = profileUrl.match(/instagram\.com\/([^/?#]+)/);
        const username = match ? match[1] : profileUrl.replace(/\//g, '');

        // Step 1: fire the async Apify run — returns in < 2s
        const startResponse = await fetch('/api/start-scrape', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, postsLimit }),
        });

        if (!startResponse.ok) {
            const errorData = await startResponse.json();
            throw new Error(errorData.error || `Error HTTP ${startResponse.status}`);
        }

        const { runId, datasetId } = await startResponse.json();
        console.log(`[DataService] Run iniciado: ${runId}. Comenzando polling...`);

        // Step 2: poll /api/fetch-run every 5s until done (max 2 minutes)
        const MAX_ATTEMPTS = 24; // 24 × 5s = 120s
        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            await new Promise(r => setTimeout(r, 5000));

            const pollRes = await fetch(
                `/api/fetch-run?runId=${encodeURIComponent(runId)}&datasetId=${encodeURIComponent(datasetId)}&username=${encodeURIComponent(username)}`
            );

            if (!pollRes.ok) {
                const errData = await pollRes.json().catch(() => ({}));
                throw new Error(errData.error || `Error HTTP ${pollRes.status}`);
            }

            const result = await pollRes.json();

            if (result.pending) {
                console.log(`[DataService] Run pendiente (intento ${attempt}/${MAX_ATTEMPTS})...`);
                continue;
            }

            if (result.failed || !result.success) {
                throw new Error(result.error || 'El run de Apify falló');
            }

            // success — data is now in Supabase
            clearCache();
            return result;
        }

        throw new Error('Timeout: el scraping tardó más de 2 minutos');
    }

    /**
     * Retorna métricas promedio (likes, comments, frecuencia) de todos los
     * perfiles que pertenecen a un groupId específico, para usar como
     * línea base de benchmarking. Los promedios se calculan por perfil
     * (media de medias) para evitar sesgo por volumen de posts.
     *
     * @param {string} groupId - ID del grupo en business-groups.json
     * @returns {object|null} benchmarks o null si el grupo está vacío
     */
    async function getGroupBenchmarks(groupId) {
        // Cargar configuración de grupos
        let config;
        try {
            const res = await fetch('/business-groups.json?t=' + Date.now());
            config = await res.json();
        } catch (err) {
            console.error('[DataService] Error cargando business-groups.json:', err);
            return null;
        }

        const group = (config.groups || []).find(g => g.id === groupId);
        if (!group || !group.accounts || group.accounts.length === 0) return null;

        // Usar posts ya cacheados para no gastar queries
        const allPosts = await loadAllPosts();
        const groupPosts = allPosts.filter(p => group.accounts.includes(p.ownerUsername));

        if (groupPosts.length === 0) return null;

        // Agrupar por perfil
        const byProfile = {};
        groupPosts.forEach(p => {
            if (!byProfile[p.ownerUsername]) byProfile[p.ownerUsername] = [];
            byProfile[p.ownerUsername].push(p);
        });

        const fourWeeksAgo = Date.now() - 28 * 24 * 60 * 60 * 1000;

        // Métricas por perfil (media de medias para equidad)
        const profileMetrics = Object.values(byProfile).map(posts => {
            const totalLikes = posts.reduce((s, p) => s + (p.likesCount || 0), 0);
            const totalComments = posts.reduce((s, p) => s + (p.commentsCount || 0), 0);
            const avgLikes = totalLikes / posts.length;
            const avgComments = totalComments / posts.length;
            const postFreq = posts.filter(p => p.timestamp && new Date(p.timestamp).getTime() > fourWeeksAgo).length;
            return { avgLikes, avgComments, postFreq };
        });

        const peerCount = profileMetrics.length;
        const avgLikes = profileMetrics.reduce((s, m) => s + m.avgLikes, 0) / peerCount;
        const avgComments = profileMetrics.reduce((s, m) => s + m.avgComments, 0) / peerCount;
        const avgPostFreq = profileMetrics.reduce((s, m) => s + m.postFreq, 0) / peerCount;

        return {
            groupId: group.id,
            groupName: group.name,
            groupIcon: group.icon || '📁',
            peerCount,
            accounts: group.accounts,
            avgLikes,
            avgComments,
            avgPostFreq
        };
    }

    /**
     * Dispara la sincronización de imágenes de un perfil al backend local.
     * El servidor descargará las fotos del CDN de Instagram y las subirá
     * a Supabase Storage, actualizando las URLs en la base de datos.
     * La operación corre en background; esta función retorna inmediatamente.
     *
     * @param {string} username - Username del perfil a sincronizar
     */
    async function syncImages(username) {
        const res = await fetch(`/api/sync-images?username=${encodeURIComponent(username)}`, { method: 'POST' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        clearCache(); // Invalidar cache para que la próxima carga use las URLs nuevas
        return res.json();
    }

    /**
     * Retorna el perfil completo de un username específico.
     * Incluye bio, seguidores, imagen, etc.
     */
    async function getProfileByUsername(username) {
        const client = getClient();
        if (!client) throw new Error('Supabase no disponible');

        const { data, error } = await client
            .from('profiles')
            .select('*')
            .eq('username', username)
            .single();

        if (error) throw error;
        return data;
    }

    /**
     * Retorna todos los posts de un perfil específico por profile_id.
     * Retorna en formato Apify compatible.
     */
    async function getPostsByProfileId(profileId) {
        const client = getClient();
        if (!client) throw new Error('Supabase no disponible');

        const { data, error } = await client
            .from('posts')
            .select('*')
            .eq('profile_id', profileId)
            .order('published_at', { ascending: false });

        if (error) throw error;

        const profile = null; // posts ya contienen owner info
        return (data || []).map(row => mapPostToApify(row, profile));
    }

    // Public API
    const api = {
        loadAllPosts,
        clearCache,
        triggerScrape,
        getClient,
        syncImages,
        getProfileByUsername,
        getPostsByProfileId,
        getGroupBenchmarks
    };

    window.DataService = api;
    return api;
})();
