# critical-path-perf Specification

## Purpose

Recover mobile CWV on the critical path without changing Font Awesome, Google Fonts, or icon systems: responsive hero images, deferred below-fold carousel init, and a preview/prod-only verify protocol.

## Requirements

### Requirement: Responsive hero background sizing

The hero background MUST declare responsive `widths` and `sizes` (or equivalent Astro Image responsive output) so the browser selects a variant near the display CSS pixel width. The system MUST NOT rely on a single oversized intrinsic width without `sizes` for full-bleed mobile viewports.

#### Scenario: Background has display-fit srcset

- GIVEN the built homepage hero background `img`
- WHEN `srcset`/`sizes` (or Image pipeline equivalents) are inspected
- THEN responsive widths are present
- AND `sizes` reflects full-bleed viewport usage

### Requirement: Portrait display-fit widths and quality

The hero portrait MUST use `widths`, `sizes`, and quality such that the served variant approximates the displayed CSS pixel size (no large overshoot vs typical mobile display box). Portrait MUST remain pipeline-sourced per `hero-lcp`.

#### Scenario: Portrait variant near display size

- GIVEN a typical mobile viewport (~412 CSS px wide)
- WHEN the portrait served width/bytes are inspected
- THEN the chosen variant is sized for the displayed box
- AND is not a large unused overshoot vs display CSS px

### Requirement: Deferred horizontal carousel init

Massages and Reviews MUST NOT call `initHorizontalCarousel` at script parse/load for first paint. Init MUST be deferred until `requestIdleCallback` (or idle polyfill) and/or near-viewport via `IntersectionObserver`. Existing Massages first-panel image demotion MUST remain in effect.

#### Scenario: No eager carousel init on load

- GIVEN a cold homepage load with Massages and Reviews below the fold
- WHEN the document finishes initial parse
- THEN carousel init has not yet run for those sections
- AND init runs only after idle and/or the section approaches the viewport

#### Scenario: Carousel still works after defer

- GIVEN the user scrolls Massages or Reviews into view (or idle fires)
- WHEN carousel controls/loop are exercised
- THEN horizontal carousel behavior matches pre-defer expectations

### Requirement: Preview or production CWV verification

Success gates and Lighthouse comparisons MUST use `astro build` + `astro preview`, or a deployed Netlify URL. The system MUST NOT treat `astro dev` Lighthouse scores as pass/fail evidence. Reports SHOULD record mobile metrics (Perf, FCP, LCP, TBT, CLS) and the LCP element selector, and SHOULD compare against known baselines (main and/or branch `moqtest`).

#### Scenario: Verify rejects dev-only LH

- GIVEN a verify attempt that used only `astro dev` LH
- WHEN the gate is evaluated
- THEN the result is not accepted as success evidence

#### Scenario: Preview or Netlify LH accepted

- GIVEN mobile LH from `astro preview` or Netlify
- WHEN metrics and LCP selector are recorded
- THEN the run counts toward the success gate
- AND improvement vs branch baseline (Perf 52 / FCP 5.1s / LCP 7.6s) is noted when claiming recovery

### Requirement: Optional logo intrinsic dimensions

Logo `<img>` elements MAY include explicit `width` and `height` (or equivalent) when trivial to add, to reduce layout uncertainty. This MUST NOT block other critical-path requirements.

#### Scenario: Logo sizing when applied

- GIVEN logo images receive intrinsic size attributes
- WHEN layout is inspected
- THEN width/height are present on those logos
- AND hero LCP priority rules remain unchanged
