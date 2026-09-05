# Tasks: Fix Critical Path

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~40–100 (4–5 components/scripts; optional logo) |
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
| 1 | C2 hero priority + responsive imgs + carousel defer | PR 1 | `npx astro build` (+ `npx astro check`) | `astro preview` or Netlify mobile LH; smoke Massages/Reviews scroll | Revert Hero/HeroPortrait attrs; remove `whenNearIdle`; restore eager carousel inits |

## Phase 1: Hero LCP priority + responsive images

- [x] 1.1 `src/components/Hero.astro`: bg `<Image>` → `loading="eager"` `fetchpriority="high"`; add `widths={[640,960,1280,1536]}` `sizes="100vw"` (keep `width`/`height` 1536×1024, `quality={85}`)
- [x] 1.2 `src/components/HeroPortrait.astro`: `fetchpriority="auto"` (not high); `widths={[240,320,480]}` `quality={80}`; keep CLS `width`/`height` 320×634, `sizes="(min-width: 1024px) 20rem, min(92vw, 28rem)"`, eager/async/webp

## Phase 2: Carousel defer helper

- [x] 2.1 `src/scripts/horizontal-carousel.ts`: export `whenNearIdle(root, run, opts?)` — IO (`rootMargin` ~200–400px) → `requestIdleCallback`; `setTimeout(timeoutMs ?? 2000)` fallback; run-once guard; leave `initHorizontalCarousel` / options unchanged

## Phase 3: Wire deferred init

- [x] 3.1 `src/components/Massages.astro`: wrap `initHorizontalCarousel` in `whenNearIdle` (section/track root); no init at module evaluate
- [x] 3.2 `src/components/Reviews.astro`: same defer around infinite carousel init
- [x] 3.3 Confirm Massages first-panel image stays `loading="lazy"` `fetchpriority="auto"` (no high)

## Phase 4: Optional logo (skip if not trivial)

- [x] 4.1 ONLY IF ≤few lines: `src/components/Header.astro` logo imgs get explicit `width`/`height`; must not change hero priorities

## Phase 5: Build inspect + smoke + CWV gate

- [x] 5.1 `npx astro build` (+ `npx astro check` if practical); inspect HTML: exactly one hero `fetchpriority="high"` (bg); portrait `auto`; bg/portrait srcset present
- [x] 5.2 Smoke: scroll Massages/Reviews; nav + Reviews infinite still work after defer — Netlify LH forced-reflow empty; carousel scripts still load deferred (deployed `7ac98b1`+)
- [x] 5.3 Mobile LH on Netlify moqtest (JSON fetchTime 2026-09-05T09:22Z): Perf **87** / FCP **1.9s** / LCP **3.9s** / TBT **0** / CLS ~0; LCP = hero bg `img.absolute`; vs prior moqtest 52/5.1/7.6 and main 73/1.9/4.8

## Out of scope (do not task)

- Font Awesome, Google Fonts, icon migration, `Layout.astro` font/icon links
- Spec file edits (hero-lcp amendment already in change specs)
