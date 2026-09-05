# Site-Header Specification

## Purpose

Mobile-first header chrome, overlay nav, hamburger, icon-only theme, and locale language switcher.

## Requirements

### Requirement: Viewport chrome

The header MUST be mobile-first. Chrome MUST follow this matrix:

| Viewport | Hamburger | Inline nav | Overlay | Header Reservar | Theme |
| below medium | visible | hidden | available | hidden | in drawer, below Reservar |
| medium to below large | visible | hidden | available | visible | in drawer, below Reservar |
| large and above | hidden | visible | closed/hidden | visible | in header only |

Inline desktop nav MUST NOT appear below large. Overlay MUST remain the nav surface below large. Hamburger MUST remain until large. Reservar MUST appear in the header from medium upward. Below large, theme MUST NOT appear in the header. At large and above, theme MUST NOT appear in the drawer.

#### Scenario: Below large compact chrome

- GIVEN viewport below large
- WHEN the page loads
- THEN hamburger is visible and inline desktop nav is not

#### Scenario: Large inline nav

- GIVEN viewport at or above large
- WHEN the page loads
- THEN inline nav is visible and hamburger and drawer are hidden or closed

#### Scenario: Medium-not-large split

- GIVEN viewport at or above medium and below large
- WHEN header is shown
- THEN Reservar is in the header, hamburger is visible, and overlay remains the nav surface

#### Scenario: Below medium no header Reservar

- GIVEN viewport below medium
- WHEN header is shown
- THEN Reservar is not in the header and hamburger is visible

#### Scenario: Open drawer dismissed on enlarge

- GIVEN viewport below large and drawer open
- WHEN viewport grows to large or above
- THEN drawer is closed and hidden and inline nav is visible

### Requirement: Hamburger control

The hamburger MUST use a Font Awesome icon as its only visible control content. It MUST NOT use CSS-drawn bars. The control MUST NOT wrap. While the drawer is open, the control SHOULD show a close (X) icon.

#### Scenario: Closed hamburger shows menu icon

- GIVEN viewport below large and drawer closed
- WHEN hamburger is displayed
- THEN only visible content is a Font Awesome menu icon and it does not wrap

#### Scenario: Open hamburger shows close icon

- GIVEN overlay drawer open
- WHEN hamburger is displayed
- THEN visible content is a Font Awesome close (X) icon

### Requirement: Overlay drawer over content

The overlay drawer MUST slide in from the right over existing content. Main content MUST NOT shift when the drawer opens or closes.

#### Scenario: Open overlays without shift

- GIVEN viewport below large and drawer closed
- WHEN user opens the hamburger
- THEN drawer slides in from the right and main content does not shift

### Requirement: Drawer dismissal and scroll lock

While the drawer is open, a backdrop MUST be present and body scroll MUST be locked. The drawer MUST close on Escape and on click-outside. After close, body scroll MUST be restored.

#### Scenario: Backdrop and scroll lock

- GIVEN overlay drawer open
- WHEN the page is observed
- THEN a backdrop is visible and body scroll is locked

#### Scenario: Escape or click-outside closes

- GIVEN overlay drawer open
- WHEN user presses Escape or clicks outside the drawer
- THEN drawer closes and body scroll is restored

#### Scenario: Escape ignored when closed

- GIVEN overlay drawer closed
- WHEN user presses Escape
- THEN drawer remains closed

### Requirement: Icon-only theme control

The theme control MUST be icon-only and MUST NOT show a “Tema” label. The dropdown MUST offer Claro, Oscuro, and Dispositivo.

#### Scenario: No text label

- GIVEN theme control visible
- WHEN it is displayed
- THEN it shows an icon only and no “Tema” label

#### Scenario: Theme options

- GIVEN theme control visible
- WHEN user opens its dropdown
- THEN options are Claro, Oscuro, and Dispositivo

#### Scenario: Small viewport theme in drawer

- GIVEN viewport below large and drawer open
- WHEN drawer contents are shown
- THEN theme control is below Reservar in the drawer and not in the header

#### Scenario: Large viewport theme in header

- GIVEN viewport at or above large
- WHEN header is shown
- THEN theme control is in the header and not in the drawer

### Requirement: Drawer closes on navigation and booking

Activating a navigation link in the drawer MUST close the drawer. Opening booking from the drawer MUST close the drawer first, then open booking.

#### Scenario: Nav link closes drawer

- GIVEN overlay drawer open
- WHEN user activates a navigation link in the drawer
- THEN drawer closes

#### Scenario: Booking from drawer closes first

- GIVEN overlay drawer open
- WHEN user opens booking from the drawer
- THEN drawer closes first and then booking opens

### Requirement: Language switcher control

Header MUST provide language control aligned with theme: translate icon, `ES`/`EN` label, chevron, theme-like dropdown. MUST navigate locale URLs (MUST NOT client-only dictionary swap). Choice MUST persist for boot when JS runs. With hash present and JS available, MUST remap via explicit ES↔EN hash map.

Locale option controls MUST be real `<a>` elements whose `href` targets the other (and current) locale paths from `getRelativeLocaleUrl` (`/` for `es`, `/en/` for `en`). Navigation MUST succeed without client JS (native link follow). Menu open/close MAY use progressive enhancement, but MUST NOT be the only path to those `href`s for no-JS users (disclosure MUST work without JS, e.g. `<details>`/`<summary>`).

Active locale MUST be indicated with `aria-current="page"` (not exclusive radio semantics). Option roles MUST be link-appropriate (`menuitem` if keeping `role="menu"`, or plain links); MUST NOT use `menuitemradio` + `aria-checked` for navigational locale choices.

#### Scenario: Desktop chrome

- GIVEN viewport ≥ large
- WHEN header shown
- THEN language control (icon + ES/EN + chevron) sits beside theme

#### Scenario: Drawer chrome

- GIVEN viewport < large and drawer open
- WHEN drawer shown
- THEN language control sits next to theme in drawer

#### Scenario: Crawlable locale anchors

- GIVEN either locale page HTML
- WHEN locale options are inspected in source
- THEN each option is an `<a>` with `href` equal to that locale’s `getRelativeLocaleUrl` path

#### Scenario: No-JS locale switch

- GIVEN JavaScript disabled
- WHEN user activates the non-current locale option
- THEN the browser navigates to that locale URL without script

#### Scenario: ES→EN with hash (JS)

- GIVEN Spanish URL with ES section hash and JS enabled
- WHEN English selected
- THEN navigates to EN URL with mapped hash and stores preference

#### Scenario: EN→ES with hash (JS)

- GIVEN `/en/` with English section hash and JS enabled
- WHEN Spanish selected
- THEN navigates to ES URL with mapped hash and stores preference

#### Scenario: No client-only swap

- GIVEN either locale
- WHEN language changed via control
- THEN URL changes to other locale path (not in-place string swap)
