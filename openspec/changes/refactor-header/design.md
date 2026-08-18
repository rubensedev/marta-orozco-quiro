# Design: Refactor Header

## Technical Approach

Approach A from the proposal: replace in-flow `#mobileMenu` (`hidden` + leftover `[hidden] { display: none !important }`, which grows the sticky header and pushes `main`) with a `fixed` right drawer + sibling backdrop emitted from `Header.astro` **after** `</header>`. Overlay cannot live inside `<header>` because `backdrop-blur` creates a containing block for `position: fixed`. Vanilla JS in `PageScripts.astro` stays. Spec: `openspec/changes/refactor-header/specs/site-header/spec.md`.

Stacking: header `sticky z-50` (hamburger stays clickable); backdrop `fixed z-40`; panel `fixed z-[45]` (above MobileBar `z-30`, below header). `<dialog id="bookingModal">.showModal()` stays native top layer.

## Architecture Decisions

| Decision | Option | Tradeoff | Choice |
|----------|--------|----------|--------|
| Overlay primitive | A fixed+backdrop vs B popover vs C `<dialog>` | B/C fight leftover CSS and booking `showModal()` | **A** (locked) |
| Closed panel | `hidden` / Tailwind `hidden` vs `translate-x-full` | `[hidden]` and `display:none` kill transform | **`translate-x-full` → open `translate-x-0`**; never `hidden` on the sheet |
| Overlay DOM | Portal in `index.astro` vs inside `<header>` vs sibling of `<header>` | `backdrop-blur` traps `fixed` inside header | **Sibling of `<header>` in `Header.astro`**; header `z-50`, backdrop `z-40`, panel `z-[45]` |
| Open signal | Body class vs `#mobileMenu` classes | Body already uses `is-locked` for booking | **Toggle utilities on panel + backdrop**; `is-locked` shared via helper (`navOpen \|\| dialog.open`) |
| Hamburger | CSS spans vs FA | Spans wrap | **`fa-bars` sole child**; `inline-flex size-12 shrink-0`; swap **`fa-xmark`** + `aria-label` Cerrar/Abrir |
| Theme widgets | Duplicate IDs vs `data-*` | IDs collide; `getElementById` is single-node | **`data-theme-menu-btn|menu|icon` + `querySelectorAll`**; unique ids only for `aria-controls` (header keep/rename; drawer `*Drawer`) |
| Theme placement | One widget vs two | Header copy always visible today | Header wrapper **`hidden lg:flex`**; drawer copy **below Reservar**, visible `<lg` (drawer root `lg:hidden`) |
| Scroll / a11y | Dialog trap vs manual | Booking owns dialog | **`is-locked` while open**; **`inert` on `main`, `footer`, `aside.fixed`** (no file edits); closed panel `inert` + `aria-hidden` |
| Resize | Leave open vs close at `lg` | Open drawer would persist off-canvas | **`matchMedia(min-width: 64rem)` closes nav** |
| Theme list clip | `overflow-hidden` sheet | Clips dropdown | **No `overflow-hidden` on sheet**; theme `hidden` attr OK (not the panel) |

Rejected: swipe/popover-full, leftover drawer CSS, allow-list growth, edits to `Layout.astro` / `global.css` / `site.ts` / `MobileBar.astro` / `BookingModal.astro` / `adopt-astro-tailwind`.

## Data Flow

```
Hamburger ──► toggleMobileMenu(open)
                ├─ panel: translate-x-full ↔ translate-x-0
                ├─ backdrop: opacity-0/pointer-events-none ↔ dim
                ├─ body.is-locked iff navOpen || dialog.open
                ├─ inert main/footer/aside.fixed; panel inert when closed
                └─ FA bars ↔ xmark; aria-expanded

Backdrop click / Escape / [data-close-mobile-nav] ──► toggleMobileMenu(false)

[data-open-booking-close-nav] ──► close nav ──► openBookingModal()  (top layer)

lg+ matchMedia ──► force close nav
```

Theme: each `[data-theme-menu-btn]` toggles its paired `[data-theme-menu]` (`hidden` attr, existing pattern). Opening one closes the other. `updateThemeMenu` writes **all** `[data-theme-menu-icon]` + `[data-theme-option]` `aria-checked`. Outside click / Escape close theme menus (keep current document listeners; query all widgets).

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/Header.astro` | Modify | FA hamburger; header theme `hidden lg:flex` icon-only; drop in-flow menu; add `fixed` backdrop + `#mobileMenu` drawer (`lg:hidden`); drawer nav + Reservar + theme below |
| `src/components/PageScripts.astro` | Modify | Class-based nav + backdrop; dual theme `querySelectorAll`; lock helper; inert; icon swap; `lg` close; keep `data-close-mobile-nav` / `data-open-booking-close-nav` |
| `src/styles/global.css` | Unchanged | Keep `[hidden]` / `is-locked` / `dialog::backdrop`; no new names |
| `src/layouts/Layout.astro` | Unchanged | FA 6.4 already loaded |
| `src/data/site.ts` | Unchanged | Reuse `navItems` |
| `src/components/MobileBar.astro` | Unchanged | Stays `z-30` under header context |
| `src/components/BookingModal.astro` | Unchanged | Top layer; close-nav-then-book |

## Interfaces / Contracts

Keep: `#mobileMenuBtn`, `#mobileMenu`, `[data-close-mobile-nav]`, `[data-open-booking-close-nav]`, `[data-theme-option]`, `[data-open-booking]`.

Add: `[data-mobile-nav-backdrop]`; `[data-theme-menu-btn]`, `[data-theme-menu]`, `[data-theme-menu-icon]` on **both** widgets; unique drawer ids (`themeMenuBtnDrawer`, `themeMenuDrawer`, `themeMenuIconDrawer`). Header ids may remain if unique.

Open class pair (utilities only):

```
#mobileMenu: fixed inset-y-0 right-0 z-[45] w-[min(20rem,90vw)] translate-x-full transition-transform
open: translate-x-0 (data-open)
backdrop: fixed inset-0 z-40 bg-black/40 opacity-0 pointer-events-none
open: opacity-100 pointer-events-auto (data-open)
header: sticky z-50
```

`prefers-reduced-motion` already zeroed in `global.css`.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit / Integration / E2E | N/A | `strict_tdd: false`; no runner |
| Manual | Overlay vs shift; FA/X; theme dual; backdrop/Esc; lock; booking on top; `md–lg` Reservar+hamburger | Viewport checklist in tasks |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary (UI chrome only).

## Migration / Rollout

No migration required. Rollback: revert `feat/refactor-header`.

## Open Questions

- [ ] None.
