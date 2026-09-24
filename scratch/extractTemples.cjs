const fs = require('fs');
const https = require('https');

// Read the already fetched page
const content = fs.readFileSync('C:/Users/harih/.gemini/antigravity-ide/brain/4e1d2a75-6d38-4a23-9050-d1d51d75f894/.system_generated/steps/262/content.md', 'utf8');

// Extract temple data from the HTML
function parseTemples(html) {
  const temples = [];
  // Extract each temple link + title + city + state
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
  
  console.log(`Links: ${links.length}, Titles: ${titles.length}, Cities: ${cities.length}, States: ${states.length}`);
  
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

const temples = parseTemples(content);
console.log(`\nFound ${temples.length} temples on page 1:\n`);
temples.forEach((t, i) => {
  console.log(`${i+1}. ${t.name}`);
  console.log(`   City: ${t.city}, State: ${t.state}`);
  console.log(`   URL: ${t.sourceUrl}`);
});

// Save to file
fs.writeFileSync('C:/Users/harih/OneDrive/Desktop/Hari Projects/HinduTemples/scratch/visittemples_page1.json', JSON.stringify(temples, null, 2));
console.log('\nSaved to visittemples_page1.json');
