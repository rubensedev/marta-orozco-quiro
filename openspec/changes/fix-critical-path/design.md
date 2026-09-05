# Design: Fix Critical Path

## Technical Approach

Recover mobile CWV after `optimize-hero-lcp` by aligning fetch priority with the **live LCP winner** (hero background) and cutting early carousel main-thread work. Maps proposal capability `critical-path-perf` and **MODIFIED** `hero-lcp` winner policy. FA / Google Fonts untouched (deferred to `optimize-fonts-icons`).

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|----------|---------|--------|-----------|
| LCP winner | C1 portrait-high / C2 bg-high | **C2** | Prod/moqtest LH attributes LCP to bg `img.absolute…object-cover`; dual-high races decode |
| Portrait priority | lazy+auto / eager+auto | **eager + `fetchpriority="auto"`** | Still above-fold paint; must not use `high` |
| Bg responsive | fixed 1536 only / widths+sizes | **`widths` + `sizes="100vw"`** | Full-bleed; stop shipping desktop decode on mobile |
| Portrait trim | keep 640@q90 / tighten | **drop 640; q≈75–80; sizes ≈ CSS** | Exploration: ~82 KB@640 vs ~452 CSS px waste |
| Carousel defer | rewrite metrics / idle+IO | **shared idle+IO wrapper** | Low effort; removes early reflow/clone without behavior rewrite |
| Defer API | duplicate in 2 scripts / export helper | **export from `horizontal-carousel.ts`** | One pattern; Massages+Reviews stay thin |
| Spec reconcile | ignore / amend in this change | **MODIFIED `hero-lcp` delta here** | Avoid drift vs prior “portrait sole high” |
| Verify gate | `astro dev` / preview+prod | **preview or Netlify only** | Dev toolbar/Vite inflate scores |
| Logo intrinsic size | skip / add w/h | **optional if ≤few lines** | CLS hygiene only; not success-critical |

## Data Flow

```
Hero.astro <Image hero.webp>
  widths/sizes + eager + fetchpriority=high   ← sole high
       │
HeroPortrait <Image hero-marta.webp>
  tighter widths/quality/sizes + eager + auto  ← demoted

Massages / Reviews <script>
  whenNearIdle(section|track) ──► initHorizontalCarousel(...)
       │                              │
       └─ requestIdleCallback / IO ───┘  (no init at module evaluate)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/Hero.astro` | Modify | Bg sole `high`; add `widths`/`sizes`; keep eager |
| `src/components/HeroPortrait.astro` | Modify | `fetchpriority="auto"`; trim `widths`/`quality`/`sizes` |
| `src/scripts/horizontal-carousel.ts` | Modify | Add `whenNearIdle(root, run)` (IO + idle/timeout fallback); keep `initHorizontalCarousel` unchanged |
| `src/components/Massages.astro` | Modify | Wrap carousel init in defer helper; keep first-panel lazy/auto |
| `src/components/Reviews.astro` | Modify | Same defer around infinite carousel init |
| `src/components/Header.astro` (optional) | Modify | Logo `width`/`height` if trivial |
| `openspec/changes/fix-critical-path/specs/hero-lcp/spec.md` | Spec delta (sdd-spec) | MODIFIED: bg sole high; portrait MUST NOT be high |
| `openspec/changes/fix-critical-path/specs/critical-path-perf/spec.md` | Spec delta (sdd-spec) | ADDED: responsive hero imgs; deferred carousel; preview/prod verify |

No app deletes. Do not edit `Layout.astro` font/icon links.

## Interfaces / Contracts

### Hero bg (`Hero.astro`)

```astro
<Image
  src={heroBg}
  alt={…}
  width={1536}
  height={1024}
  widths={[640, 960, 1280, 1536]}
  sizes="100vw"
  quality={85}
  loading="eager"
  fetchpriority="high"
/>
```

### Portrait (`HeroPortrait.astro`)

```astro
<!-- keep width/height 320×634 for CLS -->
widths={[240, 320, 480]}
sizes="(min-width: 1024px) 20rem, min(92vw, 28rem)"
quality={80}
loading="eager"
fetchpriority="auto"
decoding="async"
format="webp"
```

### Carousel defer (`horizontal-carousel.ts`)

```ts
export function whenNearIdle(
  root: Element,
  run: () => void,
  opts?: { rootMargin?: string; timeoutMs?: number },
): void;
// Prefer: IntersectionObserver (rootMargin ~200–400px) → requestIdleCallback
// Fallback: setTimeout(timeoutMs ?? 2000) if never intersecting / no rIC
// Guard: run once
```

Call sites pass section/track element; **do not** change `HorizontalCarouselOptions` or infinite/clone logic.

### Spec amendment (intent for sdd-spec)

Replace “Single high-priority LCP **portrait**” with: exactly one hero image may use `fetchpriority="high"` — the **background**; portrait and Massages first panel MUST NOT.

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | N/A | No test runner |
| Integration | Build attrs | `astro build` + `astro check`; inspect HTML: one `fetchpriority="high"` (bg); portrait `auto`; srcset present |
| Manual CWV | Mobile LH | **Only** `astro preview` or Netlify; record Perf/FCP/LCP/TBT/CLS + LCP selector; compare moqtest 52 / 5.1 / 7.6 and main 73 / 1.9 / 4.8 |
| Smoke | Carousels | Scroll to Massages/Reviews; nav + infinite Reviews still work after defer |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No migration. Ship with existing branch; rollback = revert priority/sizes + restore eager carousel init; restore portrait-sole-high only if rolling back the spec amendment.

## Open Questions

- [ ] (none blocking) Optional logo `width`/`height` — include only if apply stays tiny
- [ ] Exact `rootMargin` / idle timeout — apply may tune 200–400px / 1–2s without design change
