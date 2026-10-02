# gift-card-flip-interaction

## Objective
Replace the gift-section SVG placeholder with real front/back card images and a professional 3D flip (hover + tap).

## Problem
Gift section still showed a decorative SVG after real `gift-card-front.webp` / `gift-card-back.webp` assets were added.

## Why
User wants rounded card imagery with elevate + smooth flip to the back on hover and tap.

## Scope
- `GiftSection.astro` flip UI + motion
- ES/EN alt + toggle label strings
- Reduced-motion fallback
- Out of scope: GiftModal, WhatsApp flow, new assets

## Constraints
- Match existing glass/lavender visual language
- Hover on fine pointers; tap toggles flip on all devices
- Prefer `nub` for scripts
- Delivery: ask-on-risk; no push/PR unless asked

## Authorized edit surfaces
- `src/components/GiftSection.astro`
- `src/data/site/es.ts`
- `src/data/site/en.ts`
- `odd/tasks/gift-card-flip-interaction.md`

## Acceptance criteria
- Front shown by default; rounded corners
- Hover (fine pointer) elevates and flips to back smoothly
- Tap/click toggles flip; `aria-pressed` updates
- Click/tap also opens GiftModal via shared `data-open-gift`
- Prefer `prefers-reduced-motion`: instant face swap, no 3D spin
- ES/EN a11y strings present
- `nub run check` (or project check) passes

## Checks
- Structural readback of GiftSection + i18n keys
- `nub run check` / fallback `npm run check`

## Forecast
~120 authored changed lines · delivery: ask-on-risk

## Route
Delegated/direct inline mixed — primarily `GiftSection.astro` (non-trivial) + mechanical i18n

## Tasks
- [x] T1 Add ES/EN `cardFrontAlt` + `cardToggleLabel`
- [x] T2 Replace SVG with Astro Image front/back 3D flip (hover + tap)
- [x] T3 Verify reduced-motion + a11y wiring; run check
- [x] T4 Work-unit commit on feature branch — `8e6bd35`
- [x] T5 Card click opens GiftModal (`data-open-gift`) + work-unit commit — `25d614c`

## Progress
- Recovered under ODD after classification miss.
- T3: `nub run check` → 0 errors (pre-existing hints only).
- T4: committed on `feat-fixes-and-improvements` as `8e6bd35`.
- T5: card click opens modal via `data-open-gift`; commit `25d614c`.

## Next step
(none — await user review / push)
