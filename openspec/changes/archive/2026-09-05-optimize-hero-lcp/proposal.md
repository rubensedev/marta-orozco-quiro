# Proposal: Optimize Hero LCP

## Intent

Mobile LCP is ~24.6s (perf 55–57) because the hero portrait is a ~3.2 MB SVG from `public/`, racing with other `fetchpriority="high"` images. Cut transfer/decode of the true LCP asset so the portrait paints fast without competing highs.

## Scope

### In Scope

- Move `hero-marta.webp` into `src/assets/images/` and render via Astro `<Image />` with display-fit `widths`/`sizes` (or densities) and lossy `quality` (~70–85)
- Single `HeroPortrait` instance (responsive CSS); sole eager/`fetchpriority="high"` LCP winner
- Demote hero background + Massages first panel from eager/high
- Stop referencing `public` SVG; delete or leave unused (no critical-path load)
- Gate: if largest served portrait variant still >~300 KB, lossy re-encode master (approach C)
- Verify with build + Lighthouse; note before/after on issue #5

### Out of Scope

- Font/icon self-hosting
- Dedicated service pages
- Approach B (static `public/` WebP without Image pipeline) as primary path
- Redesign of hero layout/copy

## Capabilities

### New Capabilities

- `hero-lcp`: Hero portrait delivery (Astro Image pipeline, byte budget, single LCP-priority request) and demotion of competing high-priority images

### Modified Capabilities

- None

## Approach

Primary **A**: import WebP from `src/assets`, Astro `<Image />` with responsive widths + quality. Portrait is the only high-priority LCP candidate. Prefer one portrait DOM node to avoid dual download. Fallback/gate **C**: lossy re-encode if measured served bytes still >~300 KB. Aligns with repo Image convention (Hero bg, Massages, Contact).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/HeroPortrait.astro` | Modified | SVG `<img>` → Astro `<Image />` + priority props |
| `src/components/Hero.astro` | Modified | One portrait; demote bg priority |
| `src/components/Massages.astro` | Modified | First panel → lazy/auto |
| `src/assets/images/` | New/Modified | Portrait source for pipeline |
| `public/assets/images/hero-marta.svg` | Removed/Unused | Off critical path |
| `public/assets/images/hero-marta.webp` | Moved/Removed | Do not ship 1.1 MB static as LCP |
| `src/styles/global.css` | Modified (verify) | Keep portrait sizing; check after Image dims |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Alpha/edge quality after lossy encode | Med | Visual check light/dark overlays |
| Dual portrait still double-fetches | Med | Single instance + one high priority |
| Oversized `widths` keep bytes high | Med | Cap near 2× display (~520–640 CSS px); gate C |
| Dev LH ≠ production | Low | Prefer post-`astro build` measure when practical |

## Rollback Plan

Restore SVG/`public` portrait wiring and prior `fetchpriority`/`loading` on Hero bg + Massages; remove `src/assets` portrait import. Revert commit(s) for this change.

## Dependencies

- Existing `hero-marta.webp` master (move/re-encode as needed)
- Astro Image / sharp already in project
- Baselines recorded (mobile LCP 24.6s / 55–57; desktop ~4s / 74)

## Success Criteria

- [ ] Portrait served via Astro Image from `src/assets` (not raw public SVG)
- [ ] One high-priority portrait request; bg + Massages panel not high
- [ ] Largest relevant served portrait variant ≤~300 KB (or C applied)
- [ ] Mobile LCP materially improved vs 24.6s baseline; issue #5 notes before/after
