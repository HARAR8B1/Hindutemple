const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/tamilnaduTemples.js');
let content = fs.readFileSync(filePath, 'utf8');

const coords = {
  'srirangam-ranganathaswamy': { lat: 10.8623, lng: 78.6901 },
  'thillai-nataraja-chidambaram': { lat: 11.3993, lng: 79.6932 },
  'brihadeeswarar-thanjavur': { lat: 10.7828, lng: 79.1318 },
  'meenakshi-amman-madurai': { lat: 9.9195, lng: 78.1193 },
  'kanyakumari-devi-temple': { lat: 8.0780, lng: 77.5550 },
  'nellaiappar-tirunelveli': { lat: 8.7285, lng: 77.6896 },
  'murugan-palani': { lat: 10.4476, lng: 77.5143 },
  'murugan-tiruchendur': { lat: 8.4960, lng: 78.1157 },
  'airavatesvara-darasuram': { lat: 10.9479, lng: 79.3562 },
  'gangaikonda-cholapuram': { lat: 11.2061, lng: 79.4496 },
  'murugan-swamimalai': { lat: 10.9546, lng: 79.3307 },
  'kumbeswara-kumbakonam': { lat: 10.9602, lng: 79.3734 },
  'murugan-tiruttani': { lat: 13.1753, lng: 79.6150 },
  'arunachaleswarar-thiruvannamalai': { lat: 12.2253, lng: 79.0677 },
  'ekambareswarar-kanchipuram': { lat: 12.8477, lng: 79.6997 },
  'thanumalayan-suchindram': { lat: 8.1565, lng: 77.4642 }
};

let count = 0;
for (const [id, coord] of Object.entries(coords)) {
  // Check if lat already added
  const alreadyHasLat = new RegExp(`id:\\s*'${id}'[\\s\\S]*?lat:\\s*\\d+`, 'm');
  if (alreadyHasLat.test(content)) {
    console.log(`Already has coords: ${id}`);
    count++;
    continue;
  }
  const regex = new RegExp(`(id:\\s*'${id}',)`, 'g');
  if (regex.test(content)) {
    content = content.replace(regex, `$1\n    lat: ${coord.lat},\n    lng: ${coord.lng},`);
    count++;
    console.log(`Added coords to ${id}`);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Total temples with coords in tamilnaduTemples.js: ${count}`);
