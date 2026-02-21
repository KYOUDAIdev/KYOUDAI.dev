# KYOUDAI.dev

**With joy as our telos.**

A Next.js-powered digital playground where AI agents generate content through markdown-based protocols.

## Portals

- **RespEngr**: Desktop-like BlogOS with draggable windows and randomized backgrounds
- **PrAPPt**: Structured learning framework (in development)
- **AiBouMoS**: AI agent marketplace with downloadable PrAPPt scripts

## Quick Start

```bash
# Install dependencies
npm install

# Generate content indexes
npm run catch

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## AiBou Content Pipeline

This site uses a **content-as-code** architecture where AI agents (AiBous) generate markdown files that are automatically transformed into UI:

1. AiBous create markdown content in `/public/`
2. Catcher scripts scan directories and generate JSON indexes
3. React components consume JSON and render UI

### Available Catchers

```bash
npm run catch:respengr   # Scan RespEngr articles and images
npm run catch:aiboumos   # Scan AiBou marketplace cards
npm run catch            # Run all catchers
```

## AiBou Team

- **AiTHENA**: SiteMapUJ architecture
- **EudAImonium**: RespEngr content
- **ImageSynth**: RespEngr images
- **SocraticAudit**: PrAPPt curriculum
- **LinkWeaver**: PrAPPt management
- **GraphicSynth**: PrAPPt infographics
- **GameSynth**: PrAPPt gamification
- **Kyara**: AiBou character profiles
- **KyaraSynth**: AiBou images
- **KyaraMetale**: AiBou narratives
- **Kiro IDE Agent**: Code implementation

See `AIBOU_TEAM_GUIDE.md` for detailed workflows.

## Tech Stack

- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- React
- Node.js (catcher scripts)

## Documentation

- `SiteMapUJ-KYOUDAI.dev.md` - Complete site blueprint
- `AIBOU_INTEGRATION.md` - Technical architecture
- `AIBOU_TEAM_GUIDE.md` - AiBou workflows and prompts

## Project Structure

```
KYOUDAI_ROOT/
├── app/                    # Next.js pages and components
├── public/                 # Static content (markdown, images, data)
│   ├── respengr/          # RespEngr articles and images
│   ├── aiboumos/yattai/   # AiBou marketplace data
│   └── data/              # Generated JSON indexes
├── scripts/               # Catcher scripts
│   ├── osCatcher.js       # RespEngr content scanner
│   └── cardCatcher.js     # AiBouMoS card scanner
└── lib/                   # Shared utilities
```

## Adding Content

### RespEngr Article

1. Create `/public/RespEngr/RespEngr_Desktop/My-Article.md`
2. Run `npm run catch:respengr`
3. Article appears as desktop icon

### AiBou Card

1. Create `/public/AiBouMoS/Cards_YATTAi/MyAiBou/`
2. Add `YATTAI.md` (with frontmatter) and `PROFILE.jpg`
3. Run `npm run catch:aiboumos`
4. Card appears in marketplace

---

© 2024 KYOUDAI.dev | Built with joy by the AiBou Development Team
