# Exploration: adopt-astro-tailwind

**Recommend C** — utilities in `.astro` templates + `@theme` in one `global.css`, with a small leftover CSS/`@layer` set for widgets Tailwind cannot express cleanly (pseudos, `dialog::backdrop`, JS-injected pricing HTML). Drop Sass. Preserve visuals; do not redesign.

Ready for proposal: **Yes**. User should confirm C vs A before spec/design.

## Assumption verdicts

| # | Assumption | Verdict |
|---|------------|---------|
| 1 | Utility classes in `.astro` templates, not BEM-only + `@apply` | **Yes** (Astro + original site). Named leftover classes only where CSS is required or JS injects HTML. |
| 2 | Single CSS entry `global.css`; delete `global.scss`; drop `sass` | **Yes**. Leftover custom CSS stays in the same `.css` file. Sass unused today. |
| 3 | Preserve visual brand, content, JS, a11y | **Yes**. Styling-system migration, not a redesign. |
| 4 | Keep `html.dark` anti-flash; restyle with `dark:` | **Yes**. Must register class-based `dark` in CSS (v4 default is media). |
| 5 | `@apply` only when utilities cannot express a repeated widget cleanly | **Yes**. Prefer `@theme` + utilities; leftover CSS/`@layer` over `@apply`. |
| 6 | Update `openspec/config.yaml` `styling_convention` after acceptance | **Yes**, at archive — not during apply. |

## Exploration: adopt-astro-tailwind

### Current State

Landing page is Astro 7 + Tailwind 4 via `@tailwindcss/vite`, but templates do not use Tailwind.

- `Layout.astro` imports **both** `src/styles/global.css` and `src/styles/global.scss`.
- `global.css` is only `@import "tailwindcss";` — no `@theme`, no `@apply`.
- `global.scss` is **1051 lines** of flat handwritten CSS (BEM-ish). No Sass variables, mixins, or nesting. `sass` is a unused preprocessor.
- No `tailwind.config.*`. Brand tokens live in SCSS `:root` (`--brand-sage`, `--brand-lavender`, etc.) matching `astro-migration-context.md`.
- Templates use semantic/BEM classes (`site-header`, `btn-brand`, `pricing-card__body`). The **only** Tailwind utilities today are Font Awesome icon class strings in `PageScripts.astro` (`text-amber-500`, `dark:text-amber-300`).
- Dark mode: inline anti-flash script toggles `dark` on `<html>`; SCSS uses `.dark …` (20 selectors). Theme JS also toggles `dark` and adds `is-locked` on `<body>` while the booking dialog is open.
- `PageScripts.astro` injects BEM class names via `innerHTML` (pricing pills, price display, bono examples). Behavior is wired with `data-*` / ids, not class selectors — except `is-locked` and `dark`.
- Original site (`astro-migration-context.md`) used Tailwind utilities in HTML plus a small custom CSS file. Current `openspec/config.yaml` still says `styling_convention: BEM; no raw Tailwind utility classes in Astro templates` — this change reverses that.
- No test runner. Visual parity is the acceptance bar.

Hard leftover CSS (utilities cannot replace 1:1): `section-eyebrow::after`, hero overlay gradients, `dialog::backdrop`, `#bookingForm :user-invalid`, `@keyframes pricing-savings-in`, global `prefers-reduced-motion`, logo invert filter, map filter, `font-size-adjust: from-font`, `[hidden] { display: none !important }`. `pricing-card--reverse` (rtl trick) **can** become `lg:flex-row-reverse`.

### Affected Areas

- `src/styles/global.css` — become the only stylesheet: `@import "tailwindcss"`, class-based `dark` variant, `@theme` brand/fonts, leftover `@layer` CSS.
- `src/styles/global.scss` — delete.
- `package.json` — drop `sass` unless a leftover truly needs it (it does not).
- `src/layouts/Layout.astro` — stop importing SCSS; put `scroll-smooth` / body utilities on `html`/`body`; keep anti-flash `is:inline` script.
- `src/components/*.astro` (Header, Hero, About, Massages, PricingCard, Rituals, Contact, Footer, MobileBar, BookingModal) — replace BEM classes with utilities; keep `data-*`, ids, ARIA.
- `src/pages/index.astro` — `landing-page` is unused in CSS; likely drop.
- `src/components/PageScripts.astro` — JS-injected class strings must match the chosen approach; keep `html.dark`; replace or restyle `body.is-locked`.
- `astro.config.mjs` — already correct (`@tailwindcss/vite`); no Sass plugin to remove.
- `openspec/config.yaml` — after archive: drop SCSS from stack; set `styling_convention` to Astro+Tailwind utilities in templates.
- Review budget: **High 400-line risk**. Expect chained PRs in tasks (tokens/CSS foundation → header/hero → sections → modal/JS HTML).

### Approaches

1. **A — Utilities-in-templates + `@theme` (drop Sass)** — Official Astro/Tailwind v4. Brand tokens in `@theme` become `bg-brand-sage`. Templates and JS `innerHTML` use utility strings. Leftover CSS only for the hard list above.
   - Pros: Matches Astro docs and original site; no dual CSS; Tailwind features (`dark:`, `md:`/`lg:`, theme tokens) used where they belong.
   - Cons: Largest template + JS string rewrite; long class attributes; highest visual-regression surface; JS-generated HTML is easy to drift from templates.
   - Effort: High

2. **B — Keep BEM names, move SCSS → CSS, `@apply` / `@theme`** — Same class names in templates; restyle via `@apply` in `global.css`.
   - Pros: Smallest template/JS churn; `innerHTML` class names stay valid.
   - Cons: Contradicts the user request and Astro convention; still a 1050-line rewrite; Tailwind v4 is not designed around `@apply` as the styling system; does not “take advantage of Tailwind classes.”
   - Effort: Medium-High

3. **C — Hybrid (recommended)** — Utilities for layout/spacing/color/type in `.astro` files. Tiny named `@layer` components only for (a) hard leftover CSS and (b) truly repeated / JS-injected widgets (`btn-brand`, pricing pills/price rows). No Sass. `@apply` last resort.
   - Pros: Same convention as A for ~90% of markup; stable class names for JS HTML and CTAs; leftover CSS is honest instead of forced `@apply`; still one CSS entry.
   - Cons: Two styling vocabularies (utilities + a short component list); needs a written allow-list so BEM does not creep back.
   - Effort: High (slightly less regression than A)

### Recommendation

**C.** It is the only option that satisfies assumptions 1, 2, and 5 together: utilities in templates (Astro), one CSS file (drop Sass), and named CSS only where utilities/`@apply` are a poor fit.

Do not pick B. It preserves the current anti-Tailwind convention.

Pick A only if the user wants zero named component classes even for JS-injected pricing HTML. That is convention-purer and more brittle.

Implementation rules if C is accepted:

- `@theme` for brand colors + `font-sans` / `font-serif` (Noto Sans / Noto Serif).
- Class-based dark: `@custom-variant dark (&:where(.dark, .dark *));` then `dark:` in templates. Keep the existing anti-flash script.
- Delete `global.scss` and `sass`. Put leftovers in `global.css`.
- JS keeps `data-*` contracts. Restyle injected HTML with the small allow-listed classes (or shared utility strings if A is chosen).
- Visual QA (no tests): light + dark, mobile / `md` / `lg`, modal open, pricing pills, theme menu, reduced-motion.

### Risks

- **Visual regression is the main risk.** Rewriting ~1051 lines of SCSS with no snapshot/e2e tests. Gradients, `color-mix`, filters, and clamp type will not map 1:1 without pixel checks.
- **v4 `dark:` defaults to media.** Forgetting the class custom variant would ignore `html.dark` and break the theme menu.
- **JS `innerHTML` class coupling.** Pricing/bono markup is generated in `PageScripts.astro`; leftover BEM there would look unstyled after SCSS deletion.
- **Review size.** Far over the 400-line budget; tasks must slice (foundation CSS → static sections → JS-injected widgets).
- **`@apply` trap.** Using it to recreate BEM in CSS (approach B) fights Tailwind v4 and this change’s goal.

### Ready for Proposal

**Yes** — assumptions are good enough for user review. Orchestrator should ask the user to confirm **C (hybrid)** vs **A (utilities-only)**, then run `sdd-propose`. Do not implement until that review.
