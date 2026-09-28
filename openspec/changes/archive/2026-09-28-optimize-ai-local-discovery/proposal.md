# Proposal: Optimize AI / local discovery

## Intent

Raise eligibility and citation quality for generative AI search and local “masaje / massage Sevilla” answers by aligning the site entity with Google Business Profile and adding non-commodity local content — following Google’s AI optimization guide (foundational SEO + unique content + local business details; no AEO hacks).

Audit SoT: project doc `docs/ai-search-optimization-audit.md` (Agent Store).

## Scope

### In Scope
- Unify public business **name** with GBP (default: align site → `Marta Orozco Quiromasaje` unless owner decides otherwise)
- Single canonical Maps short link in `sharedMeta.mapsUrl` / `googleReviewsUrl` + JSON-LD `sameAs`
- Keep Place ID `hasMap` and NAP/geo/hours accurate; no NAP invention
- Add **1–2 unique, ES-first** people-first content blocks (EN parity) for local grounding — not a page farm
- Optional hero/H1 tighten toward entity + city (no stuffing)
- `noindex` thank-you pages; exclude `/gracias/` and `/en/thank-you/` from sitemap
- Preserve production origin `https://martaorozcoquiro.netlify.app`

### Out of Scope
- `llms.txt`, content chunking, AI-only rewrites, fake mention campaigns
- New per-treatment SEO landing pages
- Custom domain / origin migration
- AggregateRating / review schema (unless separately approved)
- GBP admin changes (categories, posts, review replies) — owner checklist only
- Implementing agentic booking protocols

## Approach

1. Data-first: change names/URLs in `src/data/site/shared.ts` (+ locale copy files); JSON-LD consumes shared fields.
2. Content: small additive sections/copy in `es.ts`/`en.ts` + minimal component wiring if a new section is required.
3. Crawl hygiene: thank-you `robots` + sitemap filter in `astro.config.mjs`.
4. Document Ruben-only GBP/Search Console checklist in change notes (not code).

## Capabilities

| Capability | Kind |
|------------|------|
| `seo-json-ld` | MODIFIED |
| `local-discovery` | ADDED |
| `site-i18n` | unchanged (verify EN parity of new copy) |

## Rollback

Revert shared name/URL fields, locale copy/sections, thank-you robots/sitemap filter, and any new section component.

## Open Questions

- Confirm final public name string (site vs GBP rename)
- Canonical Maps short link (`nS9Yng5LUJSzkG467` vs `HdZVpzvzBEGV6GAZ8`)
- Whether new content is a home section vs expanding About/FAQ only
