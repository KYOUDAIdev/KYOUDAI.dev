/**
 * cardCatcher.js
 * Scans /public/aiboumos/yattai/{AiBou} directories and generates card data
 * Each AiBou must have: YATTAI.md, PROFILE.jpg, and optionally KYARA.md, METALE.md
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const YATTAI_DIR = path.join(__dirname, '../public/aiboumos/yattai');
const OUTPUT_JSON = path.join(__dirname, '../public/data/aiboumos.json');

// Required files for a valid AiBou card
const REQUIRED_FILES = ['YATTAI.md', 'PROFILE.jpg'];
const OPTIONAL_FILES = ['KYARA.md', 'METALE.md', 'IMAGE.jpg'];

function parseYattaiFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  
  return {
    frontmatter: data,
    description: body.trim(),
  };
}

function scanAiBou(aibouName, aibouPath) {
  const files = fs.readdirSync(aibouPath);
  
  // Check required files
  const hasRequired = REQUIRED_FILES.every(file => files.includes(file));
  if (!hasRequired) {
    console.warn(`⚠️  ${aibouName} missing required files, skipping...`);
    return null;
  }

  // Parse YATTAI.md
  const yattaiPath = path.join(aibouPath, 'YATTAI.md');
  const yattai = parseYattaiFile(yattaiPath);

  // Build card data
  const card = {
    id: aibouName.toLowerCase(),
    name: yattai.frontmatter.name || aibouName,
    tagline: yattai.frontmatter.tagline || '',
    description: yattai.description,
    role: yattai.frontmatter.role || 'AI Agent',
    color: yattai.frontmatter.color || '#8040C0',
    profileImage: `/aiboumos/yattai/${aibouName}/PROFILE.jpg`,
    files: {
      yattai: `/aiboumos/yattai/${aibouName}/YATTAI.md`,
    },
  };

  // Add optional files
  if (files.includes('KYARA.md')) {
    card.files.kyara = `/aiboumos/yattai/${aibouName}/KYARA.md`;
  }
  if (files.includes('METALE.md')) {
    card.files.metale = `/aiboumos/yattai/${aibouName}/METALE.md`;
  }
  if (files.includes('IMAGE.jpg')) {
    card.files.image = `/aiboumos/yattai/${aibouName}/IMAGE.jpg`;
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
