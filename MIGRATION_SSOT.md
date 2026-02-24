# SSOT Migration Guide

## Required Actions

The AiBouMoS portal has been refactored to enforce strict SSOT compliance with the SiteMapUJAi specification.

### 1. Directory Structure Migration

**OLD (Non-SSOT):**
```
/public/AiBouMoS/Cards_YATTAi/{AiBou_ID}/
```

**NEW (SSOT-Compliant):**
```
/public/aiboumos/yattai/{AiBou_ID}/
```

### 2. File Structure Migration

**OLD Files (Remove):**
- `{AiBou_ID}.YATTAi.md` ❌
- `{AiBou_ID}.Profile.jpg` ❌
- `{AiBou_ID}.CARD.md` ❌

**NEW Files (SSOT-Required):**
- `{AiBou_ID}.KYARA.md` ✅ (Primary metadata source)
- `{AiBou_ID}.YATTAi.jpg` ✅ (Background image)

**NEW Files (SSOT-Optional):**
- `{AiBou_ID}.METALE.md` ✅ (Full narrative)
- `{AiBou_ID}.KYARA-hero.png` ✅ (Hero avatar)

### 3. KYARA.md Format (SSOT)

```markdown
---
name: AiTHENA
tagline: The Architect of Digital Blueprints
role: SiteMapUJ Development
color: "#FF6B9D"
zodiac_keywords:
  - Architecture
  - Design
  - Planning
  - Structure
house_colors:
  primary: "#FF6B9D"
  accent: "#FF8FB3"
---

Brief character description (optional, METALE.md is primary narrative source)
```

### 4. Migration Steps

1. **Create SSOT directory structure:**
   ```bash
   mkdir -p public/aiboumos/yattai
   ```

2. **For each AiBou, create SSOT-compliant folder:**
   ```bash
   # Example for AiTHENA
   mkdir -p public/aiboumos/yattai/aithena
   ```

3. **Convert YATTAi.md → KYARA.md:**
   - Extract frontmatter from YATTAi.md
   - Add `zodiac_keywords` array (4 keywords max for display)
   - Add `house_colors` object (primary, accent)
   - Save as `{AiBou_ID}.KYARA.md`

4. **Rename Profile.jpg → YATTAi.jpg:**
   ```bash
   # Example
   cp public/AiBouMoS/Cards_YATTAi/AiTHENA_YATTAi/AiTHENA.Profile.jpg \
      public/aiboumos/yattai/aithena/aithena.YATTAi.jpg
   ```

5. **Create METALE.md (if needed):**
   - Move full narrative content from YATTAi.md body
   - Save as `{AiBou_ID}.METALE.md`

6. **Add hero avatar (optional):**
   - Create or convert hero image
   - Save as `{AiBou_ID}.KYARA-hero.png`

7. **Run SSOT-compliant cardCatcher:**
   ```bash
   node scripts/cardCatcher.js
   ```

8. **Verify output:**
   - Should see: "✅ Hydrated X AiBou cards from SSOT"
   - Should NOT create `/public/data/aiboumos.json`

### 5. Code Changes Summary

✅ **Removed:**
- YATTAiGrid container component
- Separate AiBouProfileModal component
- Separate AccessibilityModal component
- Intermediate JSON output file

✅ **Updated:**
- cardCatcher.js → SSOT-compliant paths and file patterns
- YATTAiCard → Uses zodiac_keywords and house_colors
- page.tsx → Inline modals per SSOT
- createaccount/page.tsx → Exact SSOT labels (verify, SEND_AGAIN, OK/FAILED/TRY_AGAIN)

✅ **Maintained:**
- All SSOT component names (AiBouMoS_Header, AiBouMoS_Marquis, etc.)
- Noto Mono typography throughout
- 30% opacity background images
- Center 40% focal point
- Max 4 keyword buttons

### 6. Verification Checklist

- [ ] Directory path: `/public/aiboumos/yattai/{AiBou_ID}/`
- [ ] Each AiBou has KYARA.md with zodiac_keywords array
- [ ] Each AiBou has YATTAi.jpg background image
- [ ] METALE.md contains full narrative (optional)
- [ ] KYARA-hero.png for profile pages (optional)
- [ ] cardCatcher.js runs without errors
- [ ] No `/public/data/aiboumos.json` file created
- [ ] All components use font-mono (Noto Mono)
- [ ] Create Account page shows exact SSOT labels

### 7. Example Migration

**Before (Non-SSOT):**
```
/public/AiBouMoS/Cards_YATTAi/AiTHENA_YATTAi/
├── AiTHENA.YATTAi.md
├── AiTHENA.Profile.jpg
└── AiTHENA.CARD.md
```

**After (SSOT-Compliant):**
```
/public/aiboumos/yattai/aithena/
├── aithena.KYARA.md
├── aithena.YATTAi.jpg
├── aithena.METALE.md (optional)
└── aithena.KYARA-hero.png (optional)
```

## Support

For questions about SSOT compliance, refer to:
- `app/aiboumos/README.md` - Full SSOT documentation
- `scripts/cardCatcher.js` - SSOT data hydration logic
- SiteMapUJAi.json - Original SSOT specification
