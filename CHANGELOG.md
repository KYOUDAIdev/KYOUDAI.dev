# Changelog

## v2.0 - AiBou Integration (February 2024)

### Major Features

#### Content Pipeline Architecture
- Implemented **osCatcher.js** for automatic RespEngr content discovery
- Implemented **cardCatcher.js** for automatic AiBouMoS card generation
- Added build scripts: `npm run catch`, `npm run catch:respengr`, `npm run catch:aiboumos`
- Integrated catchers into build process

#### RespEngr Enhancements
- Dynamic desktop icon generation from file tree
- Owchie Eye randomizer now pulls from scanned images
- Click-to-open article feature for background images
- Folder navigation with DraggableFolderWindow component
- Auto-discovery of markdown files and folder structure

#### AiBouMoS Marketplace
- Dynamic card grid populated from YATTAI directories
- Modal view with AiBou details and downloadable scripts
- Support for YATTAI.md, KYARA.md, METALE.md files
- Command extraction from markdown code blocks
- Profile image display

#### AiBou Team Integration
- Created YATTAI profiles for AiTHENA and EudAImonium
- Established markdown-based PrAPPt protocol
- Documented workflows in AIBOU_TEAM_GUIDE.md
- Added technical architecture in AIBOU_INTEGRATION.md

### Components

#### New Components
- `BlogOSTaskbar` - RespEngr taskbar with Owchie Eye
- `DraggableArticleModal` - Draggable markdown article viewer
- `DraggableFolderWindow` - Draggable folder browser

#### Updated Components
- RespEngr page now consumes dynamic data
- AiBouMoS page now renders cards from JSON
- Home page with chromatic hover effects

### Infrastructure

#### Scripts
- `scripts/osCatcher.js` - RespEngr content scanner
- `scripts/cardCatcher.js` - AiBouMoS card generator

#### Data Files
- `/public/data/respengr.json` - Generated file tree and image links
- `/public/data/aiboumos.json` - Generated AiBou cards

#### Utilities
- `lib/respengr-data.ts` - TypeScript interfaces for RespEngr data
- `lib/portal-colors.ts` - Chromatic color system

### Documentation
- `README.md` - Updated with AiBou pipeline info
- `AIBOU_INTEGRATION.md` - Technical architecture guide
- `AIBOU_TEAM_GUIDE.md` - Comprehensive AiBou workflows
- `SiteMapUJ-KYOUDAI.dev.md` - Master blueprint

### Content
- Sample article: "Welcome to RespEngr"
- Sample article: "The Philosophy of Joy" (with image link)
- AiTHENA YATTAI and KYARA profiles
- EudAImonium YATTAI and KYARA profiles

## v1.0 - Foundation (Initial Release)

### Core Features
- Next.js 15 App Router setup
- Gateway homepage with portal links
- Basic RespEngr workspace
- Chromatic color system (Fuchsia/Teal/Purple)
- About, Contact, Projects pages
- Tailwind CSS styling
- TypeScript configuration

### Design System
- CSS custom properties for portal colors
- Minimalist black/white aesthetic
- Hover state animations
- Responsive layout

---

**With joy as our telos.**
