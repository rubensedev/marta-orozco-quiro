# Tasks: Improve Site Performance

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~60 (fonts + C1/C2 only; icons cancelled) |
| 400-line budget risk | Low |
| Chained PRs recommended | No (icons cancelled) |
| Suggested split | fonts+images only |
| Delivery strategy | ask-on-risk |
| Chain strategy | feature-branch-chain — Unit 1 shipped; Unit 2 **cancelled** |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: Unit 2 icons cancelled by user 2026-09-05 (restore FA)
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Status |
|------|------|--------|
| 1 | Fontsource Noto Sans+Serif + C1/C2 (KEEP FA CDN) | **Done** (`09fcf55`) |
| 2 | Icon system + migrate FA + drop FA CDN | **Cancelled** — FA approach restored |

## Phase 1: Icon system foundation — CANCELLED

- [ ] ~~1.1 Create Icon.astro~~ — **cancelled** (keep Font Awesome)
- [ ] ~~1.2 Add glyph modules~~ — **cancelled**

## Phase 2: Migrate FA + remove CDN — CANCELLED

- [ ] ~~2.1–2.5 FA→SVG + remove CDN~~ — **cancelled**; FA CDN remains in `Layout.astro`

## Phase 3: Self-hosted fonts (keep Noto)

- [x] 3.1 Add `@fontsource/noto-sans` + `@fontsource/noto-serif` (latin 300/400/500/600)
- [x] 3.2 `Layout.astro`: drop GFonts; fontsource CSS; preload Sans/Serif 400; **keep FA CDN**
- [x] 3.3 `global.css` tokens stay Noto Sans / Noto Serif

## Phase 4: Image leftovers (C1/C2)

- [x] 4.1 AboutStats: `widths={[400,640,960]}`, `sizes="min(1120px, calc(100vw - 2rem))"`, lazy
- [x] 4.2 Footer logo `width="300" height="56"`

## Phase 5: Build + CWV verify

- [x] 5.1 `npm run check` + `npm run build` (exit 0) at Unit 1
- [x] 5.2 Unit 1: no `fonts.googleapis` / `fonts.gstatic` in dist; FA/`cdnjs` **allowed** (icons cancelled)
- [x] 5.3 Closed as fonts-unit acceptance: GFonts removed; FA intentionally retained; further LH optional post-deploy

## Cancellation note (2026-09-05)

User stopped icon apply mid-flight, restored FA call sites + CDN, deleted `src/components/icons/`. Delivered scope = **fonts + images only**. Site-header FA→SVG MODIFIED delta **not applied**.
