# Proposal: Fix Critical Path

## Intent

Netlify mobile LH regressed vs main (Perf 73→52, FCP 1.9→5.1s, LCP 4.8→7.6s). LCP element is hero **background** `hero.webp`, not portrait. Branch has dual `fetchpriority="high"`, oversized portrait, early carousel reflow. Recover CWV without touching Font Awesome / Google Fonts (deferred).

## Scope

### In Scope

- **LCP C2**: exactly one `fetchpriority="high"` — **hero bg sole high**; portrait → eager + `auto` (or equivalent)
- Responsive `widths`/`sizes` on hero bg; tighten portrait widths/quality/sizes to ~display CSS px
- Keep Massages first-panel demotion (already on branch)
- **D1**: defer Massages + Reviews `initHorizontalCarousel` via idle / IntersectionObserver
- **E**: LH only on `astro build`+preview or Netlify; compare main / `moqtest` baselines
- Optional cheap: logo `width`/`height` if trivial

### Out of Scope

- FA CDN, Google Fonts, self-host, FA→SVG, subset, font family swaps → later **`optimize-fonts-icons`** (alt `defer-font-icon-cdn`)
- Hero layout/copy redesign; re-do portrait SVG→WebP pipeline
- Compress plugin / major SEO HTML trim; favicon redesign unless tiny
- Explore A/B (icons/fonts) for this change

## Capabilities

### New Capabilities

- `critical-path-perf`: Hero LCP priority (bg sole high) + responsive hero images; deferred carousel init; preview/prod CWV verify protocol

### Modified Capabilities

- `hero-lcp`: Amend “portrait sole high” → **background sole high**; portrait must not use `fetchpriority="high"` (reconciles live LCP winner)

## Approach

Prod LH: LCP = bg `img.absolute…object-cover`; render delay 240→690ms. Prefer **C2** over C1. Explicitly **amends** `optimize-hero-lcp` lock (portrait sole high / task 3.1 bg `auto`) — apply left bg at `high`; live evidence says flip the lock to bg. Shared FA+GFonts floor remains; do not fix here. Carousel: idle/IO defer only (no rewrite). Verify: never gate on `astro dev`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/Hero.astro` | Modified | Bg sole `high`; `widths`/`sizes` |
| `src/components/HeroPortrait.astro` | Modified | Demote priority; trim widths/quality/sizes |
| `src/scripts/horizontal-carousel.ts` | Modified | Idle/IO defer entry |
| `Massages.astro` / `Reviews.astro` | Modified | Call deferred init; keep Massages low priority |
| `optimize-hero-lcp` / `hero-lcp` | Amended | LCP-winner policy flip |
| Logo imgs (optional) | Modified | Intrinsic size attrs |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Spec drift vs portrait-sole-high | High | MODIFIED `hero-lcp` in same change |
| Carousel FOUC until init | Low | IO near section; brief delay OK |
| Fonts still floor FCP | Med | Accept; defer `optimize-fonts-icons` |
| Dev LH false negatives | Med | Preview/prod only (E) |

## Rollback Plan

Revert Hero/portrait priority + sizes; restore eager carousel init; keep Massages demotion if desired. Spec: restore portrait-sole-high if rolling back amendment.

## Dependencies

- Follows `optimize-hero-lcp` apply (WebP portrait, Massages demoted)
- Amends `hero-lcp` LCP-winner requirement
- Defers fonts/icons to `optimize-fonts-icons`

## Success Criteria

- [ ] Exactly one hero `fetchpriority="high"` (bg); portrait not high
- [ ] Bg + portrait have display-fit `sizes`/`widths`; Massages stays non-high
- [ ] Carousels init only on idle/near-viewport
- [ ] Mobile LH on preview or Netlify improves vs branch baseline (52 / FCP 5.1 / LCP 7.6); note LCP selector; no `astro dev` gate
