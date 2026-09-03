# Glass Design System Specification

## Purpose

Define a lightweight, responsive frosted-glass visual system for the Marta Orozco landing page — serene, semi-transparent surfaces with consistent tokens across light and dark modes.

## Requirements

### Requirement: Glass theme tokens

The system MUST expose glass design tokens in `@theme` for blur steps, surface tint, edge highlight, and soft shadow. Tokens MUST have light and dark pairs keyed to `html.dark`.

#### Scenario: Templates consume glass utilities

- GIVEN `global.css` with glass tokens
- WHEN a component uses glass tier utilities
- THEN blur, background, border, and shadow derive from theme tokens

### Requirement: Three glass tiers

Surfaces MUST map to tiers:

| Tier | Surfaces |
|------|----------|
| Chrome | Header, MobileBar, mobile drawer, theme/lang menus |
| Panel | Section cards, massage main panel, booking modal panel |
| Control | Secondary buttons, pricing pills, carousel nav, form inputs |

Primary `btn-brand` MUST remain solid (not glass).

#### Scenario: Chrome tier on navigation

- GIVEN header or mobile drawer visible
- WHEN rendered in light or dark
- THEN chrome surfaces show frosted blur and hairline edge highlight

#### Scenario: Panel tier on cards

- GIVEN pricing, about, contact, rituals, or massage main panel
- WHEN section is visible
- THEN card surfaces use panel-tier glass with readable body text

#### Scenario: Primary CTA stays solid

- GIVEN a `btn-brand` control
- WHEN rendered
- THEN background is solid sage without backdrop blur

### Requirement: Ambient page depth

The page MUST include a subtle ambient gradient on `body` so glass panels remain legible over background content.

#### Scenario: Gradient supports glass readability

- GIVEN default page load
- WHEN viewing any glass panel section
- THEN background shows gentle depth behind frosted surfaces

### Requirement: Progressive enhancement and accessibility

When `backdrop-filter` is unsupported, surfaces MUST fall back to semi-opaque solid tints. `:focus-visible` rings MUST remain visible. `prefers-reduced-motion` rules MUST stay honored. In `forced-colors`, glass MAY degrade to solid backgrounds.

#### Scenario: No backdrop-filter fallback

- GIVEN a browser without `backdrop-filter`
- WHEN glass surfaces render
- THEN content remains readable via opaque/semi-opaque fallback

#### Scenario: Focus visible on glass controls

- GIVEN keyboard focus on a glass button or menu item
- WHEN `:focus-visible` applies
- THEN a visible focus indicator appears
