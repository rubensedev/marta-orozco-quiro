# Tasks: Optimize Hero LCP

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~80–150 (3 components + CSS + asset move/delete; optional C re-encode) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Hero LCP portrait pipeline + priority demotion + C gate | PR 1 | `npx astro build` (+ `npx astro check`) | Preview homepage; measure `dist/_astro/hero-marta*.webp` sizes | Revert portrait Image wiring, public SVG/WebP, Hero/Massages priorities, CSS fold |

## Phase 1: Assets

- [x] 1.1 Move `public/assets/images/hero-marta.webp` → `src/assets/images/hero-marta.webp`
- [x] 1.2 Delete leftover `public/assets/images/hero-marta.webp` after move
- [x] 1.3 DELETE `public/assets/images/hero-marta.svg` (user lock; must not remain in repo)

## Phase 2: HeroPortrait pipeline

- [x] 2.1 Rewrite `src/components/HeroPortrait.astro`: import WebP from `src/assets`; Astro `<Image />` with `width={320}` `height={634}` `widths={[320,480,640]}` `sizes="(min-width: 1024px) 20rem, min(92vw, 28rem)"` `quality={80}` `format="webp"` `loading="eager"` `fetchpriority="high"` `decoding="async"`; drop `priority` prop; keep `class` + `portraitAlt`

## Phase 3: Wiring + CSS

- [x] 3.1 `src/components/Hero.astro`: single `<HeroPortrait … />` (remove dual/`--mobile`); set hero bg `fetchpriority="auto"` (keep `loading="eager"`)
- [x] 3.2 `src/components/Massages.astro`: first panel `<Image>` → `loading="lazy"` `fetchpriority="auto"`
- [x] 3.3 `src/styles/global.css`: fold `.hero-portrait--mobile` into `.hero-portrait` @≤1023px so one instance sizes correctly

## Phase 4: Build + C measure gate

- [x] 4.1 Run `npx astro build` (and `npx astro check` if practical); confirm portrait under `dist/_astro/`, no public SVG/WebP portrait paths
- [x] 4.2 Measure largest `dist/_astro/hero-marta*.webp` (read-only); if max ≤~300 KB, skip C (do **not** precompress)
- [x] 4.3 ONLY IF max >~300 KB: sharp lossy re-encode `src/assets/images/hero-marta.webp` (keep alpha, max w ≤640–800, q ~75–80) → rebuild → remeasure until ≤~300 KB or document visual floor

## Phase 5: Apply smoke (visual)

- [x] 5.1 Manual visual: portrait sizing/CLS, light/dark alpha edges, ES/EN non-empty `portraitAlt`

## Phase 6: Optional verify (post-apply; not required for apply done)

- [x] 6.1 Mobile Lighthouse — **superseded** by later `fix-critical-path` Netlify moqtest (Perf 87 / LCP 3.9s) after portrait WebP + C2 priority work
- [x] 6.2 Before/after LCP notes — covered in `fix-critical-path` verify-report / issue trail; portrait SVG→WebP shipped in `1abd288` / `7c2ffba` lineage
