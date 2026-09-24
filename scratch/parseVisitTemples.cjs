const fs = require('fs');

const html = fs.readFileSync('C:/Users/harih/.gemini/antigravity-ide/brain/4e1d2a75-6d38-4a23-9050-d1d51d75f894/.system_generated/steps/192/content.md', 'utf8');

const regex = /<a\s+href=["'](https:\/\/www\.visittemples\.com\/hindu\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
const temples = [];
let match;

while ((match = regex.exec(html)) !== null) {
  const link = match[1];
  const block = match[2];

  const imgMatch = block.match(/<img[^>]*src=["']([^"']+)["']/i);
  let img = imgMatch ? imgMatch[1] : '';
  if (img && !img.startsWith('http')) {
    img = 'https://www.visittemples.com/' + img.replace(/^\/+/, '');
  }

  const titleMatch = block.match(/<h5[^>]*class=["']title["'][^>]*>([\s\S]*?)<\/h5>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  const descMatch = block.match(/<p[^>]*class=["']catpath["'][^>]*>([\s\S]*?)<\/p>/i);
  let desc = descMatch ? descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

  const cityMatch = block.match(/<span[^>]*class=["']cityname["'][^>]*>([\s\S]*?)<\/span>/i);
  const city = cityMatch ? cityMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  const stateMatch = block.match(/<span[^>]*class=["']date["'][^>]*>([\s\S]*?)<\/span>/i);
  const state = stateMatch ? stateMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  if (title && !temples.some(t => t.link === link)) {
    temples.push({
      index: temples.length + 1,
      title,
      city,
      state,
      img,
      desc,
      link
    });
  }
}

console.log('Total unique temples extracted from page 1:', temples.length);
temples.forEach(t => {
  console.log(`[#${t.index}] ${t.title} | ${t.city}, ${t.state}`);
});

fs.writeFileSync('scratch/visittemples_extracted.json', JSON.stringify(temples, null, 2), 'utf8');
