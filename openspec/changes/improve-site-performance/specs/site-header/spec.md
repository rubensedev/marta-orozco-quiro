# Delta for Site-Header

## MODIFIED Requirements

### Requirement: Hamburger control

The hamburger MUST use an inline SVG icon as its only visible control content. It MUST NOT use CSS-drawn bars. It MUST NOT require Font Awesome CSS, webfonts, or FA class-based `<i>` markup. The control MUST NOT wrap. While the drawer is open, the control SHOULD show a close (X) SVG icon.
(Previously: hamburger MUST use a Font Awesome icon; open state SHOULD show Font Awesome close/X.)

#### Scenario: Closed hamburger shows menu icon

- GIVEN viewport below large and drawer closed
- WHEN hamburger is displayed
- THEN only visible content is an inline SVG menu icon and it does not wrap
- AND no Font Awesome class or FA webfont is required for that icon

#### Scenario: Open hamburger shows close icon

- GIVEN overlay drawer open
- WHEN hamburger is displayed
- THEN visible content is an inline SVG close (X) icon
- AND no Font Awesome class or FA webfont is required for that icon
