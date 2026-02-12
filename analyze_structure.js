
const fs = require('fs');

try {
    const rawData = fs.readFileSync('response.json', 'utf8');
    let data = JSON.parse(rawData);

    // Ensure data is an array
    if (!Array.isArray(data)) {
        if (data.results && Array.isArray(data.results)) {
            data = data.results;
        } else {
            console.log("Root element is not an array, wrapping in array for analysis.");
            data = [data];
        }
    }

    if (data.length === 0) {
        console.log("Array is empty.");
        process.exit(0);
    }

    // 1. Get all unique headers (keys)
    const allKeys = new Set();
    data.forEach(item => {
        Object.keys(item).forEach(key => allKeys.add(key));
    });

    console.log('--- HEADERS (All Unique Keys) ---');
    console.log(Array.from(allKeys).sort().join(', '));
    console.log(`\nTotal Headers: ${allKeys.size}`);

    // 2. Select a random row
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomRow = data[randomIndex];

    console.log(`\n--- RANDOM ROW (Index: ${randomIndex}) ---`);

    Object.entries(randomRow).forEach(([key, value]) => {
        let type = typeof value;
        let displayValue = value;

        if (value === null) {
            type = 'null';
        } else if (Array.isArray(value)) {
            type = `Array[${value.length}]`;
            displayValue = JSON.stringify(value, null, 2).substring(0, 500) + (JSON.stringify(value).length > 500 ? '...' : '');
        } else if (typeof value === 'object') {
            type = 'Object';
            displayValue = JSON.stringify(value, null, 2).substring(0, 500) + (JSON.stringify(value).length > 500 ? '...' : '');
        } else if (typeof value === 'string') {
            if (value.length > 100) displayValue = value.substring(0, 100) + '...';
        }

        console.log(`[${key}] (${type}): ${displayValue}`);
    });

} catch (e) {
    console.error('Error:', e.message);
}
