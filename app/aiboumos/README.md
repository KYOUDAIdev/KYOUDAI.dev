# AiBouMoS Portal - SSOT-Compliant Architecture

## SSOT Enforcement

This implementation strictly adheres to the SiteMapUJAi.json Single Source of Truth (SSOT). All components, data structures, and file paths are mapped exactly as specified in the SSOT schema.

## Directory Structure (SSOT-Compliant)

```
app/aiboumos/
├── components/
│   ├── AiBouMoSHeader.tsx          # SSOT: AiBouMoS_Header
│   ├── AiBouMoSMarquis.tsx         # SSOT: AiBouMoS_Marquis
│   ├── AiBouMoSSearchBar.tsx       # SSOT: AiBouMoS_Guide_and_Search_Bar
│   ├── YATTAiCard.tsx              # SSOT: YATTAI_Cards (individual)
│   └── AiBouMoSFooter.tsx          # SSOT: AiBouMoS_Footer
├── createaccount/
│   └── page.tsx                    # SSOT: AiBouMoS_Create_Account
├── login/
│   └── page.tsx                    # SSOT: AiBouMoS_Login
├── myaccount/
│   └── page.tsx                    # SSOT: AiBouMoS_My_Account
├── page.tsx                        # Main portal (inline modals per SSOT)
└── README.md                       # This file
```

## Data Hydration Pipeline (SSOT)

### cardCatcher.js

**SSOT Source Directory:** `/public/aiboumos/yattai/{AiBou_ID}/`

**SSOT Required Files:**
- `{AiBou_ID}.KYARA.md` - Primary metadata source (zodiac_keywords, house_colors)
- `{AiBou_ID}.YATTAi.jpg` - Card background image

**SSOT Optional Files:**
- `{AiBou_ID}.METALE.md` - Extended narrative/bio
- `{AiBou_ID}.KYARA-hero.png` - Hero avatar for profile page

**SSOT Output:** Direct SSR/build-time hydration (NO intermediate JSON file)

### SSOT Data Mapping

#### KyaraSynth (Images)
- **Image_1:** `{AiBou_ID}.YATTAi.jpg` → YATTAi Cards Background_Image (30% opacity)
- **Image_2:** `{AiBou_ID}.KYARA-hero.png` → AiBou Profile Page Hero_Avatar

#### KyaraMetale (Narrative)
- `{AiBou_ID}.METALE.md` → YATTAi Cards {AiBou_Description} (Truncated preview)
- `{AiBou_ID}.METALE.md` → AiBou Profile Page Main Bio (Full narrative)

#### Kyara (Metadata)
- `{AiBou_ID}.KYARA.md` frontmatter:
  - `zodiac_keywords` array → Keyword buttons on YATTAi cards (max 4)
  - `house_colors` object → CSS variables for borders, hover states, accents

## Component Architecture (SSOT-Mapped)

### SSOT: AiBouMoS_Header
- **KYOUDAI_dev:** Left-aligned, Noto Mono XL, onClick → https://KYOUDAI.dev
- **AiBou_Mall_of_Services:** Center-aligned, Noto Mono XXL
- **Auth_Logic:**
  - Guest: Login + Create_Account buttons
  - Authenticated: My_Account button
- **Accessibility:** Right-aligned, opens inline modal

### SSOT: AiBouMoS_Marquis
- Scrolling keyword marquee
- Keywords clickable → updates search state

### SSOT: AiBouMoS_Guide_and_Search_Bar
- Search input with real-time filtering
- Guide link → /aiboumos-guide
- **Search_Logic:** Zustand/React Context store (searchTerm state)

### SSOT: AiBouMoS_YATTAis
**Definition:** Yatai + Yatta! + AI. Storefronts where visitors meet AiBou partners.

**Component_Logic:**
- **Visuals:**
  - background-image: {AiBou}.YATTAi.jpg (30% opacity)
  - font-family: Noto Mono
- **Keywords:** Clicking executes setSearchTerm('{Keyword}')
- **Sub-Profile_Link:** Clicking Name/Description opens inline modal

**YATTAI_Cards Specification:**
- Background_Image: YATTAi.jpg, 30% opacity, center 40%, 100% width, 20% height focal
- Content:
  - AiBou_Name: Noto Mono L, left-aligned, onClick → profile modal
  - AiBou_Description: Noto Mono S, left-aligned, truncated
  - Keywords: [Keyword] x 4 max, Noto Mono SS, onClick → search

### SSOT: AiBouMoS_Footer
- **Versioning:** [KYOUDAI.dev | est. 2026], Noto Mono XL, center
- **Quick_Links:** [RespEngr] | [PrAPPt] | [AiBouMoS], Noto Mono L, center
- **Buttons:** [AiBouMoS Guide] [Contact] [GitHub] [Discord] [X], Noto Mono L, right

## Authentication Pages (SSOT-Compliant)

### SSOT: AiBouMoS_Login
**Fields:**
- Username (Text_Input)
- Password (Text_Input)
- Forgot Password (Link)
- Login (Button)

**MFA:**
- Authenticator App TOTP (Text_Input)
- TOTP_Login (Button)

### SSOT: AiBouMoS_Create_Account
**Fields (Exact SSOT Labels):**
- Username (Up to 12 character alphanumeric string)
- First Name
- Middle Init. (OPTIONAL)
- Last Name
- E-mail Address [verify] (Verification email/SEND_AGAIN)
- Verification Code [send] (OK/FAILED/TRY_AGAIN)
- Refer E-Mail Address (comma-separated, automatic referral at creation)
- Receive Notifications (Checkbox)
- Create Account (Button)

### SSOT: AiBouMoS_My_Account
**Fields:**
- {Username}
- Hello! AiBou {First}, {Middle}, {Last}
- {Joined Date}
- Free/Paid Subscription Tier
- E-mail Address [change e-mail]
- Password (Hidden) [forgot?] [change?]
- Multifactor Authentication? "Configured/Not Configured [Setup]" [Reset]
- Notifications [Turn On/Turn Off]

**My_Favorite_AiBou_Partners:**
- [{AiBou Name}] [Copy Config]

**Active_Keys_And_Configs:**
- {AiBou_Name_A}: Paid Tier - Unlimited, [Copy Config] [Rotate Key]
- {AiBou_Name_B}: Free Tier - 88/100 remaining, [Copy Config] [Upgrade to Paid]

## SSOT: Subscription_Logic

### Free_Tier
- Component: CopyButton
- Action: Copies URL with limited API Key
- Server-side rate limit: 100 calls/month

### Paid_Tier
- Component: StripeLink
- Action: $10/month
- Unlocks 'Unlimited' API key upon Stripe webhook confirmation

### Buy_AiBou
- Component: Inquiry/High-Value
- Action: $5K-$10K
- Triggers Stripe Invoice
- Sends automated ZIP package

## SSOT: Delivery_Mechanism

**MCP Configuration String:**
```bash
npx -y @kyoudai/prappt-fetcher --key USER_SIG_KEY --id {AiBou_ID}
```

**MCP_JSON_Template:**
```json
{
  "mcpServers": {
    "AiBou-Partner": {
      "command": "npx",
      "args": ["-y", "@kyoudai/prappt-fetcher", "--key", "USER_SIG_KEY", "--id", "AiBou_ID"]
    }
  }
}
```

## Inline Modals (SSOT-Compliant)

Per SSOT, modals are handled inline within page.tsx, not as separate components:

### AiBouMoS_Accessibility Modal
- High Contrast Mode (Toggle)
- Text-to-Speech (Toggle)
- Dyslexic-Friendly Font (Toggle)

### AiBou Profile Modal
- Hero section with KYARA-hero.png
- Full METALE.md content
- Subscription tiers (Free/Paid/Buy)
- MCP configuration string
- Download links (KYARA.md, METALE.md)

## Running the Data Pipeline

```bash
node scripts/cardCatcher.js
```

Scans `/public/aiboumos/yattai/` per SSOT and returns card array for SSR hydration.

## SSOT Compliance Checklist

✅ Directory path: `/public/aiboumos/yattai/{AiBou_ID}/`
✅ Required files: KYARA.md, YATTAi.jpg
✅ Optional files: METALE.md, KYARA-hero.png
✅ Flattened component structure (no YATTAiGrid container)
✅ Inline modals (no separate modal components)
✅ Exact SSOT labels in Create_Account (verify, SEND_AGAIN, OK/FAILED/TRY_AGAIN)
✅ No intermediate JSON output (direct SSR hydration)
✅ All typography: Noto Mono (font-mono)
✅ All component names match SSOT keys
