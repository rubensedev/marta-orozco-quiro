# Tasks: Bono 10 Best-Value Badge

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~40–80 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | i18n + badge UI + a11y | PR 1 | `npx astro check` | Manual: ES/EN Bonos grid, light/dark, mobile/desktop, reduced-motion | Revert `es.ts`, `en.ts`, `Rituals.astro` |

## Phase 1: i18n Foundation

- [x] 1.1 Add `bestValueLabel: "Máximo ahorro"` to `bonos` in `src/data/site/es.ts` (Req: Locked i18n — ES)
- [x] 1.2 Add `bestValueLabel: "Best value"` to `bonos` in `src/data/site/en.ts` (Req: Locked i18n — EN)

## Phase 2: Markup & Accessible Naming

- [x] 2.1 In `src/components/Rituals.astro` package map: when `tier.id === "bono10"`, render `.bono-featured-badge` sibling **before** sessions `h4`, outside `.bono-discount` (Req: Exclusive badge; Placement)
- [x] 2.2 Badge text = `{bonosContent.bestValueLabel}` visible (not color-only) (Req: Accessible naming — visible text)
- [x] 2.3 Extend Bono 10 discount `aria-label` to include `bonosContent.bestValueLabel` plus existing tier/discount context (Req: Accessible naming — aria)

## Phase 3: Soft Glass Pill Chrome

- [x] 3.1 Add scoped `.bono-featured-badge` next to `.bono-discount*` in `Rituals.astro`: `rounded-full`, `px-3 py-1`, ~0.65–0.7rem semibold uppercase `tracking-[0.14em]`, centered, `mb` ~0.5rem (Req: Soft glass pill; design tokens)
- [x] 3.2 Light: lavender-dark text; `color-mix` lavender ~12%/white bg; soft lavender border — **not** `.pricing-savings-highlight` solid+shadow (Req: Soft glass pill)
- [x] 3.3 Dark: lavender-bright text; lavender ~22%/transparent bg; soft edge; WCAG AA small-text contrast (Req: Soft glass pill — dark)
- [x] 3.4 Document flow only (no absolute over core); no new loop/hover-bounce; waves/hover/`prefers-reduced-motion` unchanged (Req: Placement waves; No new badge motion)

## Phase 4: Verification

- [x] 4.1 `npx astro check` passes (types pick up `bestValueLabel`)
- [x] 4.2 Manual ES: badge only on Bono 10, text `Máximo ahorro`, none on Bono 5 (Scenarios: Badge on Bono 10; No badge on Bono 5; Spanish label)
- [x] 4.3 Manual EN: badge text `Best value` (Scenario: English label)
- [x] 4.4 Manual: DOM order badge → `h4` → `.bono-discount`; waves clear at desktop/mobile; light/dark glass pill; idle badge has no dedicated animation; discount focus ring intact (Scenarios: Sibling; Waves clear; Glass pill; Static badge; aria includes label)
