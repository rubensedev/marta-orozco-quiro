# Tasks: Refactor Header

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 180–280 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Decision needed before apply | No |
| Chained PRs recommended | No |
| 400-line budget risk | Low |

## Phase 1 — Overlay chrome

- [x] 1.1 Replace in-flow `#mobileMenu` with sibling fixed backdrop + right drawer (outside header `backdrop-blur` containing block)
- [x] 1.2 FA hamburger as sole child (`size-12 shrink-0`); swap to `fa-xmark` while open
- [x] 1.3 Icon-only header theme (`hidden lg:block`); drawer theme below Reservar; Claro/Oscuro/Dispositivo
- [x] 1.4 Wire overlay JS: `data-open` (no `hidden` on panel), backdrop/Escape/click-outside, `is-locked`, `inert`, `lg` close, dual theme `querySelectorAll`

## Phase 2 — QA

- [x] 2.1 Manual: overlay vs shift; FA/X; theme dual; backdrop/Esc; lock; booking on top; `md–lg` Reservar+hamburger (Confirmed 2026-09-03: Header fixed backdrop+drawer `data-open`, fa-bars/fa-xmark, theme options Claro/Oscuro/Dispositivo desktop+drawer, PageScripts is-locked/Escape/inert, dist smoke.)
