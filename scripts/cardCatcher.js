/**
 * cardCatcher.js - SSOT-Compliant Data Hydration Pipeline
 * 
 * Scans /public/aiboumos/yattai/{AiBou_ID}/ directories per SiteMapUJAi SSOT
 * 
 * REQUIRED FILES (per SSOT):
 *   - {AiBou_ID}.KYARA.md (Primary metadata source)
 *   - {AiBou_ID}.YATTAi.jpg (Background image for cards)
 * 
 * OPTIONAL FILES (per SSOT):
 *   - {AiBou_ID}.METALE.md (Full narrative/bio)
 *   - {AiBou_ID}.KYARA-hero.png (Hero avatar for profile)
 * 
 * DATA MAPPING (per SSOT):
 *   KyaraSynth:
 *     - Image_1: YATTAi.jpg → YATTAI Cards Background_Image
 *     - Image_2: KYARA-hero.png → AiBou Profile Page Hero_Avatar
 *   
 *   KyaraMetale:
 *     - METALE.md → YATTAI Cards {AiBou_Description} (Truncated)
 *     - METALE.md → AiBou Profile Page Main Bio (Full)
 *   
 *   Kyara:
 *     - KYARA.md frontmatter → zodiac_keywords → Keyword buttons
 *     - KYARA.md frontmatter → house_colors → CSS Variables
 * 
 * OUTPUT: Returns card array for SSR/build-time hydration (no intermediate JSON)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const YATTAI_DIR = path.join(__dirname, '../public/aiboumos/yattai');

// SSOT-compliant file patterns
const REQUIRED_PATTERNS = {
  yattaiImage: /\.YATTAi\.jpg$/i,
  kyara: /\.KYARA\.md$/i
};
const OPTIONAL_PATTERNS = {
  metale: /\.METALE\.md$/i,
  hero: /\.KYARA-hero\.png$/i
};

function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  
  return {
    frontmatter: data,
    content: body.trim(),
  };
}

function parseKyaraFile(filePath) {
  try {
    const parsed = parseMarkdownFile(filePath);
    return {
      zodiacKeywords: parsed.frontmatter.zodiac_keywords || [],
      houseColors: parsed.frontmatter.house_colors || {},
      ...parsed.frontmatter
    };
  } catch (err) {
    console.warn(`Could not parse KYARA file: ${filePath}`);
    return null;
  }
}

function findFile(files, pattern) {
  return files.find(f => pattern.test(f));
}

function scanAiBou(aibouName, aibouPath) {
  const files = fs.readdirSync(aibouPath);
  
  // Check required files per SSOT
  const yattaiImageFile = findFile(files, REQUIRED_PATTERNS.yattaiImage);
  const kyaraFile = findFile(files, REQUIRED_PATTERNS.kyara);
  
  if (!yattaiImageFile || !kyaraFile) {
    console.warn(`⚠️  ${aibouName} missing required files (YATTAi.jpg, KYARA.md), skipping...`);
    return null;
  }

  // Parse KYARA.md (SSOT primary metadata source)
  const kyaraPath = path.join(aibouPath, kyaraFile);
  const kyara = parseKyaraFile(kyaraPath);
  
  if (!kyara) {
    console.warn(`⚠️  ${aibouName} KYARA.md parse failed, skipping...`);
    return null;
  }

  // Parse METALE.md for description
  const metaleFile = findFile(files, OPTIONAL_PATTERNS.metale);
  let description = '';
  if (metaleFile) {
    const metalePath = path.join(aibouPath, metaleFile);
    const metale = parseMarkdownFile(metalePath);
    description = metale.content;
  }

  // Build card data per SSOT KyaraSynth + KyaraMetale + Kyara mapping
  const card = {
    id: aibouName.toLowerCase(),
    name: kyara.name || aibouName,
    tagline: kyara.tagline || '',
    description: description,
    role: kyara.role || 'AI Agent',
    color: kyara.color || '#8040C0',
    zodiacKeywords: kyara.zodiacKeywords || [],
    houseColors: kyara.houseColors || {},
    // KyaraSynth Image_1: YATTAi.jpg -> Background_Image
    backgroundImage: `/aiboumos/yattai/${aibouName}/${yattaiImageFile}`,
    files: {
      kyara: `/aiboumos/yattai/${aibouName}/${kyaraFile}`,
    },
  };

  // KyaraSynth Image_2: KYARA-hero.png -> Hero_Avatar
  const heroFile = findFile(files, OPTIONAL_PATTERNS.hero);
  if (heroFile) {
    card.heroAvatar = `/aiboumos/yattai/${aibouName}/${heroFile}`;
  }

  // KyaraMetale: METALE.md -> Main Bio
  if (metaleFile) {
    card.files.metale = `/aiboumos/yattai/${aibouName}/${metaleFile}`;
  }

  return card;
}

function main() {
  console.log('🔍 Scanning SSOT-compliant YATTAI directory: /public/aiboumos/yattai/');

  if (!fs.existsSync(YATTAI_DIR)) {
    console.log('⚠️  YATTAI directory not found at /public/aiboumos/yattai/');
    console.log('Creating directory structure...');
    fs.mkdirSync(YATTAI_DIR, { recursive: true });
    console.log('✅ Directory created. Add AiBou folders with KYARA.md and YATTAi.jpg files.');
    return;
  }

  const aibouDirs = fs.readdirSync(YATTAI_DIR)
    .filter(item => {
      const itemPath = path.join(YATTAI_DIR, item);
      return fs.statSync(itemPath).isDirectory();
    });

  const cards = [];

  for (const aibouName of aibouDirs) {
    const aibouPath = path.join(YATTAI_DIR, aibouName);
    const card = scanAiBou(aibouName, aibouPath);
    
    if (card) {
      cards.push(card);
      console.log(`✅ ${aibouName}`);
    }
  }

  // Sort cards by name
  cards.sort((a, b) => a.name.localeCompare(b.name));

  console.log(`\n✅ Hydrated ${cards.length} AiBou cards from SSOT`);
  console.log('📊 Cards available for SSR/build-time rendering');
  
  // Return cards for module export (no intermediate JSON file per SSOT)
  return cards;
}

main();

// Export for SSR/build-time usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { scanYattaiDirectory: main };
}
