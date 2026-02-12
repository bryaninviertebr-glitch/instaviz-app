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
     * Trigger scraping via webhook y espera resultado.
     */
    async function triggerScrape(profileUrl, postsLimit = 10) {
        const webhookUrl = CONFIG.WEBHOOK_URL;
        if (!webhookUrl) {
            throw new Error('WEBHOOK_URL no configurado en config.js');
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profileUrl, postsLimit }),
        });

        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}`);
        }

        // Invalidar cache para siguiente carga
        clearCache();
        return response.json();
    }

    // Public API
    const api = {
        loadAllPosts,
        clearCache,
        triggerScrape,
        getClient
    };

    window.DataService = api;
    return api;
})();
