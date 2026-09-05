# Apply Progress: crawlable-locale-switcher

**Mode**: Standard (strict_tdd: false)
**Work unit**: Unit 1 — Crawlable locale `<a>` + `<details>` disclosure; PE hash/storage
**applyState at start**: ready
**Chain strategy**: pending (single PR; Low budget risk; Decision needed before apply: No)
**Delivery**: single-pr

## Completed Tasks

- [x] 1.1 Desktop lang widget → `<details data-lang-widget>` + `<summary>` (icon + ES/EN + chevron)
- [x] 1.2 Options → `<a href={esHrefBase|enHrefBase} role="menuitem" data-lang-option>` + `aria-current="page"`; dropped `data-lang-href` / `aria-checked`
- [x] 1.3 Drawer lang widget mirrored (`langMenuDrawer`)
- [x] 1.4 Check icon → `group-aria-current`; active row via Tailwind `aria-current:` variants
- [x] 2.1 Script toggles `details.open`; Escape/outside-click; `window.__closeAllLangMenus` retained
- [x] 2.2 Option click PE: preventDefault → localStorage → mapHash → location.assign(pathname+hash)
- [x] 2.3 No Layout.astro or theme-widget edits (git confirms Header-only)
- [x] 3.1 `npx astro check` — 0 errors
- [x] 3.2 `npm run build` — dist ES+EN: 4× `<a data-lang-option>` with `href="/"` and `href="/en/"`; 0 lang-option buttons; no `data-lang-href`
- [x] 3.3 No-JS: static crawlable anchors verified; interactive disable-JS browser residual
- [x] 3.4 With-JS: script PE present; interactive drawer/Escape/focus residual
- [x] 3.5 Layout hreflang es/en/x-default match `/` and `/en/` (source + dist)

## Files Changed

| File | Action | What Was Done |
|------|--------|---------------|
| `src/components/Header.astro` | Modified | Locale widgets → details/summary + crawlable anchors; PE script; aria-current styling |

## Work Unit Evidence

| Evidence | Result |
|---|---|
| Focused test command | `npx astro check` → exit 0 (0 errors). `npm run build` + node assert on `dist/index.html` + `dist/en/index.html`: esOk/enOk true, 0 lang-option buttons, no `data-lang-href` |
| Runtime harness | N/A for automated e2e (none configured). Static dist + Layout hreflang verified. Interactive no-JS / drawer / focus residual for human |
| Rollback boundary | Revert `src/components/Header.astro` only |

## Deviations from Design

None — implementation matches design locks (`<a>`, getRelativeLocaleUrl, details/summary, aria-current, menu+menuitem, drop data-lang-href, PE hash/storage, Layout verify-only, theme buttons unchanged).

Active-row background: Tailwind `aria-current:` utilities on lang options (Header-only; did not edit `global.css` `[aria-checked]` rules used by theme).

## Issues Found

None blocking. Residual human checks: disable JS and click non-current locale; drawer Escape/outside/focus with JS.

## Remaining Tasks

- (none)

## Workload / PR Boundary

- Mode: single PR
- Current work unit: Unit 1 (complete)
- Boundary: Header.astro crawlable locale switcher end-to-end
- Estimated review budget impact: ~112 lines changed in Header.astro (55+/57−) — under 400

## Status

12/12 tasks complete. Ready for verify.
