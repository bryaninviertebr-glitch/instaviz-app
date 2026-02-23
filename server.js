const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');

// Load env vars
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Admin Client
const supabaseUrl = process.env.SUPABASE_URL ? process.env.SUPABASE_URL.replace(/^["']|["']$/g, '').trim() : null;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ? process.env.SUPABASE_SERVICE_ROLE_KEY.replace(/^["']|["']$/g, '').trim() : null;
const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// ── Active Sync Tracker ──────────────────────────────────────────
// Prevents concurrent duplicate syncs for the same username.
// Map<username, { total, done, failed, running }>
const activeSyncs = new Map();


const PORT = 3000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const requestHandler = (req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Handle image proxy
    if (req.url.startsWith('/image-proxy')) {
        const parsedUrl = url.parse(req.url, true);
        const imageUrl = parsedUrl.query.url;

        if (!imageUrl) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Missing url parameter');
            return;
        }

        https.get(imageUrl, (imgRes) => {
            res.writeHead(200, {
                'Content-Type': imgRes.headers['content-type'],
                'Access-Control-Allow-Origin': '*'
            });
            imgRes.pipe(res);
        }).on('error', (err) => {
            console.error('Image proxy error:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error fetching image');
        });
        return;
    }

    // Handle API refresh endpoint (Trigger Webhook Only)
    if (req.url === '/api/refresh' && req.method === 'POST') {
        const webhookUrl = 'https://webhooks-mvp.leadboom.app/webhook/apify-scrapy-insta';

        https.get(webhookUrl, (webhookRes) => {
            // Just consume
            webhookRes.resume();

            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({ success: true, message: 'Webhook triggered' }));
        }).on('error', (err) => {
            console.error('Webhook fetch error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Failed to trigger webhook' }));
        });
        return;
    }

    // Handle saving business groups
    if (req.url === '/api/business-groups' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const config = JSON.parse(body);
                fs.writeFileSync(
                    path.join(__dirname, 'business-groups.json'),
                    JSON.stringify(config, null, 2),
                    'utf-8'
                );
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (err) {
                console.error('Error saving business groups:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // Handle getting all unique accounts from response.json
    if (req.url === '/api/accounts' && req.method === 'GET') {
        try {
            const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'response.json'), 'utf-8'));
            const posts = Array.isArray(data) ? data : (data.results || [data]);
            const accounts = [...new Set(posts.map(p => p.ownerUsername).filter(Boolean))].sort();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ accounts }));
        } catch (err) {
            console.error('Error reading accounts:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ accounts: [], error: err.message }));
        }
        return;
    }

    // Handle Image Synchronization (Download from IG CDN -> Upload to Supabase Storage -> Update DB)
    if (req.url.startsWith('/api/sync-images') && req.method === 'POST') {
        if (!supabase) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Supabase no configurado en .env' }));
            return;
        }

        const parsedUrl = url.parse(req.url, true);
        const username = parsedUrl.query.username;

        if (!username) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Falta parametro username' }));
            return;
        }

        console.log(`[Sync] Iniciando sincronización de imágenes para: @${username}`);

        // Prevent duplicate syncs for the same profile
        if (activeSyncs.has(username)) {
            const current = activeSyncs.get(username);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                alreadyRunning: true,
                message: 'Ya hay una sincronización en curso',
                ...current
            }));
            return;
        }

        // Initialize sync state
        activeSyncs.set(username, { running: true, total: 0, done: 0, failed: 0, phase: 'Iniciando...' });

        // Respond immediately, perform sync in background
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Sync iniciado en background' }));

        // Background Async Task
        (async () => {
            const state = activeSyncs.get(username);
            try {
                // 1. Get Profile
                const { data: profile } = await supabase.from('profiles').select('*').eq('username', username).single();
                if (!profile) return console.error(`[Sync] Profil no encontrado para: ${username}`);

                let processCount = 0;

                // Helper to sync single image
                const syncImage = async (imageUrl, storagePath) => {
                    if (!imageUrl || imageUrl.includes('supabase.co') || !imageUrl.includes('http')) return null;

                    try {
                        console.log(`[Sync] Descargando: ${storagePath}`);
                        const imgRes = await fetch(imageUrl);
                        if (!imgRes.ok) throw new Error(`Fetch failed: ${imgRes.status}`);
                        const arrayBuffer = await imgRes.arrayBuffer();
                        const buffer = Buffer.from(arrayBuffer);

                        console.log(`[Sync] Subiendo: ${storagePath} a Supabase...`);
                        const { error } = await supabase.storage.from('instaviz-media').upload(
                            storagePath,
                            buffer,
                            { contentType: imgRes.headers.get('content-type') || 'image/jpeg', upsert: true }
                        );

                        if (error) throw error;

                        const publicUrl = supabase.storage.from('instaviz-media').getPublicUrl(storagePath).data.publicUrl;
                        state.done++;
                        return publicUrl;
                    } catch (e) {
                        console.error(`[Sync] Error procesando img ${storagePath}:`, e.message);
                        state.failed++;
                        return null;
                    }
                };

                // Calculate total tasks
                const postsForCount = await supabase.from('posts').select('id', { count: 'exact' }).eq('profile_id', profile.id);
                state.total = (postsForCount.count || 0) + 1; // +1 for profile pic

                // Sync Profile Pic
                state.phase = 'Foto de perfil';
                const newProfilePic = await syncImage(profile.profile_pic, `profiles/${profile.id}.jpg`);
                if (newProfilePic) {
                    await supabase.from('profiles').update({ profile_pic: newProfilePic }).eq('id', profile.id);
                }

                // Sync Posts
                state.phase = 'Posts';
                const { data: posts } = await supabase.from('posts').select('id, display_url').eq('profile_id', profile.id);
                if (posts) {
                    for (const post of posts) {
                        const newUrl = await syncImage(post.display_url, `posts/${post.id}.jpg`);
                        if (newUrl) {
                            await supabase.from('posts').update({ display_url: newUrl }).eq('id', post.id);
                        }
                    }
                }

                state.phase = 'Completado';
                state.running = false;
                console.log(`[Sync] Finalizado para @${username}. ✅ ${state.done} guardadas, ❌ ${state.failed} fallidas.`);

            } catch (err) {
                console.error('[Sync] Error general:', err);
                if (activeSyncs.has(username)) {
                    activeSyncs.get(username).running = false;
                    activeSyncs.get(username).phase = 'Error: ' + err.message;
                }
            } finally {
                // Remove from active set after 60 seconds so user can re-trigger
                setTimeout(() => activeSyncs.delete(username), 60000);
            }
        })();
        return;
    }

    // Sync Status endpoint — GET /api/sync-status?username=xxx
    if (req.url.startsWith('/api/sync-status') && req.method === 'GET') {
        const parsedUrl = url.parse(req.url, true);
        const username = parsedUrl.query.username;
        if (!username) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Falta username' }));
            return;
        }

        const state = activeSyncs.get(username) || null;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ username, active: !!state, ...(state || {}) }));
        return;
    }

    // ── DELETE /api/delete-account ──────────────────────────────────
    if (req.url.startsWith('/api/delete-account') && req.method === 'DELETE') {
        if (!supabase) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Supabase no configurado en .env' }));
            return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            try {
                const { username } = JSON.parse(body);
                if (!username) throw new Error('Falta username');

                // Get profile id
                const { data: profile, error: profileErr } = await supabase
                    .from('profiles')
                    .select('id')
                    .eq('username', username)
                    .single();

                if (profileErr) throw profileErr;

                // 1. Fetch all post IDs to build Storage paths
                const { data: posts } = await supabase
                    .from('posts')
                    .select('id')
                    .eq('profile_id', profile.id);

                // 2. Delete Storage files (posts + profile pic)
                const storageFiles = [];
                if (posts) posts.forEach(p => storageFiles.push(`posts/${p.id}.jpg`));
                storageFiles.push(`profiles/${profile.id}.jpg`);

                const { error: storageErr } = await supabase.storage
                    .from('instaviz-media')
                    .remove(storageFiles);
                if (storageErr) console.warn('[Delete Account] Storage cleanup warn:', storageErr.message);

                // 3. Delete posts first (avoid FK constraint)
                const { error: postsErr } = await supabase
                    .from('posts')
                    .delete()
                    .eq('profile_id', profile.id);
                if (postsErr) throw postsErr;

                // 4. Delete profile
                const { error: delErr } = await supabase
                    .from('profiles')
                    .delete()
                    .eq('id', profile.id);
                if (delErr) throw delErr;

                console.log(`[Delete] Cuenta @${username} eliminada. Storage: ${storageFiles.length} archivos removidos.`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, filesRemoved: storageFiles.length }));
            } catch (err) {
                console.error('[Delete Account] Error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // ── DELETE /api/delete-post ──────────────────────────────────────
    if (req.url.startsWith('/api/delete-post') && req.method === 'DELETE') {
        if (!supabase) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Supabase no configurado en .env' }));
            return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            try {
                const { postId } = JSON.parse(body);
                if (!postId) throw new Error('Falta postId');

                // 1. Attempt to remove from Storage (best-effort, not fatal if missing)
                const { error: storageErr } = await supabase.storage
                    .from('instaviz-media')
                    .remove([`posts/${postId}.jpg`]);
                if (storageErr) console.warn(`[Delete Post] Storage cleanup for ${postId}:`, storageErr.message);

                // 2. Delete post record from DB
                const { error } = await supabase
                    .from('posts')
                    .delete()
                    .eq('id', postId);
                if (error) throw error;

                console.log(`[Delete] Post ${postId} eliminado. Storage limpiado.`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (err) {
                console.error('[Delete Post] Error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // ── POST /api/start-scrape ──────────────────────────────────────
    // Runs Apify instagram-scraper synchronously, upserts profile + posts
    // into Supabase, then auto-syncs images in background.
    if (req.url === '/api/start-scrape' && req.method === 'POST') {
        if (!supabase) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Supabase no configurado en .env' }));
            return;
        }
        if (!process.env.APIFY_TOKEN) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'APIFY_TOKEN no configurado en .env' }));
            return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            try {
                const { username, postsLimit = 50 } = JSON.parse(body);
                if (!username) throw new Error('Falta username');

                console.log(`[Scrape] Iniciando scraping para @${username} (límite: ${postsLimit} posts)`);

                // 2.1 Init Apify client and run actor
                const { ApifyClient } = require('apify-client');
                const apifyClient = new ApifyClient({ token: process.env.APIFY_TOKEN });

                // instagram-post-scraper uses 'username' (not 'usernames'), no resultsType
                const input = {
                    username: [username],
                    resultsLimit: postsLimit
                };

                // 2.2 Execute and await completion
                console.log(`[Scrape] Esperando respuesta de Apify...`);
                const run = await apifyClient.actor('apify/instagram-post-scraper').call(input);

                // clean:true skips hidden #debug / #error records (see Apify dataset docs)
                const { items: rawItems } = await apifyClient.dataset(run.defaultDatasetId).listItems({ clean: true });

                // Filter to real post items only (must have ownerUsername or username)
                const items = (rawItems || []).filter(item =>
                    (item.ownerUsername && item.ownerUsername.trim()) ||
                    (item.username && item.username.trim())
                );

                console.log(`[Scrape] Items recibidos de Apify: ${(rawItems || []).length} total, ${items.length} válidos`);

                if (items.length === 0) {
                    throw new Error(`Apify no retornó posts válidos para @${username}. Items crudos: ${(rawItems || []).length}`);
                }

                // 2.3 Parse profile and posts from Apify response.
                // instagram-post-scraper (Format B): each item IS a post with ownerUsername.
                // instagram-scraper (Format A): items[0] is a profile object with latestPosts.
                const firstItem = items[0];

                // Log the keys of the first item to help debug format detection
                console.log('[Scrape] Apify item[0] keys:', Object.keys(firstItem).slice(0, 20).join(', '));

                let profileToInsert;
                let latestPosts;

                // Detect format: Format B has ownerUsername, Format A has latestPosts / no ownerUsername
                const isPostFormat = firstItem.ownerUsername != null && firstItem.ownerUsername !== '';

                if (isPostFormat) {
                    // Format B — instagram-post-scraper: each item is a post, profile info is on the item
                    console.log('[Scrape] Formato B: POSTS individuales (ownerUsername:', firstItem.ownerUsername, ')');
                    profileToInsert = {
                        username: firstItem.ownerUsername,
                        full_name: firstItem.ownerFullName || firstItem.fullName || '',
                        biography: firstItem.biography || '',
                        followers: firstItem.followersCount || 0,
                        following: firstItem.followsCount || 0,
                        posts_count: firstItem.postsCount || 0,
                        profile_pic: firstItem.ownerProfilePicUrl || firstItem.profilePicUrl || '',
                        is_verified: firstItem.ownerIsVerified || firstItem.isVerified || false,
                        external_url: firstItem.externalUrl || '',
                        ig_url: firstItem.inputUrl || `https://www.instagram.com/${firstItem.ownerUsername}/`,
                        scraped_at: new Date().toISOString()
                    };
                    latestPosts = items; // items themselves are the posts
                } else {
                    // Format A — instagram-scraper: items[0] is profile with nested latestPosts
                    console.log('[Scrape] Formato A: PERFIL con latestPosts anidados (username:', firstItem.username, ')');
                    profileToInsert = {
                        username: firstItem.username,
                        full_name: firstItem.fullName || '',
                        biography: firstItem.biography || '',
                        followers: firstItem.followersCount || 0,
                        following: firstItem.followsCount || 0,
                        posts_count: firstItem.postsCount || 0,
                        profile_pic: firstItem.profilePicUrl || '',
                        is_verified: firstItem.isVerified || false,
                        external_url: firstItem.externalUrl || '',
                        ig_url: firstItem.url || `https://www.instagram.com/${firstItem.username}/`,
                        scraped_at: new Date().toISOString()
                    };
                    latestPosts = firstItem.latestPosts || [];
                }

                if (!profileToInsert.username) {
                    const sample = JSON.stringify(firstItem).slice(0, 300);
                    throw new Error(
                        `No se pudo determinar el username del perfil. ` +
                        `Formato detectado: ${isPostFormat ? 'B(posts)' : 'A(profile)'}. ` +
                        `Keys: ${Object.keys(firstItem).join(', ')}. Sample: ${sample}`
                    );
                }

                // 2.4 Upsert profile first to get its DB id
                const { data: upsertedProfile, error: profileErr } = await supabase
                    .from('profiles')
                    .upsert(profileToInsert, { onConflict: 'username' })
                    .select('id')
                    .single();

                if (profileErr) throw profileErr;
                const profileId = upsertedProfile.id;
                console.log(`[Scrape] Perfil guardado: @${profileToInsert.username} (ID: ${profileId})`);

                // Map posts to match the exact Supabase posts table schema
                const postsToInsert = latestPosts.map(post => ({
                    profile_id: profileId,
                    ig_post_id: String(post.id || ''),
                    type: post.type || 'Image',
                    caption: post.caption || '',
                    post_url: post.url || '',
                    display_url: post.displayUrl || '',
                    likes_count: post.likesCount || 0,
                    comments_count: post.commentsCount || 0,
                    video_views: post.videoViewCount ?? null,
                    published_at: post.timestamp || null,
                    hashtags: post.hashtags || [],
                    mentions: post.mentions || [],
                    scraped_at: new Date().toISOString()
                }));

                if (postsToInsert.length > 0) {
                    const { error: postsErr } = await supabase
                        .from('posts')
                        .upsert(postsToInsert, { onConflict: 'ig_post_id' });
                    if (postsErr) throw postsErr;
                }

                console.log(`[Scrape] ${postsToInsert.length} posts guardados para @${username}`);

                // 2.5 Auto-sync images in background (reuses activeSyncs tracker)
                if (!activeSyncs.has(username)) {
                    activeSyncs.set(username, {
                        running: true,
                        total: postsToInsert.length + 1,
                        done: 0,
                        failed: 0,
                        phase: 'Iniciando...'
                    });

                    (async () => {
                        const state = activeSyncs.get(username);
                        try {
                            // Sync profile pic
                            state.phase = 'Foto de perfil';
                            if (profileToInsert.profile_pic && !profileToInsert.profile_pic.includes('supabase.co')) {
                                try {
                                    const imgRes = await fetch(profileToInsert.profile_pic);
                                    if (imgRes.ok) {
                                        const buf = Buffer.from(await imgRes.arrayBuffer());
                                        const { error } = await supabase.storage.from('instaviz-media').upload(
                                            `profiles/${profileId}.jpg`, buf,
                                            { contentType: imgRes.headers.get('content-type') || 'image/jpeg', upsert: true }
                                        );
                                        if (!error) {
                                            const newUrl = supabase.storage.from('instaviz-media').getPublicUrl(`profiles/${profileId}.jpg`).data.publicUrl;
                                            await supabase.from('profiles').update({ profile_pic: newUrl }).eq('id', profileId);
                                            state.done++;
                                        } else { state.failed++; }
                                    } else { state.failed++; }
                                } catch { state.failed++; }
                            }

                            // Sync post thumbnails
                            state.phase = 'Posts';
                            const { data: dbPosts } = await supabase
                                .from('posts').select('id, display_url').eq('profile_id', profileId);

                            if (dbPosts) {
                                for (const post of dbPosts) {
                                    if (!post.display_url || post.display_url.includes('supabase.co')) {
                                        state.done++;
                                        continue;
                                    }
                                    try {
                                        const imgRes = await fetch(post.display_url);
                                        if (!imgRes.ok) { state.failed++; continue; }
                                        const buf = Buffer.from(await imgRes.arrayBuffer());
                                        const { error } = await supabase.storage.from('instaviz-media').upload(
                                            `posts/${post.id}.jpg`, buf,
                                            { contentType: imgRes.headers.get('content-type') || 'image/jpeg', upsert: true }
                                        );
                                        if (!error) {
                                            const newUrl = supabase.storage.from('instaviz-media').getPublicUrl(`posts/${post.id}.jpg`).data.publicUrl;
                                            await supabase.from('posts').update({ display_url: newUrl }).eq('id', post.id);
                                            state.done++;
                                        } else { state.failed++; }
                                    } catch { state.failed++; }
                                }
                            }

                            state.phase = 'Completado';
                            state.running = false;
                            console.log(`[Scrape] Imágenes sincronizadas para @${username}. ✅ ${state.done} guardadas, ❌ ${state.failed} fallidas.`);
                        } catch (err) {
                            console.error('[Scrape] Error en sync de imágenes:', err);
                            if (activeSyncs.has(username)) {
                                activeSyncs.get(username).running = false;
                                activeSyncs.get(username).phase = 'Error: ' + err.message;
                            }
                        } finally {
                            setTimeout(() => activeSyncs.delete(username), 60000);
                        }
                    })();
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    username,
                    profileId,
                    postsCount: postsToInsert.length,
                    message: `Scraping completado para @${username}`
                }));
            } catch (err) {
                console.error('[Scrape] Error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // Serve static files – strip query params before resolving path
    const parsedPath = url.parse(req.url).pathname;
    let filePath = '.' + parsedPath;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(path.join(__dirname, filePath), (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            const headers = { 'Content-Type': contentType };
            // Prevent caching for JSON files
            if (extname === '.json') {
                headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
            }
            res.writeHead(200, headers);
            res.end(content, 'utf-8');
        }
    });
};

const server = http.createServer(requestHandler);

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
        console.log('Available pages:');
        console.log(`  - http://localhost:${PORT}/ (Main Dashboard)`);
        console.log(`  - http://localhost:${PORT}/scatter.html (Engagement Analysis)`);
        console.log(`  - http://localhost:${PORT}/timeline.html (Likes Timeline)`);
        console.log(`  - http://localhost:${PORT}/comments-timeline.html (Comments Timeline)`);
        console.log(`  - http://localhost:${PORT}/distribution.html (Distribution Analysis)`);
    });
}

module.exports = requestHandler;
