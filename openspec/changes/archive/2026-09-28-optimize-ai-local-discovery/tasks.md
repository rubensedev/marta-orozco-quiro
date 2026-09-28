# Tasks: Optimize AI / Local Discovery

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~90–140 authored (~50 code + ~8–10 copy strings/locale; About CSS + thank-you/sitemap) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single PR on `feat-fixes-and-improvements` |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending (not needed at forecast size) |

Decision needed before apply: Yes — owner confirmation of building-access / arrival facts (blocks optional arrival slots only; session-flow + entity + crawl hygiene ship without it)
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Entity: name/locality/Maps single-source + SeoJsonLd consumers | PR 1 | `npm run check` | N/A — static JSON-LD in `dist/` | `shared.ts` + `SeoJsonLd.astro` |
| 2 | Content: About +2 / FAQ +2 (session-flow required; arrival optional) + About CSS delays | PR 1 | `npm run build` + read About/FAQ in `dist/` | Preview `/` + `/en/` reduced-motion | `es.ts` / `en.ts` / `About.astro` |
| 3 | Crawl hygiene: thank-you `noindex` + sitemap `filter` | PR 1 | `npm run build` then inspect robots + `sitemap-0.xml` | N/A — build artifact | `gracias.astro` / `en/thank-you.astro` / `astro.config.mjs` |

Gates: `npm run check` + `npm run build` (`strict_tdd: false`). No product PR creation in this phase.

---

## Phase 1: Entity alignment

- [x] 1.1 In `src/data/site/shared.ts`: add `const MAPS_PLACE_URL = "https://maps.app.goo.gl/HdZVpzvzBEGV6GAZ8"`; set `sharedMeta.mapsUrl` and `sharedMeta.googleReviewsUrl` both to `MAPS_PLACE_URL`; export `googlePlaceId = "ChIJE7KlJmBtEg0Rn-RGXchxER0"`
- [x] 1.2 In `src/data/site/shared.ts`: collapse `businessInfo.name` to string `"Marta Orozco Quiromasaje"` and `businessInfo.addressLocality` to string `"Sevilla"` (remove `{ es, en }` maps)
- [x] 1.3 In `src/components/SeoJsonLd.astro`: import `googlePlaceId` from shared; drop local Place ID const; read `businessInfo.name` and `businessInfo.addressLocality` without `[locale]`; keep `Person.jobTitle` locale switch; keep `WebSite.name` / `og:site_name` as `Marta Orozco`; leave `sameAs` as `[instagramUrl, googleReviewsUrl]`

## Phase 2: Unique local content (About + FAQ)

Session-flow slots are required. Arrival slots are **optional / deferred** until owner confirms building-access, parking/transport wording, and neighbourhood publishability.

- [x] 2.1 In `src/data/site/es.ts`: update `meta.title` → `Marta Orozco Quiromasaje | Masajes en Sevilla`; tighten `hero.subtitle` → `Quiromasaje profesional en el centro de Sevilla`; update `footer.copyright` + `ui.thankYou.metaTitle` + `ui.notFound.metaTitle` to use canonical entity name; revise the “do not alter wording” docblock so edited strings are not treated as frozen
- [x] 2.2 In `src/data/site/es.ts`: append **two** `about.paragraphs` — [3] first-hand session flow (intake → pressure adjust → one-to-one, by appointment); [4] Sevilla grounding (41002 Casco Antiguo / Thursday-only / building 1°A4) using only verifiable facts (no invented landmarks/parking if unconfirmed)
- [x] 2.3 In `src/data/site/es.ts`: append **two** `faq.items` as single-paragraph `FaqAnswerPart[]` — session paso-a-paso; arrival Q with `{ label, action: "maps" }` part. **If arrival facts unknown:** ship session FAQ only (+ session About paragraphs) and leave arrival FAQ/paragraph deferred
- [x] 2.4 In `src/data/site/en.ts`: EN parity of 2.1–2.3; keep `hero.subtitle` as `Professional massage therapist in Seville`; set `contact.addressLines[1]` → `41002 Sevilla`; `footer.copyright` uses untranslated entity name; never translate `businessInfo.name`
- [x] 2.5 In `src/components/About.astro`: add CSS only `.about-reveal--8 { transition-delay: 0.74s; }` and `.about-reveal--9 { transition-delay: 0.84s; }` (paragraphs use `--${i + 5}`; five paragraphs need `--5`…`--9`)
- [x] 2.6 **Closed — nothing to add:** owner confirmed no arrival-specific About/FAQ copy (buzzer/lift/stairs, parking/transport, neighbourhood). Session-flow + NAP grounding already shipped; no further content for this task.

## Phase 3: Crawl hygiene

- [x] 3.1 In `src/pages/gracias.astro`: pass `robots="noindex, follow"` to `Layout` (prop already supported)
- [x] 3.2 In `src/pages/en/thank-you.astro`: pass `robots="noindex, follow"` to `Layout`
- [x] 3.3 In `astro.config.mjs`: add `SITEMAP_EXCLUDED_PATHS = new Set(["/gracias", "/en/thank-you"])` and `sitemap({ filter: (page) => !SITEMAP_EXCLUDED_PATHS.has(new URL(page).pathname.replace(/\/$/, "")), i18n: /* unchanged */ })`; do **not** change `site` origin

## Phase 4: Verification

- [x] 4.1 Run `npm run check` — clean (catches any leftover `name[locale]` / `addressLocality[locale]`)
- [x] 4.2 Run `npm run build` — succeeds; `astro.config.mjs` `site` still `https://martaorozcoquiro.netlify.app`
- [x] 4.3 Spot-check JSON-LD: `dist/index.html` and `dist/en/index.html` both contain `"name":"Marta Orozco Quiromasaje"` and `"addressLocality":"Sevilla"`; `hasMap` still `place_id:ChIJE7KlJmBtEg0Rn-RGXchxER0`; Maps short link `HdZVpzvzBEGV6GAZ8` present in both locale HTML
- [x] 4.4 Spot-check robots: `dist/gracias/index.html` and `dist/en/thank-you/index.html` contain `content="noindex, follow"`; home pages still `index, follow`
- [x] 4.5 Spot-check sitemap: `dist/sitemap-0.xml` locs are only `/` and `/en/` (no `/gracias`, no `/en/thank-you`)
- [x] 4.6 Confirm no `dist/llms.txt` (or equivalent AI-only artifact); no `AggregateRating` / `Review` schema added
- [x] 4.7 Manual (post-build / preview): read new About/FAQ copy ES+EN for parity; skim reveal animation with and without `prefers-reduced-motion`; optional Rich Results Test / Schema.org validator on `/` and `/en/`

## Phase 5: Owner-only notes (not acceptance)

- [x] 5.1 Document / hand off (change notes only, not code): confirm GBP display name + website URL + categories/hours; after deploy, Search Console URL Inspection on `/` + `/en/` and resubmit sitemap; decide P2 review-quote follow-up (`use-verified-review-quotes`)
