# Proposal: Crawlable Locale Switcher

## Intent

Locale controls in `Header.astro` are `<button>` + `data-lang-href` with JS `location.assign`. Crawlers and no-JS users lack normal links between `/` and `/en/` (GitHub #9).

## Scope

### In Scope
- Replace locale option controls with real `<a href>` using existing `getRelativeLocaleUrl` targets
- Keep desktop + drawer chrome (icon + ES/EN + chevron disclosure)
- Preserve active styling, drawer coexistence, keyboard a11y
- Keep hash remap + `localStorage` as progressive enhancement
- Confirm Layout `hreflang` / canonical still match link targets

### Out of Scope
- Additional locales
- Full header IA rewrite
- Changing Astro i18n routing or boot auto-redirect
- Theme-menu control pattern (stays buttons)

## Approach

Make locale destinations first-class anchors. Disclosure may stay interactive for open/close, but navigation MUST work from `href` without JS. Align with `site-header` language switcher + `site-i18n` routing/hreflang.

## Capabilities

| Capability | Kind |
|------------|------|
| `site-header` | MODIFIED |
| `site-i18n` | unchanged (verify hreflang alignment only) |

## Rollback

Revert `Header.astro` (and any tiny related script hooks) to button + `data-lang-href` navigation.

## Open Questions

- (none) — disclosure locked in design as `<details>`/`<summary>`
