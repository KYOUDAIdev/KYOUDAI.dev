/**
 * cardCatcher.js
 * Scans /public/AiBouMoS/Cards_YATTAi/{AiBou} directories and generates card data
 * Each AiBou must have: YATTAI.md, PROFILE.jpg, and optionally KYARA.md, METALE.md
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const YATTAI_DIR = path.join(__dirname, '../public/AiBouMoS/Cards_YATTAi');
const OUTPUT_JSON = path.join(__dirname, '../public/data/aiboumos.json');

// Required files for a valid AiBou card (case-insensitive patterns)
const REQUIRED_PATTERNS = {
  yattai: /\.YATTAi\.md$/i,
  profile: /\.Profile\.jpg$/i
};
const OPTIONAL_PATTERNS = {
  card: /\.CARD\.md$/i,
  image: /\.IMAGE\.jpg$/i
};

function parseYattaiFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  
  return {
    frontmatter: data,
    description: body.trim(),
  };
}

function findFile(files, pattern) {
  return files.find(f => pattern.test(f));
}

function scanAiBou(aibouName, aibouPath) {
  const files = fs.readdirSync(aibouPath);
  
  // Check required files using patterns
  const yattaiFile = findFile(files, REQUIRED_PATTERNS.yattai);
  const profileFile = findFile(files, REQUIRED_PATTERNS.profile);
  
  if (!yattaiFile || !profileFile) {
    console.warn(`⚠️  ${aibouName} missing required files, skipping...`);
    return null;
  }

  // Parse YATTAi.md
  const yattaiPath = path.join(aibouPath, yattaiFile);
  const yattai = parseYattaiFile(yattaiPath);

  // Build card data
  const card = {
    id: aibouName.toLowerCase(),
    name: yattai.frontmatter.name || aibouName,
    tagline: yattai.frontmatter.tagline || '',
    description: yattai.description,
    role: yattai.frontmatter.role || 'AI Agent',
    color: yattai.frontmatter.color || '#8040C0',
    profileImage: `/AiBouMoS/Cards_YATTAi/${aibouName}/${profileFile}`,
    files: {
      yattai: `/AiBouMoS/Cards_YATTAi/${aibouName}/${yattaiFile}`,
    },
  };

  // Add optional files
  const cardFile = findFile(files, OPTIONAL_PATTERNS.card);
  if (cardFile) {
    card.files.card = `/AiBouMoS/Cards_YATTAi/${aibouName}/${cardFile}`;
  }
  
  const imageFile = findFile(files, OPTIONAL_PATTERNS.image);
  if (imageFile) {
    card.files.image = `/AiBouMoS/Cards_YATTAi/${aibouName}/${imageFile}`;
  }

  // Extract commands from YATTAI.md
  const commandRegex = /```(?:bash|shell)?\n(.*?)\n```/gs;
  const commands = [];
  let match;
  while ((match = commandRegex.exec(yattai.description)) !== null) {
    commands.push(match[1].trim());
  }
  card.commands = commands;

  return card;
}

function main() {
  console.log('🔍 Scanning AiBouMoS YATTAI directory...');

  if (!fs.existsSync(YATTAI_DIR)) {
    console.log('⚠️  YATTAI directory not found, creating...');
    fs.mkdirSync(YATTAI_DIR, { recursive: true });
    
    // Write empty output
    const outputDir = path.dirname(OUTPUT_JSON);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify({ cards: [], generatedAt: new Date().toISOString() }, null, 2));
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

  // Create output
  const output = {
    cards,
    generatedAt: new Date().toISOString(),
    count: cards.length,
  };

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_JSON);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write JSON
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(output, null, 2));

  console.log(`\n✅ Generated aiboumos.json with ${cards.length} AiBou cards`);
}

main();
