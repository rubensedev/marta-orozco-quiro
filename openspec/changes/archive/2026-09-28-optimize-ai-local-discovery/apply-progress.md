# Apply Progress: optimize-ai-local-discovery

**Status at archive**: complete (18/18 tasks; 2.6 closed nothing-to-add)  
**Implementation commit**: `c8c1fc6` — `feat(seo): align GBP entity and improve AI local discovery`  
**Branch**: `feat-fixes-and-improvements` (ahead of origin by 1 at archive; push left to orchestrator/user)

## Shipped

| Track | Evidence |
|-------|----------|
| Entity alignment | `businessInfo.name` = `Marta Orozco Quiromasaje`; `addressLocality` = `Sevilla`; `MAPS_PLACE_URL` + `googlePlaceId` in `shared.ts`; SeoJsonLd consumes without `[locale]` |
| Unique local content | About +2 (session-flow + NAP grounding); FAQ + session item; **no arrival FAQ** (2.6 closed nothing-to-add) |
| Crawl hygiene | thank-you `noindex, follow`; sitemap filter excludes `/gracias` and `/en/thank-you` |
| Verified Google reviews (supersedes design P2 for on-site quotes) | `gbp-01`…`gbp-06` prepended ES/EN; 3 mocks removed; **no** `Review`/`AggregateRating` JSON-LD |
| Owner notes | `OWNER.md` GBP/Search Console checklist; P2 on-site quotes marked done |

## Phase 4 gates (apply-time verification; no formal verify-report)

- `npm run check`: 0 errors, 0 warnings, 4 pre-existing hints
- `npm run build`: success; `site` origin unchanged
- JSON-LD both locales: name + Sevilla + place_id + Maps short link `HdZVpzvzBEGV6GAZ8`
- Robots: thank-you `noindex, follow`; home `index, follow`
- Sitemap: locs `/` and `/en/` only
- AEO: no `llms.txt`; no AggregateRating/Review schema

## Deferred / closed

- **2.6**: CLOSED — owner confirmed nothing to add for arrival About/FAQ (Engram #536 still says deferred — **stale**; superseded by #534 + tasks.md)
- Arrival copy: do not reopen product code

## Issues

None open for this change. Residual: main `client-reviews` spec still describes “invented” mocks (no delta in this change; follow-up if desired).
