# Site-Perf-Assets Specification

## Purpose

Self-hosted Noto Sans + Noto Serif (no Google Fonts), AboutStats/footer image delivery, preview/prod verify. **Font Awesome CDN retained** (icon SVG migration cancelled 2026-09-05).

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

Performance success for the fonts/images unit MUST be judged only on `astro build` + `astro preview` or a deployed Netlify URL. Verification MUST NOT use `astro dev` as a gate. Results SHOULD cite that Google Fonts were removed while Font Awesome CDN remains intentional.

#### Scenario: Verify on preview or Netlify

- GIVEN fonts and image changes are built
- WHEN acceptance is recorded
- THEN the target is preview or Netlify (or equivalent production build evidence)
- AND `astro dev` is not used as the pass/fail gate

#### Scenario: FA retention recorded

- GIVEN icons migration was cancelled
- WHEN verification closes
- THEN Font Awesome CDN retention is explicitly accepted for this change
