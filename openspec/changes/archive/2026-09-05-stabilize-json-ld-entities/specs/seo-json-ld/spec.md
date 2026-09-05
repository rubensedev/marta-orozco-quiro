# Delta Spec: seo-json-ld

## ADDED Requirements

### Requirement: Stable business and person entity IDs

Locale home pages MUST emit the same HealthAndBeautyBusiness and Person `@id` values, rooted at the configured site origin (not the locale pathname).

#### Scenario: ES and EN share business @id
- **GIVEN** JSON-LD is rendered for `/` and `/en/`
- **WHEN** the `@graph` is inspected
- **THEN** both pages MUST include the same business `@id` and the same person `@id`

### Requirement: WebSite and WebPage nodes

Each locale home page MUST include a `WebSite` node and a `WebPage` node with BCP-47 `inLanguage` aligned to sitemap i18n (`es-ES` / `en-GB`), linking the page to the site and business entities.

#### Scenario: Graph includes site and page
- **GIVEN** JSON-LD is rendered for a locale home page
- **WHEN** the `@graph` is inspected
- **THEN** a `WebSite` and a `WebPage` MUST be present with valid `@id` refs to each other and to the business entity as designed

### Requirement: Stable service IDs and business provider refs

Each treatment and ritual Service MUST have a stable origin-rooted `@id` derived from its shared data `id`, and MUST reference the business entity via `@id` (not an inline provider-by-name only).

#### Scenario: Services reference business
- **GIVEN** treatments and rituals are present in the site bundle
- **WHEN** Service nodes are emitted
- **THEN** each Service MUST have `@id` and `provider: { "@id": <businessId> }`

### Requirement: Existing types remain valid; NAP unchanged

FAQPage and HealthAndBeautyBusiness fields already present MUST remain valid. Telephone, address, geo, opening hours, and sameAs/maps URLs MUST NOT change in this change.

#### Scenario: NAP and FAQ preserved
- **GIVEN** the updated JSON-LD graph
- **WHEN** validated externally
- **THEN** FAQ and business types still validate AND NAP/sameAs values match pre-change sharedMeta/businessInfo
