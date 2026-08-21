# Design: Add Client Reviews

## Technical Approach

Data-first Astro section + shared `horizontal-carousel` helper with `infinite` flag. Maps proposal Approach A / `client-reviews`. Spec owns behavior; this owns HOW.

Order: Hero → About → Massages → Rituals → **Reviews** → Contact. `navItems` gains TESTIMONIOS → `#testimonios` before Contact (Header unchanged).

## Architecture Decisions

| Decision | Options | Tradeoff | Choice |
|----------|---------|----------|--------|
| Sharing | Helper vs copy vs marquee | Shared touches Massages; copy drifts; marquee=autoplay | **`src/scripts/horizontal-carousel.ts`** + `infinite` |
| CSS | Full rename vs dual-class | Rename = big PR | **Dual-class**: `.massage-carousel` + `.site-carousel` share track/nav; massage card CSS stays; review cards Tailwind |
| Infinite DOM | Suffix clone vs prefix+suffix | Suffix needs careful start | **Clone one full set after originals**; jump by exact set width |
| Stars | New token vs amber | No star token | **`fa-solid fa-star` + `text-amber-400`**, decorative + sr-only “5 de 5” |
| Heading / CTA | Custom vs SectionHeading | Pattern match | **`SectionHeading`**; **no Reservar** |

## Data Flow

```
site.ts (reviewsContent, reviews[], navItems)
  ├─► Header (nav)
  └─► Reviews.astro (#testimonios)
        ├─ SectionHeading
        ├─ .site-carousel track + Tailwind cards
        └─ initHorizontalCarousel({…, infinite: true })
Massages.astro ──► same helper (infinite: false); panel/selection stays local
```

## Infinite algorithm

1. SSR N slides; init clones N slides once → 2N.
2. `setWidth` = width of first N slides + gaps (or `scrollWidth/2` if mirror).
3. On scroll near end of originals into clones: temp disable snap; `scrollLeft -= setWidth`; restore snap.
4. `updateNavButtons`: `infinite` → never disable when overflow (only hide if no overflow). `!infinite` → keep Massages end-stops (`≤4` / `≥ maxScroll−4`).
5. `scrollTrackBy(±1)` = slideWidth + gap; **no autoplay**. Drag: 8px threshold (Massages pattern).

```mermaid
sequenceDiagram
  participant U as User
  participant T as Track
  participant H as Helper
  U->>H: nav or drag
  H->>T: scroll
  alt infinite near clone edge
    H->>T: snap off; jump ±setWidth; snap on
  else finite
    H->>H: disable ends
  end
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/data/site.ts` | Modify | `Review`, `reviewsContent`, `reviews` (≥8), nav before Contact |
| `src/components/Reviews.astro` | Create | `#testimonios`, heading, carousel, `infinite: true` |
| `src/pages/index.astro` | Modify | Mount after Rituals, before Contact |
| `src/scripts/horizontal-carousel.ts` | Create | Drag, step, nav, optional loop jump |
| `src/components/Massages.astro` | Modify | Wire helper `infinite: false`; keep panel JS |
| `src/styles/global.css` | Modify | Dual-class track/nav alias only |
| `Header.astro` / `SectionHeading.astro` | None | Unchanged |

## Interfaces / Contracts

```ts
export type Review = {
  id: string;
  name: string;
  stars: 5;
  quote: string;
  treatmentName: string;
};

type HorizontalCarouselOptions = {
  track: HTMLElement;
  prevBtn: HTMLButtonElement | null;
  nextBtn: HTMLButtonElement | null;
  slideSelector: string;
  infinite: boolean;
};
```

`reviewsContent.heading` / `.description` = locked proposal copy. Reviews slides are static (not `role="option"`). IDs: `reviewsCarouselTrack|Prev|Next`.

## CSS / JS reuse

- **JS**: Extract `getSlide`, `scrollTrackBy`, drag, `updateNavButtons` → helper. Massages keeps `switchTreatment` / panel / `setActiveCard`.
- **CSS**: Comma-group shared viewport/track/slide/nav; keep `.massage-carousel-card*`; reuse `--*-visible` breakpoints; no leftover CSS for review card chrome.

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | N/A | No test runner |
| Typecheck | Astro/TS | `npx astro check` |
| Manual | Loop, massage ends, nav | Both carousels; `#testimonios`; reduced-motion |

## Threat Matrix

N/A — no routing/shell/subprocess/VCS/executable/process-integration boundary.

## Migration / Rollout

No migration. If authored diff >400 lines, ask before apply (`delivery_strategy: ask-on-risk`); optional chain: data+section vs helper extract.

## Open Questions

- [ ] None blocking. Apply may pick suffix-only vs dual-edge clone if jump stays seamless and massages stay finite.
