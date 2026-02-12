const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');

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
