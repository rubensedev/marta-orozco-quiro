# Creative-404 Specification

## Purpose

Branded static Netlify 404: thank-you twin glass UI, bilingual CTAs, shared relax-flow, noindex.

## Requirements

### Requirement: Static Netlify 404 artifact

The system MUST build a single static host 404 from `404.astro` that produces `404.html`. Unknown routes MUST be served as HTTP 404 while the browser URL of the missing path is preserved. The system MUST NOT rely on a separate per-locale Astro 404 as the Netlify-served host 404.

#### Scenario: Unknown path returns branded 404

- GIVEN the site is deployed on Netlify with the built `404.html`
- WHEN a visitor requests an unknown path
- THEN the response status is HTTP 404
- AND the branded 404 page is shown
- AND the browser URL remains the missing path

### Requirement: Thank-you twin presentation

The 404 experience MUST match the thank-you glass relax-flow visual language (logo, glass card, dual CTAs over shared canvas). A visible “404” mark MUST appear as decorative/status text and MUST NOT be the sole accessible page name. A soft massage-oriented phrase MUST be the document `h1` (EN: “Looking for a massage?” / ES: “¿Buscabas un masaje?”). Body copy MUST use the locked EN/ES lines from the proposal.

#### Scenario: Structure and hierarchy

- GIVEN the 404 page is rendered in either locale
- WHEN the main content is inspected
- THEN a visible “404” mark is present
- AND the soft phrase is the `h1`
- AND logo and glass card match the thank-you twin pattern

### Requirement: Primary massages CTA

The primary CTA MUST navigate to massages anchors: `/#masajes` for Spanish UI and `/en#massages` for English UI. Labels MUST be “Ver masajes” (ES) / “Explore massages” (EN).

#### Scenario: ES primary CTA

- GIVEN Spanish 404 UI
- WHEN the primary CTA is activated
- THEN navigation targets `/#masajes`

#### Scenario: EN primary CTA

- GIVEN English 404 UI
- WHEN the primary CTA is activated
- THEN navigation targets `/en#massages`

### Requirement: Secondary WhatsApp CTA

The secondary CTA MUST open WhatsApp inquiry using the same prefill source as thank-you (`meta.whatsappInquiry`) and MUST reuse thank-you WhatsApp label strings for the active locale.

#### Scenario: WhatsApp matches thank-you inquiry

- GIVEN the 404 page in either locale
- WHEN the secondary CTA href/body is inspected
- THEN the inquiry prefill matches thank-you
- AND the visible label matches thank-you WhatsApp copy for that locale

### Requirement: No home or chip navigation

The 404 page MUST NOT include a home/root link and MUST NOT include quick-nav chips.

#### Scenario: Absent home and chips

- GIVEN the 404 page is rendered
- WHEN interactive navigation controls are inventoried
- THEN no home/root link is present
- AND no quick-nav chips are present

### Requirement: Shared relax-flow module

Thank-you and 404 MUST initialize the decorative canvas from one shared `relax-flow` module with multi-instance-safe hooks. The shared experience MUST respect `prefers-reduced-motion` consistent with existing thank-you behavior.

#### Scenario: Shared init on both pages

- GIVEN thank-you and 404 pages
- WHEN canvas init is inspected
- THEN both use the shared relax-flow module
- AND neither retains a separate inline canvas init copy

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce`
- WHEN the 404 canvas runs
- THEN motion is reduced or disabled as on thank-you

### Requirement: Robots noindex on 404

The 404 document MUST emit robots directives that include `noindex` (prefer `noindex, nofollow`). The 404 shell MUST NOT include JSON-LD.

#### Scenario: Head robots and JSON-LD

- GIVEN the 404 document head
- WHEN meta robots and structured data are inspected
- THEN robots include `noindex`
- AND no JSON-LD is present
