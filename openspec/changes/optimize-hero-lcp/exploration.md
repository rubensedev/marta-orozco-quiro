## Exploration: optimize-hero-lcp

**Change**: `optimize-hero-lcp` (GitHub #5)  
**Engram note**: config `memory_project` is `marta-orozco-quiro`, but Engram store only knows `ruben` (`unknown_project` for the former). Artifacts saved under project `ruben`.

### Current State

- LCP element in Lighthouse baselines is the hero portrait SVG (~3.21 MB), not the background.
- `HeroPortrait.astro` serves raw `<img src="/assets/images/hero-marta.svg">` from `public/` (no Astro pipeline). Intrinsic attrs `width=260` `height=514`; source is 1081×2141-class detail.
- NEW `public/assets/images/hero-marta.webp` exists (~1.11 MB, **lossless WebP + alpha**, 1081×2141). Swap alone does **not** meet the ~200–300 KB acceptance target.
- `Hero.astro` background uses Astro `<Image />` from `src/assets/images/hero.webp` (~50 KB) with `fetchpriority="high"` + `loading="eager"`.
- Two `HeroPortrait` instances: mobile (`lg:hidden`, lazy/auto) + desktop (`hidden lg:block`, eager+high). CSS-hidden desktop still downloads on mobile because eager+high.
- `Massages.astro` first panel `<Image />` also `loading="eager"` `fetchpriority="high"` — third high-priority competitor below the fold.
- Portrait CSS in `global.css` (`.hero-portrait*`) sizes ~full-width mobile / `min(100%, 20rem)` desktop — display size ≪ source pixels.
- Repo convention: optimized rasters live under `src/assets/` and use Astro `<Image />` (see Hero bg, Contact, Massages).

**Baselines** (dev localhost:4321):

| Report | Perf | LCP | Notes |
|--------|------|-----|-------|
| en_mobile | 55 | 24.6s | hero-marta.svg High ~3135KB |
| es_mobile | 57 | 24.6s | same |
| es_web | 74 | 4.1s | same SVG |
| en_web | 74 | 4.0s | same SVG |

### Affected Areas

- `src/components/HeroPortrait.astro` — replace SVG `<img>` with Astro `<Image />`; priority props
- `src/components/Hero.astro` — dual portrait instances; demote bg priority; possibly collapse to one portrait
- `src/components/Massages.astro` — demote first-panel eager/high
- `src/styles/global.css` — portrait sizing (likely keep; verify after Image width/height)
- `src/assets/images/` — destination for portrait source
- `public/assets/images/hero-marta.svg` — stop serving; remove or leave unused
- `public/assets/images/hero-marta.webp` — move/replace; do not ship 1.1 MB static as LCP

### Approaches

1. **(A) Move WebP → `src/assets` + Astro `<Image />` with widths/quality** — Import portrait; generate responsive variants (`widths`+`sizes` or `densities`); set `quality` ~70–85 lossy; one LCP-priority winner.
   - Pros: Matches repo convention; sharp pipeline shrinks transfer to display size; srcset for DPR; alpha preserved as WebP.
   - Cons: Need careful single-instance / priority wiring; must verify visual quality.
   - Effort: Low–Medium

2. **(B) Keep public static WebP** — Point `<img>` at `/assets/images/hero-marta.webp` (maybe compress in place).
   - Pros: Minimal template change.
   - Cons: No automatic resize/srcset; 1.1 MB lossless still fails acceptance unless separately re-encoded at display size; fights convention.
   - Effort: Low (incomplete without C)

3. **(C) Further recompress / re-export before commit** — Lossy WebP (or AVIF) at ~2× display width (~520–640 CSS-px → ~1040–1280 px tall source), target ≤200–300 KB master file; optionally feed into A.
   - Pros: Guarantees budget even for static fallback; shrinks git blob; good if Image defaults still large.
   - Cons: Manual tooling; quality judgment; may be redundant if A’s quality+widths already hit target.
   - Effort: Low–Medium

**Note**: Lossless 1.1 MB WebP alone does **not** meet acceptance. Need Astro Image quality/widths (**A**) and/or lossy re-encode (**C**). Prefer **A primary**, **C if** measured largest served byte size still >~300 KB or repo wants a smaller master.

### LCP priority winner

**Winner: hero portrait** (not hero background, not Massages panel).

Rationale:
- Baselines already attribute LCP to `hero-marta.svg`.
- Portrait is the large foreground content paint; bg is already ~50 KB.
- Massages panel is below the fold → `loading="lazy"` + `fetchpriority="auto"`.
- Hero bg → drop to `fetchpriority="auto"` (keep eager if needed for paint, but not high).
- Only **one** portrait request should be high/eager; prefer **single** `HeroPortrait` instance (responsive CSS) over dual mobile/desktop nodes so CSS-hidden eager never double-fetches.

### Recommendation

**A (+ C if needed after measure)**: Move/re-export portrait into `src/assets/images/`, render via Astro `<Image />` with display-appropriate `widths`/`sizes` (or densities) and lossy `quality`, stop using SVG, demote hero bg + Massages high priority, consolidate to one LCP-priority portrait. Document before/after LCP in issue #5 comments after verify.

### Risks

- Alpha/edge quality loss after lossy encode (check dark + light overlays).
- Dual-instance leftover still causes double download if priority not fixed.
- Oversized `widths` (e.g. full 1081) can keep LCP bytes high despite WebP.
- Dev-server Lighthouse ≠ production CDN caching; re-measure after `astro build` if possible.
- Engram project-name drift (`ruben` vs `marta-orozco-quiro`).

### Ready for Proposal

Yes — scope and approach clear. Orchestrator should run **sdd-propose** next; lock A as default, C as fallback/quality gate, and single-portrait + demote competing highs as hard requirements.
