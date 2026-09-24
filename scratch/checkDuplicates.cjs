const fs = require('fs');

const extracted = JSON.parse(fs.readFileSync('scratch/visittemples_extracted.json', 'utf8'));

// Load all temple modules
const files = [
  'temples.js', 'chennaiTemples.js', 'kanchipuramTemples.js', 'kumbakonamTemples.js',
  'tiruvallurTemples.js', 'tamilnaduTemples.js', 'indiaTemples.js', 'divyaDesams.js',
  'ganeshTemples.js', 'muruganTemples.js', 'navagrahaTemples.js', 'rasiNakshatraTemples.js',
  'unescoHeritageTemples.js', 'pariharaTemples.js'
];

let catalog = [];
files.forEach(f => {
  const content = fs.readFileSync('src/data/' + f, 'utf8');
  // parse temple objects
  const idRegex = /id:\s*['"]([^'"]+)['"]/g;
  const nameRegex = /name:\s*['"]([^'"]+)['"]/g;
  let idM, nameM;
  const ids = [];
  const names = [];
  while ((idM = idRegex.exec(content)) !== null) ids.push(idM[1]);
  while ((nameM = nameRegex.exec(content)) !== null) names.push(nameM[1]);

  for (let i = 0; i < ids.length; i++) {
    catalog.push({
      file: f,
      id: ids[i],
      name: names[i] || ids[i]
    });
  }
});

console.log('Total catalogued temples:', catalog.length);

extracted.forEach((ext, idx) => {
  // Let's see if this temple really exists in catalog
  const cleanExtTitle = ext.title.toLowerCase()
    .replace(/^sri\s+|^shri\s+|^shree\s+/i, '')
    .replace(/temple.*$/i, '')
    .trim();

  const words = cleanExtTitle.split(/\s+/).filter(w => w.length > 3 && !['district', 'near', 'tamil', 'nadu', 'madhya', 'pradesh'].includes(w));

  const matches = catalog.filter(c => {
    const cName = c.name.toLowerCase();
    const cId = c.id.toLowerCase();
    if (words.length === 0) return false;
    const matchCount = words.filter(w => cName.includes(w) || cId.includes(w)).length;
    return matchCount >= Math.min(2, words.length);
  });

  console.log(`[#${idx + 1}] ${ext.title} (${ext.city}, ${ext.state})`);
  if (matches.length > 0) {
    console.log(`   --> MATCH: ${matches.map(m => m.name + ' in ' + m.file + ' (' + m.id + ')').join('; ')}`);
  } else {
    console.log(`   --> NEW TEMPLE!`);
  }
});
