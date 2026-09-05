# Hero-LCP Specification

## Purpose

Hero portrait is the sole high-priority LCP image, served via Astro Image from `src/assets`, within a ~300 KB largest-variant budget, with SVG removed from the critical path.

## Requirements

### Requirement: Astro Image portrait from src/assets

The hero portrait MUST be imported from `src/assets` and rendered through the Astro Image pipeline (`<Image />` or equivalent build output). The system MUST NOT serve the portrait as a raw `public/` SVG. The system MUST NOT use an unpipelined static `public/` WebP as the primary LCP portrait path.

#### Scenario: Pipeline-sourced portrait

- GIVEN the built homepage hero
- WHEN the LCP portrait `img`/`srcset` is inspected
- THEN the asset is produced by the Astro Image pipeline from a `src/assets` portrait source
- AND the URL is not the raw `public` SVG portrait path

### Requirement: Largest served variant byte budget

The largest relevant served portrait variant MUST be ≤ approximately 300 KB after the Image pipeline. Lossy re-encode of the WebP master (approach C) MUST be applied ONLY IF that measured largest variant still exceeds ~300 KB. The system MUST NOT precompress the WebP master when the pipeline already meets the budget.

#### Scenario: Budget met without master precompress

- GIVEN Astro Image widths/quality yield a largest served portrait variant ≤~300 KB
- WHEN the byte-budget gate is evaluated
- THEN approach C master precompress is not required
- AND the ≤~300 KB budget is satisfied

#### Scenario: Gate C only when over budget

- GIVEN the largest Image-served portrait variant still exceeds ~300 KB
- WHEN the byte-budget gate is evaluated
- THEN the WebP master MUST be lossy re-encoded (C) and re-measured until the largest relevant served variant is ≤~300 KB
- AND the gate application is documented for verify / issue #5

### Requirement: Single high-priority LCP portrait

Exactly one hero portrait request MUST use high fetch priority. The hero background image MUST NOT use `fetchpriority="high"`. The Massages first-panel image MUST NOT use `fetchpriority="high"`. The hero SHOULD render a single portrait DOM instance so a CSS-hidden eager node does not create a second portrait download.

#### Scenario: Portrait is sole high-priority image

- GIVEN the built homepage hero and Massages section
- WHEN image priority attributes are inspected
- THEN one portrait image uses `fetchpriority="high"`
- AND the hero background does not use `fetchpriority="high"`
- AND the Massages first panel does not use `fetchpriority="high"`

#### Scenario: No dual high-priority portrait fetch

- GIVEN a mobile viewport where a second portrait node would be CSS-hidden
- WHEN first-load network requests for the portrait are counted
- THEN only one high-priority portrait fetch occurs

### Requirement: SVG portrait deleted

The file `public/assets/images/hero-marta.svg` MUST be deleted from the repository. The hero MUST NOT reference that SVG (or any `public` SVG portrait) on the critical rendering path.

#### Scenario: SVG file removed from repo

- GIVEN the change is applied
- WHEN the repository tree is checked
- THEN `public/assets/images/hero-marta.svg` does not exist

#### Scenario: No SVG portrait network request

- GIVEN a cold load of the homepage
- WHEN network requests are inspected
- THEN no request fetches `hero-marta.svg`

### Requirement: Localized portrait alt text

The portrait MUST preserve locale-appropriate non-empty `alt` text on Spanish and English pages. Existing localized alt meaning MUST NOT regress to empty or a single hard-coded locale.

#### Scenario: Spanish alt preserved

- GIVEN `/` (Spanish)
- WHEN the portrait image is inspected
- THEN `alt` is non-empty and matches Spanish locale content

#### Scenario: English alt preserved

- GIVEN `/en/` (English)
- WHEN the portrait image is inspected
- THEN `alt` is non-empty and matches English locale content
