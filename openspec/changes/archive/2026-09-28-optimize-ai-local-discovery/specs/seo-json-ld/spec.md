# Delta Spec: seo-json-ld (MODIFIED)

## MODIFIED Requirements

### Requirement: Business name matches public GBP entity

The HealthAndBeautyBusiness `name` emitted in JSON-LD MUST match the agreed public Google Business Profile name for each locale policy (ES primary name aligned to GBP; EN may be a clear translation only if design locks it — default prefer same legal/trade name as GBP when possible).

#### Scenario: ES business name aligned
- **GIVEN** the agreed GBP display name
- **WHEN** `/` JSON-LD is rendered
- **THEN** HealthAndBeautyBusiness `name` MUST equal the agreed ES public name (not a divergent alternate brand string)

### Requirement: sameAs / hasMap reinforce the same Maps place

`sameAs` Maps URL and `hasMap` Place ID MUST refer to the same Google place as the on-page Maps CTA. Telephone, PostalAddress, and geo MUST remain consistent with that place.

#### Scenario: Maps identity coherent
- **GIVEN** shared maps URL and Place ID configuration
- **WHEN** JSON-LD and contact Maps links are inspected
- **THEN** they MUST resolve to the same Marta Orozco place entity

## ADDED Requirements

### Requirement: No generative-AI-only markup files

The site MUST NOT add Google-ignored AEO artifacts (e.g. `llms.txt`) as part of this change’s SEO strategy.

#### Scenario: No llms.txt requirement
- **GIVEN** this change is applied
- **WHEN** `public/` is inspected for AI-only discovery files
- **THEN** no `llms.txt` (or equivalent) MUST be required for acceptance
