# Proposal: Improve Site Performance

## Intent

After `fix-critical-path`, moqtest mobile sits at Perf **87** / FCP **1.9s** / LCP **3.9s** / TBT **0**, but render-blocking remained from Google Fonts + Font Awesome CDN. Delivered scope (2026-09-05): self-host **Noto** via fontsource + AboutStats/Footer image sizing. **Icons / FA removal cancelled** by user — Font Awesome CDN retained.

## Scope

### In Scope

- **Fonts B2+ (user lock)**: Self-host **Noto Sans** + **Noto Serif** via `@fontsource/*` npm packages (no manual Google download into `public/`); keep `--font-sans` / `--font-serif` tokens unchanged; drop GFonts CSS + preconnects; subset weights to site use (**300/400/500/600**, drop unused **700**); `font-display: swap`; preload critical woff2 (Sans 400 + Serif 400)
- **C1**: AboutStats decorative `Image` — responsive `widths`/`sizes` (Hero pattern)
- **C2**: Footer logo intrinsic `width`/`height`
- **Verify D**: build evidence that GFonts are gone; FA CDN intentionally kept

### Out of Scope

- **Icons A1 / FA CDN removal** (cancelled 2026-09-05 — FA approach restored)
- `site-header` FA → SVG MODIFIED (not applied)
- Hero LCP C2 redo; favicon; SEO HTML trim; lucide; B1 Niramit/Jakarta; manual Google zip → `public/`

## Capabilities

### New Capabilities

- `site-perf-assets`: Self-hosted Noto Sans + Noto Serif (no GFonts); AboutStats responsive Image; footer logo sizing; FA CDN retention accepted for this change

### Modified Capabilities

- None shipped (`site-header` SVG delta cancelled)

## Approach

**Follows** `fix-critical-path`. Self-host Noto via `@fontsource`; drop GFonts; keep FA CDN; C1+C2 image attrs. Icon unit started then **rolled back** per user.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/layouts/Layout.astro` | Modified | Drop GFonts/FA; import fontsource CSS; preload critical Noto woff2 |
| `src/styles/global.css` | Unchanged tokens | Keep `--font-sans`→Noto Sans, `--font-serif`→Noto Serif |
| Header / MobileBar / Contact / Reviews / Massages / Rituals / BookingModal / PageScripts | Modified | FA → SVG |
| `src/data/site/shared.ts` | Modified | `iconClass` → icon id |
| `AboutStats.astro` / `Footer.astro` | Modified | C1 widths/sizes; C2 logo attrs |
| `package.json` | Modified | `@fontsource/noto-sans`, `@fontsource/noto-serif` |
| `openspec/specs/site-header/spec.md` | Modified | Hamburger FA → SVG |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| site-header FA MUST blocks apply | High | MODIFIED delta in same change |
| PageScripts FA class/innerHTML drift | Med | Migrate toggles + savings HTML together |
| Accent / subset coverage | Med | Latin (+ latin-ext if needed) for Spanish glyphs |
| Brand SVG accuracy/license | Med | Simple recognizable brand paths |
| Review size >400 lines | Med | Chain icons vs fonts+images if needed |
| Dev LH noise | Med | Preview/Netlify only |

## Rollback Plan

Restore Layout GFonts + FA CDN links; remove fontsource deps / imports / preloads; revert icon/SVG migration; restore AboutStats/Footer image attrs. Revert `site-header` delta to Font Awesome MUST. Tokens need no rollback if left as Noto.

## Dependencies

- **Depends on** completed `fix-critical-path` (hero LCP + carousel defer; FA/GFonts intentionally untouched)
- Fulfills deferred fonts/icons work previously named `optimize-fonts-icons`

## Success Criteria

- [x] No Google Fonts on built pages; Noto Sans + Noto Serif self-hosted; tokens still Noto; **FA CDN retained**
- [x] AboutStats has display-fit `widths`/`sizes`; footer logo has width/height
- [x] Icons cancelled — FA approach restored (no SVG icon system in tree)
