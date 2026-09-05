# Design: Optimize Hero LCP

## Technical Approach

Primary **A**: move `hero-marta.webp` into `src/assets/images/`, render via Astro `<Image />` with capped responsive `widths`/`sizes` + lossy `quality`, one DOM portrait as sole `eager`/`fetchpriority="high"` LCP winner. Demote hero background + Massages first panel. Delete public SVG; remove leftover public WebP after move. Fallback **C** only if post-build largest served portrait variant still >~300 KB.

Maps proposal capability `hero-lcp`. No layout/copy redesign.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|----------|---------|--------|-----------|
| Responsive strategy | `densities` vs `widths`+`sizes` | `widths`+`sizes` | Display width changes mobile→desktop; densities alone assumes fixed CSS width (Massages cards). Contact already uses `sizes`. |
| Exact Image props | — | See Interfaces | Cap at ~2× desktop 20rem; avoid shipping 1081w. |
| Portrait instances | Keep dual / collapse one | **One** `HeroPortrait` | Dual mobile lazy + desktop eager still downloads desktop on mobile (`hidden lg:block`). |
| Priority API | Keep optional `priority` | Hardcode eager/high; drop `priority` prop | Single LCP node needs no toggle. |
| Hero bg demote | auto+eager / lazy | `fetchpriority="auto"` + `loading="eager"` | Still paints with hero; must not race LCP. |
| Massages first panel | auto+lazy | `loading="lazy"` `fetchpriority="auto"` | Below fold; stop third high competitor. |
| Master precompress (C) | Always / never / gate | **Gate only** if max served >~300 KB | User lock. |
| SVG / public WebP | Leave unused / delete | **Delete** SVG; move WebP then delete public copy | User lock; avoid shipping 3.2 MB / 1.1 MB static. |

## Data Flow

```
public/hero-marta.webp ──move──► src/assets/images/hero-marta.webp
                                         │
                         HeroPortrait <Image widths/sizes/quality>
                                         │
                    astro build → dist/_astro/hero-marta.*.webp
                                         │
                              max file size ≤~300 KB?
                               │yes              │no
                               ▼                 ▼
                            verify LH      C: sharp lossy re-encode
                                            master → rebuild → recheck

Browser: only portrait high+eager; bg auto+eager; Massages panel auto+lazy
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/assets/images/hero-marta.webp` | Create | Move from `public/` (1081×2141, alpha). |
| `public/assets/images/hero-marta.webp` | Delete | After move; do not ship static LCP. |
| `public/assets/images/hero-marta.svg` | Delete | Remove ~3.2 MB critical-path asset. |
| `src/components/HeroPortrait.astro` | Modify | Import WebP; `<Image />` props below; drop `priority`. |
| `src/components/Hero.astro` | Modify | Single portrait; bg `fetchpriority="auto"` (keep eager). |
| `src/components/Massages.astro` | Modify | First panel → lazy/auto. |
| `src/styles/global.css` | Modify | Fold `.hero-portrait--mobile` rules into `.hero-portrait` @≤1023px so one instance sizes correctly. |

## Interfaces / Contracts

`HeroPortrait.astro` (non-obvious pattern):

```astro
---
import { Image } from "astro:assets";
import heroPortrait from "../assets/images/hero-marta.webp";
interface Props { class?: string; portraitAlt: string }
const { class: className = "", portraitAlt } = Astro.props;
---
<div class:list={["hero-portrait", className]}>
  <Image
    class="hero-portrait__image"
    src={heroPortrait}
    alt={portraitAlt}
    width={320}
    height={634}
    widths={[320, 480, 640]}
    sizes="(min-width: 1024px) 20rem, min(92vw, 28rem)"
    quality={80}
    format="webp"
    loading="eager"
    fetchpriority="high"
    decoding="async"
  />
</div>
```

- **Display dims** `320×634`: desktop CSS `min(100%, 20rem)`; aspect ≈ prior `260×514` (CLS).
- **widths** capped at **640** (~2×320); do not include master 1081.
- **quality 80**: mid of proposal 70–85; matches hero-bg lossy habit.
- **Hero.astro**: one `<HeroPortrait class="hero-reveal hero-reveal--4" … />` (no `--mobile` / dual).
- **Hero bg**: `fetchpriority="auto"` `loading="eager"` `quality={85}` unchanged otherwise.
- **Massages** first `<Image>`: `loading="lazy"` `fetchpriority="auto"`.

### Approach C measure gate (apply)

1. `astro build` (preview preferred for LH).
2. Measure largest generated portrait bytes: `dist/_astro/hero-marta*.webp` (or hashed names matching portrait import) — `ls -la` / file size; **gate = max ≥ ~300 KB**.
3. If over: `sharp` lossy WebP (keep alpha), max width ≤640–800, quality ~75–80 → overwrite `src/assets/images/hero-marta.webp` → rebuild → remeasure until ≤~300 KB or document visual floor.
4. Do **not** precompress before first Image-pipeline measure.

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | N/A | No test runner (`strict_tdd: false`). |
| Integration | Build output | `astro build` (+ `astro check`); confirm no `/assets/images/hero-marta.svg` or public WebP; portrait under `/_astro/`. |
| Manual / E2E | LCP + visuals | Mobile LH vs 24.6s baseline; DevTools Network: one high portrait; bg/Massages not high; light/dark alpha edges; note #5. |

## Threat Matrix

N/A — no routing, shell/subprocess product surface, VCS/PR automation, executable-file classification, or process-integration boundary. Static image assets + Astro templates only.

## Migration / Rollout

No feature flags. Single commit/PR sized change. Rollback: restore public SVG/WebP wiring and prior priorities (proposal).

## Open Questions

- [ ] None blocking — quality 80 / widths 640 are apply-tunable if LH or visual check demands.
