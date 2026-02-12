// ============================================================
// InstaScraping — Supabase Client (lectura del historial)
// Usa la CDN de @supabase/supabase-js
// ============================================================

/**
 * Inicializa y retorna el cliente de Supabase.
 * Usa CONFIG.SUPABASE_URL y CONFIG.SUPABASE_ANON_KEY de config.js.
 */
function getSupabaseClient() {
    if (!window._supabaseClient) {
        if (typeof supabase === 'undefined' || !supabase.createClient) {
            console.error('Supabase JS no cargado. Asegúrate de incluir el CDN.');
            return null;
        }
        window._supabaseClient = supabase.createClient(
            CONFIG.SUPABASE_URL,
            CONFIG.SUPABASE_ANON_KEY
        );
    }
    return window._supabaseClient;
}

/**
 * Carga el historial de perfiles con sus posts.
 * Ordena por fecha de scrape descendente.
 */
async function loadHistory() {
    const client = getSupabaseClient();
    if (!client) throw new Error('Supabase no disponible');

    const { data, error } = await client
        .from('profiles')
        .select('*, posts(*)')
        .order('scraped_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

/**
 * Carga un perfil específico por username con sus posts.
 */
async function loadProfile(username) {
    const client = getSupabaseClient();
    if (!client) throw new Error('Supabase no disponible');

    const { data, error } = await client
        .from('profiles')
        .select('*, posts(*)')
        .eq('username', username)
        .single();

    if (error) throw error;
    return data;
}

/**
 * Carga los posts de un perfil por profile_id, ordenados por fecha.
 */
async function loadPostsByProfile(profileId) {
    const client = getSupabaseClient();
    if (!client) throw new Error('Supabase no disponible');

    const { data, error } = await client
        .from('posts')
        .select('*')
        .eq('profile_id', profileId)
        .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
}
