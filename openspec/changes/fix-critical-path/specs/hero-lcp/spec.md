# Delta for hero-lcp

Amends `optimize-hero-lcp` LCP-winner policy: live/prod Lighthouse attributes LCP to the hero **background**, not the portrait.

## RENAMED Requirements

### Requirement: Single high-priority LCP portrait → Single high-priority LCP background

(Reason: Prod/Netlify LH LCP element is the full-bleed background `hero.webp`, not the portrait.)
(Migration: Update verify checks and any docs that assert portrait-as-sole-high; portrait MUST NOT use `fetchpriority="high"`.)

## MODIFIED Requirements

### Requirement: Single high-priority LCP background

Exactly one hero image request MUST use high fetch priority, and that image MUST be the hero background. The hero portrait MUST NOT use `fetchpriority="high"` (portrait MAY use `loading="eager"` with fetch priority `auto` or equivalent). The Massages first-panel image MUST NOT use `fetchpriority="high"`. The hero SHOULD render a single portrait DOM instance so a CSS-hidden eager node does not create a second portrait download.
(Previously: Portrait was the sole `fetchpriority="high"` image; background MUST NOT be high.)

#### Scenario: Background is sole high-priority image

- GIVEN the built homepage hero and Massages section
- WHEN image priority attributes are inspected
- THEN the hero background uses `fetchpriority="high"`
- AND the portrait does not use `fetchpriority="high"`
- AND the Massages first panel does not use `fetchpriority="high"`

#### Scenario: Exactly one high-priority hero fetch

- GIVEN a cold load of the homepage
- WHEN hero image fetch priorities are counted
- THEN exactly one hero-related image uses `fetchpriority="high"`
- AND that image is the background

#### Scenario: No dual high-priority portrait fetch

- GIVEN a mobile viewport where a second portrait node would be CSS-hidden
- WHEN first-load network requests for the portrait are counted
- THEN only one portrait fetch occurs
- AND none of those portrait fetches use `fetchpriority="high"`
