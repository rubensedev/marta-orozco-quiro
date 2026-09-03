# Tasks: Adopt Glassmorphism

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~250–400 |
| 400-line budget risk | Medium |
| Chained PRs recommended | Yes |
| Suggested split | PR1 tokens+chrome → PR2 panels → PR3 modal+QA |
| Delivery strategy | ask-on-risk |
| Chain strategy | feature-branch-chain |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Tokens + ambient + chrome | PR1 | `npx astro check` | Visual: header, drawer, MobileBar | `global.css`, Layout, Header, MobileBar |
| 2 | Section panels + controls | PR2 | `npx astro check` | Visual: all sections light/dark | Pricing–Contact components |
| 3 | Modal + carousel polish + QA | PR3 | `npx astro build` | Full page ES+EN | BookingModal, carousel CSS |

## Phase 1: Foundation

- [x] 1.1 Add glass tokens to `@theme` in `global.css` (blur, surface, edge, shadow; light/dark)
- [x] 1.2 Add `@supports (backdrop-filter: blur(1px))` enhancement + opaque fallback
- [x] 1.3 Add subtle ambient gradient on `body` in `Layout.astro`

## Phase 2: Chrome & controls

- [x] 2.1 Update `Header.astro`: header bar, drawer, theme/lang menus (chrome/panel tiers)
- [x] 2.2 Align `MobileBar.astro` with chrome tokens
- [x] 2.3 Update `.btn-secondary`, `.theme-menu-btn` in `global.css` (control tier); keep `.btn-brand` solid
- [x] 2.4 Update carousel card/nav allow-list recipes for unified glass

## Phase 3: Section panels

- [x] 3.1 `PricingCard.astro` — panel tier utilities
- [x] 3.2 `About.astro` — panel tier
- [x] 3.3 `Contact.astro` — info card panel
- [x] 3.4 `Rituals.astro` — bono cards + examples panel
- [x] 3.5 `Massages.astro` + `.massage-main-panel__content` — panel tier

## Phase 4: Modal & verification

- [x] 4.1 `BookingModal.astro` — glass panel, inputs, close button
- [x] 4.2 Visual QA: light/dark, mobile/md/lg, scrolled header, drawer+modal open, ES+EN
- [x] 4.3 Run `npx astro check` and `npx astro build`
- [x] 4.4 Update `state.yaml` phases; write `verify-report.md`
