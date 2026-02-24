/**
 * cardCatcher.js
 * AiBouMoS Data Hydration Pipeline (Build-time / SSR)
 *
 * Scans /public/aiboumos/yattai/{AiBou_ID}/ directories and generates
 * /public/data/aiboumos.json for the YATTAi Grid and Profile Pages.
 *
 * File conventions per AiBou_ID directory:
 *
 *  KyaraSynth (required):
 *    {AiBou_ID}.YATTAi.jpg       → YATTAI Card background image
 *
 *  KyaraSynth (optional):
 *    {AiBou_ID}.KYARA-hero.png   → Profile Page hero avatar
 *
 *  KyaraMetale (optional):
 *    {AiBou_ID}.METALE.md        → Full bio / description narrative
 *                                  Card: truncated preview | Profile: full text
 *
 *  Kyara (optional):
 *    {AiBou_ID}.KYARA.md         → Frontmatter parsed for:
 *                                    zodiac_keywords[] → Keyword buttons
 *                                    house_color       → CSS variable (borders, hover, accents)
 *                                    name              → Display name (falls back to AiBou_ID)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const YATTAI_DIR = path.join(__dirname, '../public/aiboumos/yattai');
const OUTPUT_JSON = path.join(__dirname, '../public/data/aiboumos.json');

function parseMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  return { frontmatter: data, body: body.trim() };
}

function findFile(files, pattern) {
  return files.find(f => pattern.test(f));
}

function scanAiBou(aibouId, aibouPath) {
  const files = fs.readdirSync(aibouPath);

  // KyaraSynth — Required: background image
  const yattaiImageFile = findFile(files, new RegExp(`^${aibouId}\\.YATTAi\\.jpg$`, 'i'));
  if (!yattaiImageFile) {
    console.warn(`⚠️  ${aibouId}: missing ${aibouId}.YATTAi.jpg — skipping`);
    return null;
  }

  // KyaraSynth — Optional: hero avatar
  const heroImageFile = findFile(files, new RegExp(`^${aibouId}\\.KYARA-hero\\.png$`, 'i'));

  // KyaraMetale — Optional: description / bio
  const metaleFile = findFile(files, new RegExp(`^${aibouId}\\.METALE\\.md$`, 'i'));
  let description = '';
  if (metaleFile) {
    const { body } = parseMarkdown(path.join(aibouPath, metaleFile));
    description = body;
  }

  // Kyara — Optional: keywords + house color + display name
  const kyaraFile = findFile(files, new RegExp(`^${aibouId}\\.KYARA\\.md$`, 'i'));
  let keywords = [];
  let houseColor = '#8040C0';
  let displayName = aibouId;
  if (kyaraFile) {
    const { frontmatter } = parseMarkdown(path.join(aibouPath, kyaraFile));
    keywords = Array.isArray(frontmatter.zodiac_keywords) ? frontmatter.zodiac_keywords : [];
    houseColor = frontmatter.house_color || '#8040C0';
    displayName = frontmatter.name || aibouId;
  }

  return {
    id: aibouId,
    name: displayName,
    description,
    keywords,
    houseColor,
    yattaiImage: `/aiboumos/yattai/${aibouId}/${yattaiImageFile}`,
    heroImage: heroImageFile ? `/aiboumos/yattai/${aibouId}/${heroImageFile}` : '',
  };
}

function main() {
  console.log('🔍 Scanning AiBouMoS YATTAi directory...');

  if (!fs.existsSync(YATTAI_DIR)) {
    console.log(`⚠️  Directory not found: ${YATTAI_DIR}`);
    console.log('    Creating directory...');
    fs.mkdirSync(YATTAI_DIR, { recursive: true });
  }

  const outputDir = path.dirname(OUTPUT_JSON);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const aibouDirs = fs.readdirSync(YATTAI_DIR).filter(item =>
    fs.statSync(path.join(YATTAI_DIR, item)).isDirectory()
  );

  if (aibouDirs.length === 0) {
    console.log('ℹ️  No AiBou directories found.');
  }

  const cards = [];
  for (const aibouId of aibouDirs) {
    const card = scanAiBou(aibouId, path.join(YATTAI_DIR, aibouId));
    if (card) {
      cards.push(card);
      console.log(`✅ ${card.name} (${aibouId})`);
    }
  }

  cards.sort((a, b) => a.name.localeCompare(b.name));

  const output = {
    cards,
    generatedAt: new Date().toISOString(),
    count: cards.length,
  };

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(output, null, 2));
  console.log(`\n✅ Generated aiboumos.json — ${cards.length} AiBou card(s)`);
}

main();
