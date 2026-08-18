# Proposal: Adopt Astro Tailwind

**C (hybrid):** utilities in `.astro`; one `global.css` + `@theme`; leftover CSS allow-list; drop Sass. Not a redesign. Review before apply.

## Intent

Tailwind 4 is installed but unused; the page uses 1051-line BEM-ish `global.scss` plus a dead `global.css` import. Dual CSS and unused Sass block official Astro + Tailwind v4. Migrate styling; keep brand, content, JS, ARIA.

## Scope

### In Scope
- Utilities in `.astro` for layout/spacing/color/type.
- One `src/styles/global.css`: `@import "tailwindcss"`, `@theme` brand/fonts, class dark.
- Delete `global.scss`; drop `sass`.
- Leftover CSS/`@layer` allow-list (hard CSS + JS-injected widgets).
- Keep `html.dark` anti-flash; register `@custom-variant dark`.
- Restyle `PageScripts.astro` `innerHTML` to allow-listed classes.

### Out of Scope
- Redesign, copy, JS behavior, ARIA/`data-*`/ids.
- Approach B (`@apply` as the system).
- Config `styling_convention` during apply (archive only).
- Adding a test runner.

## Capabilities

### New Capabilities
- `astro-tailwind-styling`: utilities in templates; one CSS entry with `@theme` and class dark; leftover allow-list; no Sass.

### Modified Capabilities
- None

## Approach

**C.** Utilities for ~90% of markup. Named leftover CSS only for:
- Hard CSS: pseudos, `dialog::backdrop`, `:user-invalid`, keyframes, reduced-motion, logo/map filters, `font-size-adjust`, `[hidden]`
- Repeated / JS-injected widgets: `btn-brand`, pricing pills/price rows

`@apply` last resort. `@theme` tokens. `@custom-variant dark (&:where(.dark, .dark *));` then `dark:`. `pricing-card--reverse` → `lg:flex-row-reverse`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/styles/global.css` | Modified | Only stylesheet |
| `src/styles/global.scss` | Removed | Delete |
| `package.json` | Modified | Drop `sass` |
| `src/layouts/Layout.astro` | Modified | CSS-only import; keep anti-flash |
| `src/components/*.astro` | Modified | BEM → utilities; keep data/ids/ARIA |
| `src/pages/index.astro` | Modified | Drop unused `landing-page` |
| `src/components/PageScripts.astro` | Modified | Injected classes match allow-list |
| `astro.config.mjs` | Unchanged | Already `@tailwindcss/vite` |
| `openspec/config.yaml` | Modified | `styling_convention` at archive |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Visual regression | High | QA light/dark, breakpoints, modal, pricing, reduced-motion |
| `dark:` defaults to media | Med | Class `@custom-variant` first |
| JS HTML unstyled after SCSS delete | High | Allow-list `btn-brand` + pricing |
| Review over 400 lines | High | Slice: foundation → sections → JS |
| BEM/`@apply` creep | Med | Written allow-list |

## Rollback Plan

Revert `feat/adopt-astro-tailwind`. Restore dual CSS+SCSS+BEM (`global.scss`, `sass`, Layout dual imports, template BEM). Config stays BEM until archive.

## Dependencies

- Existing `@tailwindcss/vite`.
- Brand tokens from SCSS `:root` / `astro-migration-context.md`.
- User review before apply.

## Success Criteria

- [ ] Utilities in templates; named CSS only on allow-list.
- [ ] One CSS entry; `global.scss` and `sass` gone.
- [ ] Visual QA holds brand/layout (light/dark, mobile/`md`/`lg`, modal, pricing, theme menu, reduced-motion).
- [ ] `html.dark` anti-flash works with `dark:`.
- [ ] Config `styling_convention` updated only at archive.

## Proposal question round

Confirm defaults (in parentheses):

1. Hybrid C vs utilities-only A for JS-injected pricing HTML? **(recommend C)**
2. Pixel-match SCSS vs Tailwind rounding where equivalent? **(recommend brand/layout match; Tailwind spacing OK if rem values match)**
3. Drop Sass entirely? **(recommend yes)**

Until corrected: C; rem-aligned spacing; Sass dropped.
