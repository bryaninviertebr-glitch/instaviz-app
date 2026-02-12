
const fs = require('fs');

try {
    const rawData = fs.readFileSync('response.json', 'utf8');
    const data = JSON.parse(rawData);

    console.log('--- Data Analysis ---');
    console.log(`Type: ${Array.isArray(data) ? 'Array' : typeof data}`);

    if (Array.isArray(data)) {
        console.log(`Total Items: ${data.length}`);
        if (data.length > 0) {
            const firstItem = data[0];
            console.log('--- First Item Keys ---');
            console.log(Object.keys(firstItem).join(', '));

            console.log('\n--- First Item Sample Data ---');
            console.log(`URL: ${firstItem.url}`);
            console.log(`Caption: ${firstItem.caption ? firstItem.caption.substring(0, 100) + '...' : 'N/A'}`);
            console.log(`Likes: ${firstItem.likesCount}`);
            console.log(`Comments: ${firstItem.commentsCount}`);
            console.log(`Owner: ${firstItem.ownerUsername}`);
        }
    } else {
        console.log('--- Keys ---');
        console.log(Object.keys(data).join(', '));
    }
} catch (e) {
    console.error('Error analyzing data:', e.message);
}
