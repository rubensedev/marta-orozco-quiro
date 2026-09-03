# Delta for Site-Header

## ADDED Requirements

### Requirement: Language switcher control

Header MUST provide language control aligned with theme: translate icon, `ES`/`EN` label, chevron, theme-like dropdown. MUST navigate locale URLs (MUST NOT client-only dictionary swap). Choice MUST persist for boot. With hash present, MUST remap via explicit ES↔EN hash map.

#### Scenario: Desktop chrome

- GIVEN viewport ≥ large
- WHEN header shown
- THEN language control (icon + ES/EN + chevron) sits beside theme

#### Scenario: Drawer chrome

- GIVEN viewport < large and drawer open
- WHEN drawer shown
- THEN language control sits next to theme in drawer

#### Scenario: ES→EN with hash

- GIVEN Spanish URL with ES section hash
- WHEN English selected
- THEN navigates to EN URL with mapped hash and stores preference

#### Scenario: EN→ES with hash

- GIVEN `/en/` with English section hash
- WHEN Spanish selected
- THEN navigates to ES URL with mapped hash and stores preference

#### Scenario: No client-only swap

- GIVEN either locale
- WHEN language changed via control
- THEN URL changes to other locale path (not in-place string swap)
