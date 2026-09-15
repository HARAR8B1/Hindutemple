import chennaiTemples from '../src/data/chennaiTemples.js';
import tiruvallurTemples from '../src/data/tiruvallurTemples.js';
import kanchipuramTemples from '../src/data/kanchipuramTemples.js';
import kumbakonamTemples from '../src/data/kumbakonamTemples.js';
import tamilnaduTemples from '../src/data/tamilnaduTemples.js';
import rasiNakshatraTemples from '../src/data/rasiNakshatraTemples.js';
import { filterTemplesByRadius } from '../src/utils/haversine.js';
import { lookupPincode } from '../src/utils/pincodeLookup.js';

console.log('--- Checking Geofenced Catalog ---');
const allTemples = [
  ...new Map(
    [
      ...chennaiTemples,
      ...tiruvallurTemples,
      ...kanchipuramTemples,
      ...kumbakonamTemples,
      ...tamilnaduTemples,
      ...rasiNakshatraTemples,
    ]
      .filter((t) => t.lat != null && t.lng != null)
      .map((t) => [t.id, t])
  ).values(),
];

console.log('Total geofenced temples with coordinates:', allTemples.length);

const pallikaranaiIds = [
  'sri-lakshminarayana-perumal-pallikaranai',
  'sri-adhipureeswarar-pallikaranai',
  'pidari-veerathamman-pallikaranai',
  'annai-adhi-parasakthi-pallikaranai',
  'selva-vinayagar-pallikaranai',
  'panchami-varahi-pallikaranai'
];

for (const id of pallikaranaiIds) {
  const found = allTemples.find(t => t.id === id);
  console.log(`Temple ${id}:`, found ? `FOUND (${found.name}, lat=${found.lat}, lng=${found.lng}, city=${found.city})` : 'MISSING');
}

console.log('\n--- Testing Pincode 600100 (Pallikaranai) Search ---');
const pinRes = await lookupPincode('600100');
console.log('Pincode lookup result:', pinRes);

const nearby10 = filterTemplesByRadius(allTemples, pinRes.lat, pinRes.lng, 10);
console.log(`Temples within 10 km of Pallikaranai: ${nearby10.length}`);
nearby10.forEach(t => console.log(`  - [${t.distance} km] ${t.name} (${t.city}) [${t.category}]`));

const nearby20 = filterTemplesByRadius(allTemples, pinRes.lat, pinRes.lng, 20);
console.log(`Temples within 20 km of Pallikaranai: ${nearby20.length}`);

const nearby30 = filterTemplesByRadius(allTemples, pinRes.lat, pinRes.lng, 30);
console.log(`Temples within 30 km of Pallikaranai: ${nearby30.length}`);

console.log('\n--- Testing Other Pincodes ---');
const pinMylapore = await lookupPincode('600004');
console.log('Mylapore (600004):', pinMylapore.name, pinMylapore.lat, pinMylapore.lng);
const nearbyMylapore = filterTemplesByRadius(allTemples, pinMylapore.lat, pinMylapore.lng, 20);
console.log(`Temples within 20 km of Mylapore: ${nearbyMylapore.length}`);

const pinKumbakonam = await lookupPincode('612001');
console.log('Kumbakonam (612001):', pinKumbakonam.name, pinKumbakonam.lat, pinKumbakonam.lng);
const nearbyKumbakonam = filterTemplesByRadius(allTemples, pinKumbakonam.lat, pinKumbakonam.lng, 20);
console.log(`Temples within 20 km of Kumbakonam: ${nearbyKumbakonam.length}`);
