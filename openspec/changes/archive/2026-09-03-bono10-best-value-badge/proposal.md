# Proposal: Bono 10 Best-Value Badge

## Why

Visitors comparing Bono 5 vs Bono 10 need a clear choice hierarchy without a second promo graphic. The existing lavender `15%` discount circle remains the conversion hero; a soft pill marks Bono 10 as the best-value pack.

## What Changes

- Soft glass “best value” pill on **only** the `bono10` package tile, sibling before the sessions `h4`, outside `.bono-discount`.
- Locked i18n copy: ES `Máximo ahorro` / EN `Best value` via `bonos.bestValueLabel`.
- Accessible naming: visible badge text + discount `aria-label` includes `bestValueLabel`.
- No sale-sticker chrome; no new badge-dedicated looping motion beyond existing section reveal / discount waves.

## Scope

### In Scope

- `src/data/site/es.ts` + `en.ts` `bonos.bestValueLabel`
- Conditional `.bono-featured-badge` in `Rituals.astro` when `tier.id === "bono10"`
- Soft tinted glass pill styles (light/dark)

### Out of Scope

- Badges on `bono5`, `single`, or other tiers
- Ribbon/seal redesign of the discount circle
- CMS-driven popularity metrics
- New looping badge animation as a product requirement

## Capabilities

### New Capabilities

- `bonos-best-value-badge`: exclusive Bono 10 pill, placement, i18n contract, a11y naming, static chrome

### Modified Capabilities

- None

## Non-goals

Hardcoding `sessions === 10`; solid `.pricing-savings-highlight` sticker treatment; “Most popular” copy.
