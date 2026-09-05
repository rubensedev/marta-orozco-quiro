# Apply Progress: stabilize-json-ld-entities

**Mode**: Standard (strict_tdd: false)
**Work unit**: Unit 1 — Stable entity IDs + WebSite/WebPage + service/FAQ + Place ID hasMap
**applyState at start**: ready
**Chain strategy**: pending (single PR; Low budget risk)

## Completed Tasks

- [x] 1.1 Import `getRelativeLocaleUrl`; `canonicalPageUrl` aligned with Layout
- [x] 1.2 Define `businessId` / `personId` / `websiteId` / `webpageId` / `serviceId` / `inLanguage`
- [x] 2.1 Business `@id` + `url` origin home
- [x] 2.2 Person `@id` + `worksFor` + `url` origin home
- [x] 2.3 NAP + goo.gl `sameAs` unchanged (no shared.ts NAP edits)
- [x] 2.4 `hasMap` Place-ID URL (`ChIJE7KlJmBtEg0Rn-RGXchxER0`)
- [x] 3.1 WebSite node
- [x] 3.2 WebPage node
- [x] 4.1 Service `@id` + `provider: { "@id": businessId }`; omit Service `url`
- [x] 4.2 AggregateOffer/Offer retained; no `offeredBy`
- [x] 4.3 FAQPage `@id` + `isPartOf` webpage
- [x] 5.1 `npm run build` + stable `#business` / `#person` smoke (ES+EN)
- [x] 5.2 `#website` / `#webpage` / `#service-` / `#faq` smoke
- [x] 5.3 `astro.config.mjs` site confirmed; no Layout/config edits
- [x] 5.4 Place ID / `hasMap` present in both locale dist outputs

## Remaining Tasks

- [ ] 5.5 Manual: Google Rich Results Test + Schema.org validator on `/` and `/en/`

## Work Unit Evidence

| Evidence | Value |
|---|---|
| Focused test command and exact result | `npm run build` exit 0; node smoke on `dist/index.html` + `dist/en/index.html` — all PASS for `#business`, `#person`, `#website`, `#webpage`, `#service-`, `#faq`, `place_id:ChIJE7KlJmBtEg0Rn-RGXchxER0`; absent `/en/#business` |
| Runtime harness command/scenario and exact result | N/A locally — no unit/e2e runner; Rich Results / Schema.org deferred to 5.5 manual |
| Rollback boundary | Revert `src/components/SeoJsonLd.astro` (docs under `openspec/changes/stabilize-json-ld-entities/` optional) |

## Files Changed

| File | Action | What Was Done |
|------|--------|---------------|
| `src/components/SeoJsonLd.astro` | Modified | Stable IDs, WebSite/WebPage, service/FAQ graph, Place ID `hasMap` |
| `openspec/changes/stabilize-json-ld-entities/design.md` | Modified | Place ID hasMap lock |
| `openspec/changes/stabilize-json-ld-entities/tasks.md` | Modified | 2.4/5.4 additive; checkboxes |
| `openspec/changes/stabilize-json-ld-entities/state.yaml` | Modified | apply done; next verify; Place ID locks |

## Deviations from Design

User override during apply: added Place ID → `hasMap` (design previously marked OOS). Documented in design open questions + state locks. NAP/sameAs short links still unchanged.

## Issues Found

None.

## Workload / PR Boundary

- Mode: single PR
- Current work unit: Unit 1 (complete locally except 5.5 manual)
- Boundary: SeoJsonLd-only code + change docs
- Estimated review budget impact: Low (~40–80 authored lines)

## Status

15/16 tasks complete. Ready for sdd-verify (5.5 remains manual external validation).
