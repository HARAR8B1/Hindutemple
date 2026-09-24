/**
 * Converts all_visittemples.json into a visitTemplesData.js file
 * with deduplication against existing temple data files.
 */
const fs = require('fs');
const path = require('path');

// Load the scraped data
const scraped = JSON.parse(fs.readFileSync('scratch/all_visittemples.json', 'utf8'));

// Load existing temple data to dedup
const dataDir = 'src/data';
const existingFiles = [
  'chennaiTemples.js', 'tamilnaduTemples.js', 'kanchipuramTemples.js',
  'kumbakonamTemples.js', 'tiruvallurTemples.js', 'indiaTemples.js',
  'temples.js', 'pariharaTemples.js', 'divyaDesams.js', 'jyotirlingas.js',
  'muruganTemples.js', 'ganeshTemples.js', 'navagrahaTemples.js',
  'rasiNakshatraTemples.js', 'unescoHeritageTemples.js'
];

const existingNames = new Set();
const existingIds = new Set();

existingFiles.forEach(f => {
  try {
    const content = fs.readFileSync(path.join(dataDir, f), 'utf8');
    // Extract all name values
    const nameMatches = content.match(/name:\s*['"`](.*?)['"`]/g) || [];
    nameMatches.forEach(m => {
      const name = m.replace(/name:\s*['"`]/, '').replace(/['"`]$/, '').toLowerCase().trim();
      existingNames.add(name);
    });
    // Extract all ids
    const idMatches = content.match(/id:\s*['"`](.*?)['"`]/g) || [];
    idMatches.forEach(m => {
      const id = m.replace(/id:\s*['"`]/, '').replace(/['"`]$/, '').toLowerCase().trim();
      existingIds.add(id);
    });
  } catch (e) {
    console.log(`Could not load ${f}: ${e.message}`);
  }
});

console.log(`Existing temple names count: ${existingNames.size}`);
console.log(`Scraped temples total: ${scraped.length}`);

// Helper: generate ID from name
function toId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

// Helper: detect category from name
function detectCategory(name) {
  const lc = name.toLowerCase();
  if (/\b(murugan|subramania|subramanya|kartik|skanda|karthik)\b/.test(lc)) return 'Murugan';
  if (/\b(ganesh|ganapathi|vinayak|pillaiyar|pillayar|vignesh)\b/.test(lc)) return 'Ganesh';
  if (/\b(vishnu|perumal|narayana|venkateswara|venkatesh|balaji|ranganatha|narasimha|rama|krishna|govinda|trivikrama|trivikrama)\b/.test(lc)) return 'Vishnu';
  if (/\b(lakshmi|mahalakshmi|devi|amman|mariamman|durga|amba|parvati|saraswati|bhavani|kali|chamundi|kamakshi|meenakshi|shakti)\b/.test(lc)) return 'Shakti';
  if (/\b(shiva|siva|sivan|eswarar|easwarar|lingam|nataraj|maheshwara|nataraja|chandrasekhar|mahadeva|shivling)\b/.test(lc)) return 'Shiva';
  if (/\b(hanuman|anjaneyar|anjaneya|venkatara|rama)\b/.test(lc)) return 'Hanuman';
  if (/\b(surya|sun)\b/.test(lc)) return 'Surya';
  return 'Hindu';
}

// Filter new (non-duplicate) temples
const newTemples = [];
const seenIds = new Set([...existingIds]);

scraped.forEach(t => {
  const nameLower = t.name.toLowerCase().trim();

  // Check if this name (or its short form) exists
  let isDup = false;
  for (const en of existingNames) {
    // Simple overlap check: if existing name is a substring of scraped name or vice versa
    if (nameLower.includes(en) || en.includes(nameLower.substring(0, Math.min(30, nameLower.length)))) {
      isDup = true;
      break;
    }
  }

  if (!isDup) {
    const id = toId(t.name);
    if (!seenIds.has(id)) {
      seenIds.add(id);
      newTemples.push({
        id,
        name: t.name,
        city: t.city,
        state: t.state,
        category: detectCategory(t.name),
        sourceUrl: t.sourceUrl,
      });
    }
  }
});

console.log(`New temples after deduplication: ${newTemples.length}`);

// Write out the JS file
const jsContent = `/**
 * Hindu Temples sourced from VisitTemples.com
 * ${newTemples.length} temples added without duplicating existing temple data.
 * Source: https://www.visittemples.com/hindu
 */

const visitTemplesData = [
${newTemples.map(t => `  {
    id: '${t.id}',
    name: '${t.name.replace(/'/g, "\\'")}',
    city: '${t.city.replace(/'/g, "\\'")}',
    state: '${t.state.replace(/'/g, "\\'")}',
    category: '${t.category}',
    sourceUrl: '${t.sourceUrl}',
    image: '',
    history: '',
    timings: '',
    festivals: [],
    significance: '',
    mapsUrl: 'https://maps.google.com/?q=' + encodeURIComponent('${t.name.replace(/'/g, "\\'")}'),
  }`).join(',\n')}
];

export default visitTemplesData;
`;

fs.writeFileSync('src/data/visitTemplesData.js', jsContent);
console.log(`Written src/data/visitTemplesData.js with ${newTemples.length} new unique temples`);

// Print state distribution
const byState = {};
newTemples.forEach(t => {
  byState[t.state] = (byState[t.state] || 0) + 1;
});
console.log('\nTemples by state:');
Object.entries(byState).sort((a,b) => b[1]-a[1]).forEach(([s, c]) => console.log(`  ${s}: ${c}`));
