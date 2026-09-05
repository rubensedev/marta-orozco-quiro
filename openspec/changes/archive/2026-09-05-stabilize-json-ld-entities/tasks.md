# Tasks: Stabilize JSON-LD Entity IDs

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~40–80 (single-file `@graph` rewrite in SeoJsonLd) |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Stable entity IDs + WebSite/WebPage + service/FAQ graph | PR 1 | `npm run build` then grep `dist/index.html` + `dist/en/index.html` for `/#business` | Rich Results Test + Schema.org validator on `/` and `/en/` | Revert `src/components/SeoJsonLd.astro` |

## Phase 1: ID helpers and page URL alignment

- [x] 1.1 In `src/components/SeoJsonLd.astro`, import `getRelativeLocaleUrl` from `astro:i18n`; set `canonicalPageUrl` like Layout (`getRelativeLocaleUrl(locale)` + `siteOrigin`) — compare `src/layouts/Layout.astro` (read-only)
- [x] 1.2 Define `businessId` / `personId` / `websiteId` via `new URL("/#…", siteOrigin).href`; `webpageId` = `${canonicalPageUrl}#webpage`; `serviceId(id)` = `new URL(`/#service-${id}`, siteOrigin).href`; `inLanguage` = `es-ES`|`en-GB`

## Phase 2: Stable business and person entities

- [x] 2.1 Set HealthAndBeautyBusiness `@id` to `businessId`; set `url` to origin home `${siteOrigin.origin}/` (not locale pageUrl)
- [x] 2.2 Set Person `@id` to `personId`; `worksFor` → `{ "@id": businessId }`; Person `url` → origin home
- [x] 2.3 Leave NAP fields unchanged (telephone, address, geo, hours, sameAs short links) — do not rewrite street/phone/geo/hours in `shared.ts`
- [x] 2.4 Additive lock (user override): set business `hasMap` to Place-ID URL `https://www.google.com/maps/place/?q=place_id:ChIJE7KlJmBtEg0Rn-RGXchxER0` (constant in SeoJsonLd; keep goo.gl in `sameAs`)

## Phase 3: WebSite and WebPage nodes

- [x] 3.1 Add WebSite: `@id` websiteId, `url` origin `/`, `inLanguage` `["es-ES","en-GB"]`, `publisher` → businessId
- [x] 3.2 Add WebPage: `@id` webpageId, `url` canonicalPageUrl, `name`/`description` from `meta`, page `inLanguage`, `isPartOf` → websiteId, `about` + `mainEntity` → businessId

## Phase 4: Services and FAQ linkage

- [x] 4.1 On each treatment/ritual Service: set `@id` via `serviceId(treatment.id|ritual.id)`; set `provider: { "@id": businessId }`; omit Service `url`
- [x] 4.2 Keep AggregateOffer/Offer shape; do not add `offeredBy`
- [x] 4.3 When FAQ present: FAQPage `@id` = `${canonicalPageUrl}#faq`, `isPartOf` → webpageId; keep Question/Answer `mainEntity` content

## Phase 5: Build smoke and external validation

- [x] 5.1 `npm run build`; assert `dist/index.html` and `dist/en/index.html` both contain `https://martaorozcoquiro.netlify.app/#business` and `/#person` (not `/en/#business`)
- [x] 5.2 Assert both dist pages contain `#website`, `#webpage`, at least one `#service-`, and FAQ `#faq` when FAQ items exist
- [x] 5.3 Confirm `astro.config.mjs` (read-only) `site` still `https://martaorozcoquiro.netlify.app`; no Layout/config edits
- [x] 5.4 Assert both dist JSON-LD outputs contain Place ID / `hasMap` URL (`place_id:ChIJE7KlJmBtEg0Rn-RGXchxER0`)
- [ ] 5.5 Validate `/` and `/en/` with Google Rich Results Test and Schema.org validator (FAQ + business types still valid) — manual follow-up if not runnable here
