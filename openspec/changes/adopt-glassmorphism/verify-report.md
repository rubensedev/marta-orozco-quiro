# Verify Report: Adopt Glassmorphism

**Date:** 2026-08-23  
**Change:** adopt-glassmorphism  
**Branch:** feat/adopt-glassmorphism

## Build & check

| Command | Result | Notes |
|---------|--------|-------|
| `npx astro build` | PASS | ES + EN static pages built |
| `npx astro check` | FAIL (pre-existing) | 3 TS errors in `src/data/site/index.ts` (locale typing); unrelated to glass change |

## Spec coverage

| Requirement | Status |
|-------------|--------|
| Glass theme tokens in `@theme` | Done |
| Three tiers (chrome / panel / control) | Done |
| Primary CTA solid sage | Done |
| Ambient body gradient | Done |
| `@supports` fallback on widgets | Done |
| Light + dark token pairs | Done |

## Surfaces updated

- Header (scrolled chrome), mobile drawer, theme/lang menus
- MobileBar
- PricingCard, About, Contact, Rituals, massage main panel
- Carousel cards + nav (allow-list)
- Booking modal panel, inputs, close btn, price card
- `btn-secondary`, pricing pills, theme/lang menu buttons

## Manual QA checklist

- [ ] Light mode — all sections; glass reads over ambient gradient
- [ ] Dark mode — panels and chrome legible
- [ ] Header transparent at top → frosted on scroll
- [ ] Mobile drawer + backdrop over content
- [ ] Booking modal open; form inputs readable
- [ ] ES (`/`) and EN (`/en/`) pages
- [ ] Primary Reservar buttons remain solid sage
- [ ] `prefers-reduced-motion` — no new motion added

## Issues

- None introduced by this change.
- Pre-existing: `astro check` locale typing in `site/index.ts`.

## Verdict

**Apply complete.** Ready for human visual QA, then archive after merge.
