# Tasks: Adopt Astro Tailwind

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 1200–1800 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR1 foundation → PR2 chrome → PR3 sections → PR4 modal/JS/Sass → PR5 QA |
| Delivery strategy | exception-ok |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: size-exception
400-line budget risk: High

Maintainer accepted size:exception — implement all work units in one PR on `feat/adopt-astro-tailwind`.

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | `@theme` + class dark + leftover CSS; keep SCSS import | PR 1 | `npm run build` | `npm run dev`: tokens + `html.dark` | `src/styles/global.css`; Layout dual-import |
| 2 | Layout/Header/Hero utilities | PR 2 | `npm run build` | `npm run dev`: header/hero, menus, light/dark | `Layout.astro`, `index.astro`, `Header.astro`, `Hero.astro` |
| 3 | Content section utilities | PR 3 | `npm run build` | `npm run dev`: sections + mobile bar, mobile/`md`/`lg` | listed section components |
| 4 | Modal + JS HTML; drop SCSS/`sass` | PR 4 | `npm run build` | `npm run dev`: modal, pricing pills, JS HTML | BookingModal, PageScripts, Layout CSS-only, `global.scss`, `package.json` |
| 5 | Visual QA + README | PR 5 | `npm run build` | `npm run dev` checklist in 5.1 | README note |

No test runner. Strict TDD false. Threat matrix N/A — no RED tests.

## Phase 1: Foundation

- [x] 1.1 Rewrite `src/styles/global.css`: `@import "tailwindcss"` → `@custom-variant dark (&:where(.dark, .dark *));` → `@theme` `--color-brand-*`, `--font-sans`, `--font-serif`, `--shadow-soft`.
- [x] 1.2 Add leftover `@layer` in `src/styles/global.css` only (eyebrow, overlay, logo/map, backdrop, `:user-invalid`, reduced-motion, buttons, pricing/bonos); leftover uses `var(--color-brand-*)`.
- [x] 1.3 Keep `src/layouts/Layout.astro` dual-import of `global.css` + `global.scss`; leave `sass` in `package.json`; do not edit `astro.config.mjs`. Verify: `npm run build`.

## Phase 2: Layout / Header / Hero

- [x] 2.1 `src/layouts/Layout.astro`: html/body utilities; keep anti-flash + CDNs; still import SCSS.
- [x] 2.2 `src/pages/index.astro`: drop `landing-page`.
- [x] 2.3 `src/components/Header.astro`: utilities; keep ids/ARIA/`data-*`.
- [x] 2.4 `src/components/Hero.astro`: utilities; keep `hero__overlay` + `btn-brand`/`btn-secondary`. Verify: `npm run build`.

## Phase 3: Content sections

- [x] 3.1 `src/components/About.astro`: utilities; keep `section-eyebrow`.
- [x] 3.2 `src/components/Massages.astro`: utilities.
- [x] 3.3 `src/components/PricingCard.astro`: utilities; keep `data-pricing-*`; `lg:flex-row-reverse`.
- [x] 3.4 `src/components/Rituals.astro`: utilities; keep `#bonoExamples`.
- [x] 3.5 `src/components/Contact.astro`: utilities; keep `contact__map` + brand buttons.
- [x] 3.6 `src/components/Footer.astro`: utilities; keep `site-logo`.
- [x] 3.7 `src/components/MobileBar.astro`: utilities; keep `data-open-booking`. Verify: `npm run build`.

## Phase 4: Modal, JS, drop Sass

- [x] 4.1 `src/components/BookingModal.astro`: utilities; keep ids/ARIA/`booking-modal`/`booking-field-group`.
- [x] 4.2 `src/components/PageScripts.astro`: innerHTML allow-list only; keep `html.dark` + `is-locked`; keep FA `text-amber-500`/`dark:text-amber-300`.
- [x] 4.3 `src/layouts/Layout.astro`: import `global.css` only.
- [x] 4.4 Delete `src/styles/global.scss`; remove `sass` from `package.json`. Do not edit `openspec/config.yaml`. Verify: `npm run build`.

## Phase 5: Visual QA + docs

- [x] 5.1 `npm run dev`: light/dark/system; anti-flash; media-dark without `html.dark` stays light; mobile/`md`/`lg`; menus; mobile bar; modal backdrop/`user-invalid`/hidden ritual fields; pricing pills/savings/reverse; logo+map filters; reduced-motion; JS pricing styled.
- [x] 5.2 Copy/`data-*`/ids/ARIA unchanged; off-list BEM unused; allow-list did not grow for layout.
- [x] 5.3 README: one-line note — Tailwind utilities + `src/styles/global.css`; Sass gone.
