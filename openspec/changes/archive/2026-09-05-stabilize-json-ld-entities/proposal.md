# Proposal: Stabilize JSON-LD Entity IDs

## Intent

JSON-LD in `SeoJsonLd.astro` already covers business, person, services, offers, and FAQ, but business/person `@id`s are tied to locale page URLs, services lack stable IDs, and there is no `WebSite`/`WebPage` graph. Stabilize entity identity across locales and clarify page↔site↔business links for rich results (GitHub #8).

## Scope

### In Scope
- Stable origin-rooted `@id`s for HealthAndBeautyBusiness and Person
- `WebSite` + `WebPage` nodes with `inLanguage` for `/` and `/en/`
- Stable service `@id`s from existing treatment/ritual ids; provider/offers reference business `@id`
- Keep production origin `https://martaorozcoquiro.netlify.app`
- Validate with Rich Results / Schema.org tools

### Out of Scope
- New service landing pages
- NAP / maps URL / sameAs changes (issue #12 / trust)
- Changing `astro.config.mjs` `site` value

## Approach

Rewrite `@graph` construction in `SeoJsonLd.astro` only: origin-rooted entity IDs, add WebSite/WebPage, service fragments from shared ids, `@id` refs for provider. Layout include path stays; site origin unchanged.

## Capabilities

| Capability | Kind |
|------------|------|
| `seo-json-ld` | ADDED |

## Rollback

Revert `SeoJsonLd.astro` (and any tiny Layout helper if added).

## Open Questions

- (none blocking) — FAQPage↔WebPage linkage left to design default
