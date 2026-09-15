const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/tamilnaduTemples.js');
let content = fs.readFileSync(filePath, 'utf8');

const idRegex = /id:\s*['"]([^'"]+)['"]/g;
let match;
const ids = [];
while ((match = idRegex.exec(content)) !== null) {
  ids.push(match[1]);
}
console.log('Found IDs in tamilnaduTemples.js:', ids);
