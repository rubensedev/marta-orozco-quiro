# Proposal: Improve Site Performance

## Intent

After `fix-critical-path`, moqtest mobile sits at Perf **87** / FCP **1.9s** / LCP **3.9s** / TBT **0**, but render-blocking ~**890ms** remains from Google Fonts + Font Awesome CDN. Act now on that deferred floor (prior name `optimize-fonts-icons`): self-host **Noto** (same faces as today), replace FA with inline SVGs, and clear small image/CLS leftovers.

## Scope

### In Scope

- **Fonts B2+ (user lock)**: Self-host **Noto Sans** + **Noto Serif** via `@fontsource/*` npm packages (no manual Google download into `public/`); keep `--font-sans` / `--font-serif` tokens unchanged; drop GFonts CSS + preconnects; subset weights to site use (**300/400/500/600**, drop unused **700**); `font-display: swap`; preload critical woff2 (Sans 400 + Serif 400)
- **Icons A1**: ~20 inline/SVG icons; remove cdnjs FA CSS/fonts; update Header, MobileBar, Contact, Reviews, Massages, Rituals, BookingModal, PageScripts, `shared.ts`
- **C1**: AboutStats decorative `Image` — responsive `widths`/`sizes` (Hero pattern)
- **C2**: Footer logo intrinsic `width`/`height`
- **Verify D**: LH only on `astro build`+preview or Netlify; compare vs Perf 87 / FCP 1.9 / LCP 3.9 / TBT 0 + render-blocking delta

### Out of Scope

- Hero LCP C2 redo; favicon (unless trivial later); SEO HTML trim; lucide / unplugin-icons (A3)
- FA subset keep-classes (A2); Niramit + Plus Jakarta family swap (B1); `@astrojs/font` (B3); dropping Noto Serif / remapping `font-serif` → Sans
- Manual “download from Google Fonts → copy into project folder” workflow (use fontsource packages instead)
- Layout/copy redesign; compress plugin as primary goal

## Capabilities

### New Capabilities

- `site-perf-assets`: Self-hosted Noto Sans + Noto Serif (no GFonts); inline SVG icon set (~20 glyphs, no FA CDN); AboutStats responsive Image delivery; footer logo sizing; preview/prod CWV verify for remaining floor

### Modified Capabilities

- `site-header`: Hamburger requirement — Font Awesome → inline/SVG icon (still MUST NOT use CSS-drawn bars; open state SHOULD show close/X SVG)

## Approach

**Follows / depends on** applied `fix-critical-path` (FA + GFonts were deferred there). **User override (2026-09-05):** reject B1 Niramit/Jakarta; keep Noto as used now. Kill cdnjs FA + GFonts RTT; add `@fontsource/noto-sans` + `@fontsource/noto-serif` (latin weights used on site); leave theme tokens as Noto Sans / Noto Serif; replace FA `<i>` / className swaps with SVG components or stable icon ids; PageScripts theme/menu/savings must leave FA class strings together. Image leftovers C1+C2 ride along. If authored diff approaches **400 lines**, prefer two chained units (icons | fonts+images).

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

- [ ] No Google Fonts or cdnjs FA on built pages; Noto Sans + Noto Serif served from self-hosted (fontsource/build) assets; tokens still Noto
- [ ] All prior FA glyphs replaced by inline/SVG; hamburger meets MODIFIED site-header
- [ ] AboutStats has display-fit `widths`/`sizes`; footer logo has width/height
- [ ] Mobile LH on preview or Netlify: FCP and/or render-blocking improve vs ~890ms floor; cite Perf/FCP/LCP/TBT vs 87 / 1.9 / 3.9 / 0; no `astro dev` gate
