# Delta for Astro Tailwind Styling

## MODIFIED Requirements

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

### Requirement: Brand colors and fonts as theme utilities

Brand colors, fonts, **and glass tokens** MUST be available as Tailwind theme utilities.

(Previously: brand colors and fonts only.)

#### Scenario: Glass utilities apply tier styling

- GIVEN glass theme utilities
- WHEN chrome, panel, or control tier classes are applied
- THEN rendered surfaces match the glass design system spec
