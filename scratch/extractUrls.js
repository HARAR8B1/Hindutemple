import fs from 'fs';

function extractFromTrichy() {
  const file = 'C:/Users/harih/.gemini/antigravity-ide/brain/b6e5dec6-c733-44e8-9311-16cbf84f2223/.system_generated/steps/375/content.md';
  const html = fs.readFileSync(file, 'utf8');
  const catRegex = /mw-category-group[\s\S]*?<\/div>/g;
  const groups = html.match(catRegex) || [];
  const titles = [];
  for (const group of groups) {
    const linkMatches = [...group.matchAll(/<a href="\/wiki\/([^"]+)" title="([^"]+)">([^<]+)<\/a>/g)];
    for (const m of linkMatches) {
      titles.push({ slug: m[1], title: m[2], label: m[3] });
    }
  }
  console.log('--- TRICHY TEMPLES ---');
  console.log('Count:', titles.length);
  titles.forEach((t, i) => console.log(`${i + 1}. ${t.title} (/wiki/${t.slug})`));
}

function extractFromMadurai() {
  const file = 'C:/Users/harih/.gemini/antigravity-ide/brain/b6e5dec6-c733-44e8-9311-16cbf84f2223/.system_generated/steps/377/content.md';
  if (!fs.existsSync(file)) {
    console.log('Madurai file does not exist');
    return;
  }
  const txt = fs.readFileSync(file, 'utf8');
  console.log('\n--- MADURAI CONTENT SAMPLE ---');
  console.log('Length:', txt.length);
  // Match headings or temple names
  const lines = txt.split('\n').filter(l => l.trim().length > 0);
  console.log('Sample lines:');
  lines.slice(0, 40).forEach(l => console.log(l));
}

extractFromTrichy();
extractFromMadurai();
