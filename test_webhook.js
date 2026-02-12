
const https = require('https');

const data = JSON.stringify({
    test: "event",
    message: "Hello from Antigravity"
});

const options = {
    hostname: 'webhooks-mvp.leadboom.app',
    path: '/webhook/apify-instagram-post',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};


const fs = require('fs');

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
        rawData += chunk;
    });
    res.on('end', () => {
        console.log('No more data in response.');
        fs.writeFileSync('response.json', rawData);
        console.log('Response saved to response.json');
    });
});


req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(data);
req.end();
