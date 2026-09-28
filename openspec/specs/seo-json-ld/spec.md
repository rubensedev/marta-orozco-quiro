# SEO JSON-LD Specification

## Purpose

Stable HealthAndBeautyBusiness / Person / WebSite / WebPage / Service graph rooted at the production origin, GBP-aligned entity name and Maps identity, without generative-AI-only markup files.

## Requirements

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

### Requirement: Existing types remain valid; NAP matches shared data

FAQPage and HealthAndBeautyBusiness fields MUST remain valid. Telephone, address, geo, opening hours, and sameAs/maps URLs MUST match `sharedMeta` / `businessInfo`.

#### Scenario: NAP and FAQ preserved

- **GIVEN** the JSON-LD graph
- **WHEN** validated externally
- **THEN** FAQ and business types still validate AND NAP/sameAs values match sharedMeta/businessInfo

### Requirement: Business name matches public GBP entity

The HealthAndBeautyBusiness `name` emitted in JSON-LD MUST match the agreed public Google Business Profile name. The entity name is a single locale-independent string (never translated); English descriptors belong only in descriptive slots (`Person.jobTitle`, meta/hero copy).

#### Scenario: ES business name aligned

- **GIVEN** the agreed GBP display name
- **WHEN** `/` JSON-LD is rendered
- **THEN** HealthAndBeautyBusiness `name` MUST equal the agreed public name (not a divergent alternate brand string)

#### Scenario: EN business name untranslated

- **GIVEN** the agreed GBP display name
- **WHEN** `/en/` JSON-LD is rendered
- **THEN** HealthAndBeautyBusiness `name` MUST equal the same public name string as ES

### Requirement: sameAs / hasMap reinforce the same Maps place

`sameAs` Maps URL and `hasMap` Place ID MUST refer to the same Google place as the on-page Maps CTA. Telephone, PostalAddress, and geo MUST remain consistent with that place. `addressLocality` MUST be the locale-independent string `Sevilla`.

#### Scenario: Maps identity coherent

- **GIVEN** shared maps URL and Place ID configuration
- **WHEN** JSON-LD and contact Maps links are inspected
- **THEN** they MUST resolve to the same Marta Orozco place entity

### Requirement: No generative-AI-only markup files

The site MUST NOT add Google-ignored AEO artifacts (e.g. `llms.txt`) as part of SEO strategy for local/AI discovery.

#### Scenario: No llms.txt requirement

- **GIVEN** local-discovery / seo-json-ld capabilities are applied
- **WHEN** `public/` is inspected for AI-only discovery files
- **THEN** no `llms.txt` (or equivalent) MUST be required for acceptance
