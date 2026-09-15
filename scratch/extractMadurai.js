import fs from 'fs';

const file = 'C:/Users/harih/.gemini/antigravity-ide/brain/b6e5dec6-c733-44e8-9311-16cbf84f2223/.system_generated/steps/377/content.md';
const txt = fs.readFileSync(file, 'utf8');

const regex = /"title":"([^"]+)","url":"([^"]+)","description":"([^"]+)"/g;
let m;
console.log('--- MAKEMYTRIP MADURAI PLACES ---');
while ((m = regex.exec(txt)) !== null) {
  console.log(`Title: ${m[1]}`);
  console.log(`URL: ${m[2]}`);
  console.log(`Desc: ${m[3].substring(0, 150)}...\n`);
}

// Also check json-ld or text blocks
const nameMatches = [...txt.matchAll(/"name":"([^"]+)"/g)].map(x => x[1]);
console.log('Unique Names in page:', [...new Set(nameMatches)].filter(n => !n.includes('MakeMyTrip') && !n.includes('Deep Kalra') && !n.includes('http')).slice(0, 30));
