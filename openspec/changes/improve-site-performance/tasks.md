# Tasks: Improve Site Performance

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~450–700 (20 glyphs + ~8 FA surfaces + fonts + C1/C2) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR1 fonts+images → PR2 icons (deferred) |
| Delivery strategy | ask-on-risk |
| Chain strategy | feature-branch-chain |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain (fonts+images first; icons deferred until user OK)
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Fontsource Noto Sans+Serif + C1/C2 (KEEP FA CDN) | PR 1 | `npm run check && npm run build` + grep dist for no `fonts.googleapis`/`fonts.gstatic` | Manual visual + mobile LH; FA still present OK | `package.json` fontsource, Layout GFonts, AboutStats, Footer |
| 2 | Icon system + migrate FA + drop FA CDN | PR 2 (**deferred**) | `npm run check && npm run build` + grep dist for no `cdnjs`/`font-awesome` | Preview: hamburger/theme/savings icons | `src/components/icons/`, FA call sites, Layout FA link, `shared.ts` |

User lock 2026-09-05: apply Unit 1 only; do not execute icon tasks yet.

## Phase 1: Icon system foundation

- [ ] 1.1 Create `src/components/icons/Icon.astro` with `IconName` union (20 ids), `class`, `aria-hidden`
- [ ] 1.2 Add glyph modules under `src/components/icons/` for: bars, xmark, sun, moon, circle-half-stroke, language, chevron-down, chevron-left, chevron-right, check, tag, whatsapp, instagram, google, clock, location-dot, arrow-right, star, spa, feather-pointed

## Phase 2: Migrate FA + remove CDN

- [ ] 2.1 `src/components/Header.astro`: FA→`<Icon>`; dual bars/xmark hamburger; themeOptions icon ids; data attrs for PageScripts
- [ ] 2.2 `src/components/PageScripts.astro`: drop FA class maps; toggle `hidden` on SVG siblings; savings HTML without FA classes
- [ ] 2.3 Migrate FA in `MobileBar.astro`, `Contact.astro`, `Reviews.astro`, `Massages.astro`, `Rituals.astro`, `BookingModal.astro` → `<Icon name="…" />`
- [ ] 2.4 `src/data/site/shared.ts` (+ `index.ts` if needed): `iconClass` → `icon: "spa" | "feather-pointed"`
- [ ] 2.5 `src/layouts/Layout.astro`: remove Font Awesome CDN stylesheet/webfont links

## Phase 3: Self-hosted fonts (keep Noto)

- [x] 3.1 Add `@fontsource/noto-sans` + `@fontsource/noto-serif` to `package.json` (latin weights **300/400/500/600**; no manual Google zip → `public/`)
- [x] 3.2 `src/layouts/Layout.astro`: drop GFonts preconnect/CSS; import fontsource CSS for those weights; preload Noto Sans 400 + Noto Serif 400 woff2
- [x] 3.3 Confirm `src/styles/global.css` tokens stay `--font-sans: "Noto Sans"` and `--font-serif: "Noto Serif"` (no family remap)

## Phase 4: Image leftovers (C1/C2)

- [x] 4.1 `src/components/AboutStats.astro`: `widths={[400,640,960]}`, `sizes` ≈ `min(1120px, calc(100vw - 2rem))`; keep lazy
- [x] 4.2 `src/components/Footer.astro`: logo `width="300" height="56"`

## Phase 5: Build + CWV verify

- [x] 5.1 Run `npm run check` and `npm run build` (exit 0)
- [ ] 5.2 Grep `dist/`: no `fonts.googleapis`, `fonts.gstatic`, `cdnjs`, `font-awesome` — **Unit 1 variant**: no GFonts only; FA/`cdnjs` may remain (icons deferred)
- [ ] 5.3 Mobile LH on `astro preview` or Netlify only; cite Perf/FCP/LCP/TBT vs 87/1.9s/3.9s/0 and render-blocking vs ~890ms — **pending user manual check**
