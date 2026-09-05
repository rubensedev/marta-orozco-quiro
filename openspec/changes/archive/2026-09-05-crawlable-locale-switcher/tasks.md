# Tasks: Crawlable Locale Switcher

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~40–100 (Header.astro only) |
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
| 1 | Crawlable locale `<a>` + `<details>` disclosure; PE hash/storage | PR 1 | `npm run build` then assert `href="/"` + `href="/en/"` on lang options in `dist/index.html` + `dist/en/index.html` | Manual: disable JS → open details → follow non-current locale; drawer Escape/outside; compare Layout hreflang to anchors | Revert `src/components/Header.astro` |

## Phase 1: Locale markup (desktop + drawer)

- [x] 1.1 In `src/components/Header.astro` desktop lang widget: replace outer button/menu with `<details data-lang-widget>` + `<summary>` (icon + ES/EN + chevron); keep visual classes
- [x] 1.2 Same widget: replace option `<button role="menuitemradio">` with `<a href={esHrefBase|enHrefBase} role="menuitem" data-lang-option>` + `aria-current="page"` on active; drop `data-lang-href` / `aria-checked`; keep both ES and EN links
- [x] 1.3 Mirror 1.1–1.2 for drawer lang widget (`langMenuDrawer`); preserve drawer placement beside theme
- [x] 1.4 Migrate check-icon style from `group-aria-checked` to `aria-current` / Tailwind `aria-current` variant on option rows

## Phase 2: Script progressive enhancement

- [x] 2.1 Adapt lang script in `src/components/Header.astro`: open/close/`Escape`/outside-click toggle `details.open`; keep `window.__closeAllLangMenus` for PageScripts (read-only consumers)
- [x] 2.2 On `[data-lang-option]` click: `preventDefault` → `localStorage.setItem(LOCALE_KEY)` → `mapHash` → `location.assign(href pathname + hash)`; without JS, bare `href` still navigates
- [x] 2.3 Confirm no edits to `src/layouts/Layout.astro` (read-only) or theme-widget buttons

## Phase 3: Build smoke and acceptance checks

- [x] 3.1 `npx astro check` passes after Header changes
- [x] 3.2 `npm run build`; assert dist HTML lang options are `<a>` with `href="/"` and `href="/en/"` (not buttons / not `data-lang-href`)
- [x] 3.3 Manual no-JS: open locale `<details>`, activate non-current locale → navigates ES↔EN (AC: works without JS) — **static verified**: dist has crawlable `<a href="/">` / `<a href="/en/">` inside `<details>`; interactive no-JS browser pass still needs human eyes
- [x] 3.4 Manual with JS: hash remap ES↔EN + preference stored; drawer lang open/close, Escape, outside-click, focus usable — **static verified**: PE click handler + `details.open` / Escape / outside-click / `__closeAllLangMenus` present; interactive browser pass still needs human eyes
- [x] 3.5 Verify `src/layouts/Layout.astro` (read-only) hreflang `es`/`en`/`x-default` still match `/` and `/en/` targets used by Header anchors — **verified** in Layout source + dist (`hreflang` tags present; Header anchors use same paths)
