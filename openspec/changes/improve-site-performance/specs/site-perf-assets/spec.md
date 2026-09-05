# Site-Perf-Assets Specification

## Purpose

Remaining CWV floor: self-hosted Noto Sans + Noto Serif (same faces as today), inline SVG icons (no FA CDN), AboutStats/footer image delivery, preview/prod verify.

## Requirements

### Requirement: Self-hosted brand fonts

Built pages MUST load brand text fonts from first-party/self-hosted assets only (e.g. `@fontsource` packages bundled by the build). Pages MUST NOT request Google Fonts CSS, Google Fonts files, or Google Fonts preconnects. Pages MUST NOT require a manual “download from Google Fonts into `public/`” workflow. Body face MUST remain **Noto Sans**; display/heading face MUST remain **Noto Serif**. Theme token `--font-sans` MUST resolve to Noto Sans; `--font-serif` MUST resolve to Noto Serif. Loaded weights SHOULD be limited to those used on the site (**300, 400, 500, 600**); unused **700** SHOULD NOT be shipped. Fonts MUST use `font-display: swap`. Critical woff2 files SHOULD be preloaded (at least Noto Sans 400 and Noto Serif 400). Subsets MUST cover Latin plus Spanish accented glyphs used on the site.

#### Scenario: No Google Fonts on built pages

- GIVEN a production `astro build` output
- WHEN document head and network for a page are inspected
- THEN no Google Fonts stylesheet, font file, or fonts.gstatic/fonts.googleapis preconnect is present
- AND Noto Sans and Noto Serif are served from self-hosted (build-bundled) assets

#### Scenario: Theme tokens keep current Noto faces

- GIVEN global theme tokens after the change
- WHEN `--font-sans` and `--font-serif` are resolved
- THEN sans is Noto Sans and serif is Noto Serif

#### Scenario: Swap and critical preload

- GIVEN self-hosted font CSS in the build
- WHEN fonts are declared
- THEN `font-display: swap` applies
- AND critical woff2 for Noto Sans 400 and Noto Serif 400 are preloaded (or equivalently discoverable early)

### Requirement: Inline SVG icon set without Font Awesome CDN

The site MUST render former Font Awesome glyphs as inline SVG (or equivalent first-party SVG markup). Built pages MUST NOT load Font Awesome CSS or webfonts from cdnjs or any FA CDN. Icon data previously expressed as FA `iconClass` strings MUST use stable icon identifiers consumable by SVG markup. Client scripts that toggle menu, theme, or inject savings markup MUST NOT depend on FA class name strings.

#### Scenario: No Font Awesome CDN on built pages

- GIVEN a production `astro build` output
- WHEN document head and network for a page are inspected
- THEN no Font Awesome stylesheet or FA webfont request is present

#### Scenario: Prior FA surfaces use SVG

- GIVEN Header, MobileBar, Contact, Reviews, Massages, Rituals, BookingModal, and shared ritual icon data
- WHEN those surfaces render icons
- THEN each former FA glyph is an inline/SVG icon and no FA `<i class="fa-*">` control content remains

#### Scenario: Client toggles without FA classes

- GIVEN PageScripts menu, theme, or savings UI updates
- WHEN icons are swapped or injected
- THEN updates do not rely on Font Awesome class strings

### Requirement: AboutStats responsive image delivery

The AboutStats decorative `Image` MUST declare responsive `widths` and `sizes` so delivered bytes fit display size (Hero-style pattern). Lazy loading MAY remain.

#### Scenario: Display-fit AboutStats image

- GIVEN AboutStats decorative image markup
- WHEN attributes are inspected
- THEN `widths` and `sizes` are present and sized for the rendered display, not an unsized full master only

### Requirement: Footer logo intrinsic sizing

The footer logo image MUST declare intrinsic `width` and `height` attributes consistent with its displayed size.

#### Scenario: Footer logo has width and height

- GIVEN Footer logo markup
- WHEN attributes are inspected
- THEN `width` and `height` are present

### Requirement: Preview or production CWV verification

Performance success MUST be judged only on `astro build` + `astro preview` or a deployed Netlify URL. Verification MUST NOT use `astro dev` as a gate. Results MUST cite Perf, FCP, LCP, and TBT against baseline Perf 87 / FCP 1.9s / LCP 3.9s / TBT 0, and MUST note render-blocking change versus the ~890ms GFonts+FA floor. FCP and/or render-blocking SHOULD improve versus that floor.

#### Scenario: Verify on preview or Netlify

- GIVEN fonts/icons/image changes are built
- WHEN Lighthouse mobile is run for acceptance
- THEN the target is preview or Netlify
- AND `astro dev` is not used as the pass/fail gate

#### Scenario: Baseline comparison recorded

- GIVEN acceptance Lighthouse results
- WHEN compared to the post-fix-critical-path floor
- THEN Perf, FCP, LCP, TBT are cited versus 87 / 1.9s / 3.9s / 0
- AND render-blocking delta versus ~890ms is recorded
