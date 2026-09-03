# Tasks: Add Client Reviews

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 280–450 |
| 400-line budget risk | Medium |
| Chained PRs recommended | Yes |
| Suggested split | PR1 helper+Massages → PR2 data+Reviews+mount |
| Delivery strategy | ask-on-risk (resolved: feature-branch-chain) |
| Chain strategy | feature-branch-chain |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Shared carousel extract; Massages finite | PR 1 | `npx astro check` | Manual: massage prev/next end-disable + drag | `horizontal-carousel.ts`, `Massages.astro`, dual-class CSS only |
| 2 | Reviews data, section, nav, infinite | PR 2 | `npx astro check` | Manual: `#testimonios` loop, nav, card anatomy | `site.ts` reviews/nav, `Reviews.astro`, `index.astro` mount |

Threat matrix: N/A (no RED threat tasks).

## Phase 1: Foundation / Data

- [x] 1.1 Add `Review` type + `reviewsContent` (locked heading/description) in `src/data/site.ts`.
- [x] 1.2 Add `reviews[]` ≥8 Spanish mocks from `exploration.md` (`stars: 5`, treatment titles match site).
- [x] 1.3 Insert `navItems` `{ href: "#testimonios", label: "TESTIMONIOS" }` immediately before Contact.

## Phase 2: Shared Carousel

- [x] 2.1 Create `src/scripts/horizontal-carousel.ts`: drag (8px), `scrollTrackBy`, `updateNavButtons`, suffix clone + set-width jump when `infinite: true`; no autoplay.
- [x] 2.2 Dual-class aliases in `src/styles/global.css` (`.massage-carousel` + `.site-carousel` share viewport/track/slide/nav); keep `.massage-carousel-card*`.
- [x] 2.3 Wire `Massages.astro` to helper with `infinite: false`; keep panel/`switchTreatment`/`setActiveCard` local. Verify: ends still disable.

## Phase 3: Reviews Section

- [x] 3.1 Create `src/components/Reviews.astro`: `id="testimonios"`, `SectionHeading`, `.site-carousel`, IDs `reviewsCarouselTrack|Prev|Next`.
- [x] 3.2 Cards: 5× `fa-solid fa-star text-amber-400` + sr-only “5 de 5”; italic quote; bold name; `treatmentName` subtitle; no Reservar; Tailwind only; static slides (not `role="option"`).
- [x] 3.3 Mount Reviews after Rituals, before Contact in `src/pages/index.astro`.
- [x] 3.4 Init helper `infinite: true` in Reviews; confirm no timer/marquee.

## Phase 4: Verification

- [x] 4.1 Run `npx astro check`.
- [x] 4.2 Manual: DOM order + `#testimonios`; TESTIMONIOS nav; locked intro; ≥8 cards; infinite loop both directions; massage finite ends; reduced-motion; no section booking CTA. (Confirmed in code/dist 2026-09-03: Reviews.astro `#testimonios`, HomePage mount, es.ts nav+locked copy+≥8 stars:5, infinite true/false, dist smoke.)
