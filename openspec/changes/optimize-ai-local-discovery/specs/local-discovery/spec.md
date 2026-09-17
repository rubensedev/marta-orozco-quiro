# Delta Spec: local-discovery (ADDED)

## ADDED Requirements

### Requirement: Visible NAP matches configured business info

Home pages in ES and EN MUST show name, street, postal code, locality, phone, and hours consistent with `businessInfo` / `sharedMeta` (footer and contact).

#### Scenario: Contact NAP present
- **GIVEN** a locale home page
- **WHEN** the contact/footer regions are read without JS
- **THEN** street, postal code, phone, and Thursday hours MUST be present and match shared data

### Requirement: Unique local, people-first copy (non-commodity)

Each locale home MUST include at least one block of unique local content beyond generic massage tip copy — e.g. centro-de-Sevilla context, how a session works with Marta, or arrival guidance — written for humans (Google AI guide: non-commodity content).

#### Scenario: ES has unique local block
- **GIVEN** the Spanish home page
- **WHEN** main content is read
- **THEN** there MUST be a distinct section or expanded About/FAQ content with Sevilla-specific or first-hand session detail not reducible to commodity “7 tips” text

### Requirement: Thank-you pages are not promotional index targets

Thank-you routes MUST send `noindex` (and SHOULD be omitted from the sitemap) so they do not compete with home URLs for brand/local queries.

#### Scenario: Gracias is noindex
- **GIVEN** `/gracias/` and `/en/thank-you/`
- **WHEN** response meta robots and sitemap are inspected
- **THEN** both pages MUST be `noindex` (follow optional) AND MUST NOT appear as sitemap `<loc>` entries

### Requirement: Production origin unchanged

Canonical URLs, sitemap locs, and JSON-LD `@id` roots MUST remain on `https://martaorozcoquiro.netlify.app` unless a separate origin-migration change is opened.

#### Scenario: Origin stable
- **GIVEN** this change
- **WHEN** `astro.config.mjs` `site` and emitted canonicals are checked
- **THEN** they MUST still use the Netlify production origin
