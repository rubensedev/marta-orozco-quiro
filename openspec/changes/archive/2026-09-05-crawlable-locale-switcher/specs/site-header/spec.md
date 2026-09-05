# Site-Header Delta — Crawlable Locale Switcher

## MODIFIED Requirements

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
