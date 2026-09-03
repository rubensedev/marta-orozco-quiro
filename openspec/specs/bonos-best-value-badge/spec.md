# Bonos Best-Value Badge Specification

## Purpose

Mark only the Bono 10 package tile with a soft glass “best value” pill so visitors can compare Bono 5 vs Bono 10 without a second promo graphic or sale sticker.

## Requirements

### Requirement: Bono 10 exclusive badge

The packages grid MUST show a best-value badge only when the package tier id is `bono10`. The system MUST NOT show the badge on `bono5`, `single`, or any other tier.

#### Scenario: Badge on Bono 10

- GIVEN the Bonos two-column package grid is rendered
- WHEN the `bono10` article is inspected
- THEN a visible best-value badge is present above that tier’s sessions label

#### Scenario: No badge on Bono 5

- GIVEN the Bonos two-column package grid is rendered
- WHEN the `bono5` article is inspected
- THEN no best-value badge element is present

### Requirement: Placement relative to sessions label

The badge MUST be a sibling before the sessions heading (`h4` / `sessionsLabel`) inside the package article. The badge MUST NOT be placed inside `.bono-discount`. The badge MUST remain in normal document flow (MUST NOT overlap the discount circle or concentric wave rings).

#### Scenario: Sibling before sessions heading

- GIVEN the `bono10` article markup
- WHEN DOM order is inspected
- THEN the badge precedes the sessions heading and is outside `.bono-discount`

#### Scenario: Waves remain clear

- GIVEN the `bono10` discount control with concentric waves
- WHEN the page is viewed at typical desktop and mobile widths
- THEN the badge does not intersect the discount core or wave radius

### Requirement: Locked i18n copy contract

Both locale dictionaries MUST expose `bonos.bestValueLabel`. Spanish MUST be exactly `Máximo ahorro`. English MUST be exactly `Best value`. The visible badge text MUST render `bonos.bestValueLabel` for the active locale.

#### Scenario: Spanish label

- GIVEN locale `es`
- WHEN the Bono 10 badge is shown
- THEN visible text is `Máximo ahorro`

#### Scenario: English label

- GIVEN locale `en`
- WHEN the Bono 10 badge is shown
- THEN visible text is `Best value`

### Requirement: Soft glass pill chrome

The badge MUST use a tinted glass pill (rounded full, lavender text, light lavender tint background and soft border). The badge MUST NOT use a solid sale-sticker treatment equivalent to `.pricing-savings-highlight` (heavy solid fill + strong shadow). Text on the tint MUST meet WCAG AA contrast for small text in light and dark modes.

#### Scenario: Glass pill not sale sticker

- GIVEN light or dark theme
- WHEN the Bono 10 badge styles are inspected
- THEN it reads as a soft tinted pill with lavender text/border and no heavy solid sale-sticker chrome

### Requirement: Accessible naming

The badge MUST expose its meaning as visible text (not color-only). The Bono 10 discount control’s accessible name (`aria-label`) MUST include `bonos.bestValueLabel` in addition to existing tier/discount context.

#### Scenario: Visible text conveys meaning

- GIVEN a visitor using the page without relying on color
- WHEN they view Bono 10
- THEN the best-value meaning is available as readable badge text

#### Scenario: aria-label includes best-value label

- GIVEN the Bono 10 discount button
- WHEN its accessible name is read
- THEN it includes the active `bonos.bestValueLabel` string

### Requirement: No new badge motion

The badge MUST NOT introduce a new looping or hover-bounce animation. It MAY inherit existing section reveal motion only. Existing discount-core hover and wave animations MUST remain unchanged; reduced-motion behavior for waves MUST remain respected.

#### Scenario: Static badge

- GIVEN reduced motion is off
- WHEN the packages section is idle after reveal
- THEN the badge has no dedicated looping animation of its own
