# Proposal: Refactor Header

## Intent

In-flow `#mobileMenu` pushes `main`; CSS-bar hamburger wraps; theme (icon + “Tema”) stays in the bar. Overlay must not shift content; icon-only theme in the drawer below Reservar.

## Scope

### In Scope
- Hamburger `<lg`; inline nav `lg+`; FA hamburger as sole button child (no bar spans; no wrap).
- Icon-only theme; Claro / Oscuro / Dispositivo; drawer below Reservar (`<lg`).
- RTL overlay; backdrop, Escape, click-outside; `is-locked`; optional `inert` on main/footer/MobileBar; Tailwind utilities only.

### Out of Scope
- Swipe-to-dismiss / MWG popover+scroll-snap; `<dialog>` nav (booking owns `showModal()`).
- Redesign, copy, `navItems`, booking UI, allow-list growth, edits to `openspec/changes/adopt-astro-tailwind/`.

## Capabilities

### New Capabilities
- `site-header`: header chrome, overlay nav, icon-only theme (drawer vs header by breakpoint).

### Modified Capabilities
- None

## Approach

**A.** Fixed overlay + backdrop.

- `fixed` right panel `translate-x-full` → `translate-x-0`. Drop in-flow `#mobileMenu`. No `hidden` on panel (`[hidden]` leftover kills transform).
- Dim sibling; hamburger toggles class + `aria-expanded`; FA `fa-bars` sole child (`inline-flex size-12 shrink-0`); X while open.
- Two theme widgets (unique ids or `data-*` + `querySelectorAll`). Header `hidden lg:…`; drawer `<lg` below Reservar. Keep close-nav `data-*`. Drawer z above `z-40` / MobileBar `z-30`. Booking dialog stays top layer.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/Header.astro` | Modified | Overlay drawer; FA hamburger; dual theme |
| `src/components/PageScripts.astro` | Modified | Overlay + two theme widgets; keep `data-*` |
| `src/styles/global.css`, `Layout.astro`, `site.ts`, `MobileBar.astro`, `BookingModal.astro` | Unchanged | No leftover names; keep FA, `navItems`, stacking, close-nav-then-book |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Duplicate theme IDs | High | Unique ids or `data-*` |
| Drawer under header/bar | Med | z above `z-40` / `z-30` |
| `hidden` kills slide | High | Class/`translate`, not `hidden` |
| Theme list clipped | Med | No `overflow-hidden` on sheet |

## Rollback Plan

Revert `feat/refactor-header`.

## Dependencies

- FA 6.4 in `Layout.astro`; leftover `[hidden]` / `is-locked`; existing `data-*`.

## Success Criteria

- [ ] Overlay RTL over content; `main` unmoved; backdrop + Escape + click-outside; `is-locked`.
- [ ] FA hamburger sole child; no wrap; X while open.
- [ ] Theme icon-only; Claro/Oscuro/Dispositivo; drawer below Reservar `<lg`; header `lg+` only.
- [ ] Reservar from `md`; hamburger until `lg`; overlay `<lg`; utilities only.

## Proposal question round

Confirm defaults **(recommend yes)**: (1) backdrop dim; click-outside + Escape; (2) `lg+` inline nav + header theme, none below `lg`; (3) Reservar from `md`; hamburger until `lg`; overlay `<lg`; (4) hamburger → FA X while open; (5) `is-locked`; optional `inert`; (6) no swipe **(defer)**; (7) utilities only; no leftover drawer CSS. Until corrected: all seven.
