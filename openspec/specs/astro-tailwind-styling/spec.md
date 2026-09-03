# Astro Tailwind Styling Specification

## Purpose

The landing page MUST be styled with Tailwind utilities in templates, one CSS entry, class-based dark, a closed leftover-class allow-list, and no Sass. Brand, copy, JS contracts, and the anti-flash script stay. This is not a redesign.

## Requirements

### Requirement: Utility classes in templates

Astro templates MUST use Tailwind utility classes for layout, spacing, color, and typography. Named leftover classes MUST NOT cover those concerns except via the leftover allow-list.

#### Scenario: Sections use utilities

- GIVEN a built page
- WHEN a visitor views header, hero, sections, modal, or footer
- THEN layout, spacing, color, and type come from Tailwind utilities on the markup

#### Scenario: Allow-list does not grow for ordinary layout

- GIVEN a template that needs layout, spacing, color, or type
- WHEN styles are applied
- THEN no new named leftover class is added for that need

### Requirement: Single CSS entry without Sass

Layout MUST import `src/styles/global.css` as the only stylesheet entry. `global.scss` MUST NOT be used. Sass MUST NOT be required to build or style the site.

#### Scenario: Layout loads global.css only

- GIVEN Layout
- WHEN the page loads
- THEN styles come from `global.css`
- AND `global.scss` is not imported

#### Scenario: Build without Sass

- GIVEN no Sass dependency
- WHEN the site is built
- THEN the build succeeds and the page is styled

### Requirement: Brand colors and fonts as theme utilities

Brand colors, fonts, **and glass tokens** MUST be available as Tailwind theme utilities.

(Previously: brand colors and fonts only.)

#### Scenario: Glass utilities apply tier styling

- GIVEN glass theme utilities
- WHEN chrome, panel, or control tier classes are applied
- THEN rendered surfaces match the glass design system spec

### Requirement: Dark mode follows html.dark

Dark styles MUST apply when `html` has class `dark`. Dark styles MUST NOT depend only on `prefers-color-scheme`. The anti-flash script that sets `html.dark` MUST remain.

#### Scenario: Class dark enables dark look

- GIVEN the anti-flash or theme script adds `dark` on `html`
- WHEN the page renders
- THEN dark surfaces and brand colors appear

#### Scenario: Media dark without class stays light

- GIVEN `prefers-color-scheme: dark` and `html` without class `dark`
- WHEN the page renders
- THEN light styles apply
- AND dark styles keyed to `html.dark` do not apply

### Requirement: Leftover named classes allow-list

Named leftover classes MUST be limited to:

| Kind | Allowed leftovers |
|------|-------------------|
| Hard CSS | pseudos, `dialog::backdrop`, `:user-invalid`, keyframes, reduced-motion, logo/map filters, `font-size-adjust`, `[hidden]`, glass `@supports` fallbacks |
| Widgets | brand button; **secondary button (glass control tier)**; pricing pills and price rows; **carousel cards and nav (glass recipes)**; **theme menu button (glass control)**; massage panel content hook |

Glass-related leftover updates MUST only adjust existing widget class recipes — not introduce new layout BEM for ordinary sections.

(Previously: widgets listed brand button and pricing only; carousel/theme glass existed ad hoc without spec coverage.)

#### Scenario: Allow-listed widgets are styled

- GIVEN a brand button, secondary button, pricing pill, carousel card, or theme menu button
- WHEN it is shown
- THEN it is visibly styled via an allow-listed leftover class

#### Scenario: Allow-list does not grow for ordinary layout

- GIVEN a template that needs layout, spacing, color, or type
- WHEN styles are applied
- THEN no new named leftover class is added for that need

#### Scenario: Glass sections use utilities first

- GIVEN a section card styled with glass
- WHEN implementation is reviewed
- THEN tier styling uses Tailwind utilities from glass tokens except on allow-listed widgets

### Requirement: Preserve brand, content, and JS contracts

Visual brand and layout MUST match the current site in light and dark, at mobile/`md`/`lg`, and for modal, pricing, and theme menu (rem-aligned spacing MAY differ if rem values match). Copy MUST be unchanged. `data-*` attributes, ids, and ARIA MUST stay. JS behavior MUST stay.

#### Scenario: Contracts still work

- GIVEN existing `data-*`, ids, and ARIA
- WHEN a visitor uses header, theme menu, booking modal, or pricing
- THEN those attributes remain and JS behavior is unchanged

### Requirement: JS-injected pricing HTML is styled

Pricing pills, prices, and bono examples injected via JS MUST appear styled after injection. Injected markup MUST use allow-listed leftover classes, not deleted BEM-only names.

#### Scenario: innerHTML pricing looks styled

- GIVEN scripts inject pricing HTML
- WHEN a visitor opens or updates pricing
- THEN pills, prices, and bono examples are visibly styled

### Requirement: Reduced motion is honored

The site MUST honor `prefers-reduced-motion` for animations and motion effects.

#### Scenario: Reduced motion disables animation

- GIVEN `prefers-reduced-motion: reduce`
- WHEN animated UI would play
- THEN motion is reduced or omitted
