## Exploration: refactor-header

**Recommend A** — fixed right-edge overlay drawer + sibling backdrop, styled with Tailwind utilities; keep existing vanilla JS. Do not use the in-flow `#mobileMenu` (it expands the sticky header and shifts `main`). Skip the full MWG popover+scroll-snap drawer and skip `<dialog>` for nav (booking already owns `showModal()`).

Ready for proposal: **Yes**. Requirements are clear enough to spec.

### Current State

Sticky header (`z-40`) is desktop-biased, not overlay-nav.

- **Chrome:** logo; `nav` `hidden lg:block` from `navItems` (`Sobre mí`, `Masajes`, `Bonos`, `Contacto`); theme button **icon + “Tema”**; Reservar `hidden md:inline-flex`; hamburger `lg:hidden`.
- **Hamburger:** three CSS `<span>` bars in `flex-col`, not Font Awesome. Wrap risk is real.
- **Mobile menu:** `#mobileMenu` is **in-flow** under the bar (`hidden` attr + leftover `[hidden] { display: none !important }`). Opening grows the header and **pushes `main` down**. No backdrop, no `position: fixed`, no RTL slide.
- **Theme:** always in the header bar. Dropdown labels already **Claro / Oscuro / Dispositivo**. JS: `hidden` + `aria-expanded`; outside click + Escape. `updateThemeMenu` writes a **single** `#themeMenuIcon`. Not in the side menu.
- **JS contracts** (`PageScripts.astro`): `#themeMenuBtn`, `#themeMenu`, `#themeMenuIcon`, `#mobileMenuBtn`, `#mobileMenu`; `[data-theme-option]`, `[data-close-mobile-nav]`, `[data-open-booking-close-nav]`. Escape closes both menus. Booking uses `<dialog>.showModal()` + `body.is-locked`.
- **Stack:** Font Awesome 6.4 CDN in `Layout.astro`. Dark: `html.dark` + `@custom-variant`. Leftover allow-list in `global.css` (`btn-brand`, `site-logo`, `[hidden]`, `is-locked`, `dialog::backdrop`). Do **not** grow it for drawer layout. `MobileBar` is `fixed z-30` — drawer must sit above it. No tests.

MWG: `navigation-drawer` prefers `popover="manual"` + swipe/scroll-snap; **documented fallback** is `position: fixed` + high `z-index` + sibling backdrop. HTML guide: `<dialog>` for modal interruptions; `popover` for non-modal menus. Theme list: keep `role="menuitemradio"` (already used); do not add `role="menu"` unless arrow-key contract is implemented.

### Affected Areas

- `src/components/Header.astro` — hamburger, theme placement, replace in-flow `#mobileMenu` with overlay drawer markup.
- `src/components/PageScripts.astro` — open/close overlay (class/`aria`, backdrop, Escape); bind **two** theme widgets without duplicate IDs; keep booking `data-*`.
- `src/styles/global.css` — only if animation cannot be utilities; default: **do not** add leftover names.
- `src/layouts/Layout.astro` — FA already loaded; no change expected.
- `src/data/site.ts` — `navItems` reused; no data change expected.
- `src/components/MobileBar.astro` — z-index under drawer; not restyled unless overlap QA fails.
- `src/components/BookingModal.astro` — native top layer stays above drawer; close-nav-then-book must remain.

### Approaches

1. **A — Fixed overlay drawer + backdrop (Tailwind + current JS)** — Panel `fixed inset-y-0 right-0 translate-x-full` / open `translate-x-0`; full-viewport dim sibling; hamburger toggles class + `aria-expanded`. Theme: header copy `hidden lg:…`; drawer copy `<lg`, **below Reservar**. Icon-only trigger (`aria-label`); FA `fa-solid fa-bars` as **only** button child (`inline-flex size-12 shrink-0`, no `flex-col`/spans).
   - Pros: Overlays without shifting content; mobile-first; matches stack and `data-*`; no new API/polyfill; MWG fallback; allow-list stays closed.
   - Cons: Manual focus/`inert`/scroll lock vs native dialog; no native swipe; two theme widgets need JS (no duplicate IDs).
   - Effort: Low–Medium

2. **B — `popover="manual"` drawer (MWG navigation-drawer)** — Top-layer + `::backdrop`. Full guide adds scroll-snap swipe, scroll-driven fade, `IntersectionObserver`. Lite: `showPopover()`/`hidePopover()` only.
   - Pros: Top layer beats `z-40`/`z-30`; native `::backdrop`; closest to MWG “preferred”.
   - Cons: Popover Newly Available; full recipe is leftover-CSS heavy and fights `[hidden]`/utilities; nested theme dropdown inside popover is fiddly; booking `dialog` is a second overlay primitive.
   - Effort: Medium (lite) / High (full)

3. **C — `<dialog>` off-canvas sheet** — `showModal()` as right sheet; native focus trap, Esc, `::backdrop`.
   - Pros: Strong a11y; overlay without layout shift; site already uses dialog.
   - Cons: MWG dialog = modal interruption, not app chrome; stacking with booking; `showModal()` + `popover` are exclusive; leftover `::backdrop` already booking-specific.
   - Effort: Medium

### Recommendation

**A.** It is the only option that meets all six requirements **and** the styling rules without a new framework or allow-list growth.

- Overlay + no content shift: `fixed` panel (out of flow). Do not keep in-flow `#mobileMenu`.
- Mobile-first: hamburger + drawer `<lg`; inline nav `lg+`; theme in drawer on small, icon-only in header on `lg+`.
- Hamburger: `<i class="fa-solid fa-bars" aria-hidden="true">` direct child; prevent wrap via fixed square + `shrink-0` (FA is already in Layout).
- Theme: drop “Tema” text; keep Claro/Oscuro/Dispositivo; place control **below Reservar** in the drawer.
- JS: extend `toggleMobileMenu` to panel + backdrop (class, not `hidden` on the sliding panel — leftover `[hidden] { display: none !important }` kills transform animation). `querySelectorAll` for theme buttons/icons. Keep `[data-close-mobile-nav]` and `[data-open-booking-close-nav]`. Optional: `inert` on `main`/footer/MobileBar; `is-locked` while open.
- Do **not** take B-full (swipe/scroll-snap) unless product later asks for gesture dismiss. Do **not** take C: booking owns `<dialog>`.

Breakpoint note (keep unless spec says otherwise): Reservar appears at `md`, hamburger until `lg` — both visible `md–lg`. Overlay still `<lg`.

### Risks

- Duplicate `#themeMenuBtn` / `#themeMenuIcon` if markup is copied without unique ids or shared `data-*` + `querySelectorAll`.
- Drawer `z-*` below header (`z-40`) or under MobileBar (`z-30`) looks “not over content”.
- Using `hidden` on the sliding panel blocks slide-in because of leftover `[hidden] { display: none !important }`.
- Opening booking from the drawer without closing it first (contract already exists — keep it).
- Nested theme dropdown clipped by `overflow-hidden` on the sheet.
- `adopt-astro-tailwind` is verify-pending — this change must not edit that folder.

### Ready for Proposal

Yes. Orchestrator can proceed to `sdd-propose`. Spec should lock: overlay (not in-flow); FA hamburger as sole button child; icon-only theme; mobile theme **inside** drawer below Reservar; `lg+` inline nav + header theme; Tailwind-only drawer (no new leftover names); Approach A (fixed + backdrop), not dialog/popover-full.
