const https = require('https');
const fs = require('fs');

function fetchPage(offset) {
  return new Promise((resolve, reject) => {
    const postData = `category=hindu&page=${offset}&keywords=&sortBy=`;
    const options = {
      hostname: 'www.visittemples.com',
      path: `/home/ajaxPaginationData/${offset}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.visittemples.com/hindu',
        'Origin': 'https://www.visittemples.com',
        'X-Requested-With': 'XMLHttpRequest',
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.abort(); reject(new Error('Timeout')); });
    req.write(postData);
    req.end();
  });
}

function parseTemples(html) {
  const temples = [];
  const linkRegex = /<a href="(https:\/\/www\.visittemples\.com\/hindu\/[^"]+)">/g;
  const titleRegex = /<h5 class="title">(.*?)<\/h5>/g;
  const cityRegex = /<span class="cityname">(.*?)<\/span>/g;
  const stateRegex = /<span class="date">(.*?)<\/span>/g;
  
  const links = [];
  const titles = [];
  const cities = [];
  const states = [];
  
  let m;
  while ((m = linkRegex.exec(html)) !== null) links.push(m[1].trim());
  while ((m = titleRegex.exec(html)) !== null) titles.push(m[1].trim());
  while ((m = cityRegex.exec(html)) !== null) cities.push(m[1].trim());
  while ((m = stateRegex.exec(html)) !== null) states.push(m[1].trim());
  
  for (let i = 0; i < titles.length; i++) {
    temples.push({
      name: titles[i],
      city: cities[i] || '',
      state: states[i] || '',
      sourceUrl: links[i] || ''
    });
  }
  return temples;
}

async function fetchAllTemples() {
  const allTemples = [];
  const seenNames = new Set();
  let offset = 0;
  let emptyCount = 0;
  let page = 1;
  
  while (true) {
    process.stdout.write(`Fetching page ${page} (offset ${offset})... `);
    try {
      const html = await fetchPage(offset);
      const temples = parseTemples(html);
      
      if (temples.length === 0) {
        emptyCount++;
        console.log('EMPTY');
        if (emptyCount >= 3) {
          console.log('3 consecutive empty pages, stopping.');
          break;
        }
      } else {
        emptyCount = 0;
        let newCount = 0;
        temples.forEach(t => {
          if (!seenNames.has(t.name)) {
            seenNames.add(t.name);
            allTemples.push(t);
            newCount++;
          }
        });
        console.log(`Got ${temples.length} temples, ${newCount} new. Total: ${allTemples.length}`);
      }
      
      offset += 30;
      page++;
      
      // Stop at a reasonable limit (1200 temples = 40 pages)
      if (offset > 1200) {
        console.log('Reached offset limit.');
        break;
      }
      
      // Rate limit - wait 500ms between requests
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      emptyCount++;
      if (emptyCount >= 3) break;
    }
  }
  
  console.log(`\nTotal unique temples found: ${allTemples.length}`);
  fs.writeFileSync('scratch/all_visittemples.json', JSON.stringify(allTemples, null, 2));
  console.log('Saved to scratch/all_visittemples.json');
}

fetchAllTemples();
