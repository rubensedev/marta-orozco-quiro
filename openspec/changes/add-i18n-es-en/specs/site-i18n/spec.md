# Site-i18n Specification

## Purpose

ES `/` + EN `/en/`: routing, content API, SEO, detection, WhatsApp, glossary.

## Requirements

### Requirement: Locale routing

System MUST expose `es` at `/` (default) and `en` at `/en/`. MUST NOT add an extra i18n library.

#### Scenario: Spanish root

- GIVEN i18n enabled
- WHEN visitor opens `/`
- THEN Spanish page is served

#### Scenario: English prefix

- GIVEN i18n enabled
- WHEN visitor opens `/en/`
- THEN British-English page is served

### Requirement: Locale content API

System MUST merge shared non-translated fields with typed `es`/`en` dictionaries. Treatments/rituals MUST keep stable cross-locale `id`s. Client maps MUST key by `id`, not locale booking labels. EN display strings MUST follow locked EN-GB glossary.

#### Scenario: Shared ids

- GIVEN same treatment in both dictionaries
- WHEN either locale loads maps
- THEN resolution uses the same `id`

#### Scenario: EN glossary copy

- GIVEN `/en/`
- WHEN titles and treatment/pack labels render
- THEN locked glossary forms are used

### Requirement: Document language, meta, and alternates

Each locale page MUST set `html lang` and title/description from active locale data. System MUST set absolute `site` and emit `hreflang`/`rel=alternate` for `es`, `en`, and `x-default`→Spanish.

#### Scenario: Locale document chrome

- GIVEN `/` or `/en/`
- WHEN document head inspected
- THEN `lang` and meta match that locale

#### Scenario: Alternates present

- GIVEN `/` or `/en/`
- WHEN alternate links inspected
- THEN `es`, `en`, and `x-default` exist; `x-default` targets Spanish

### Requirement: Preferred-language detection

Boot script MUST map Spain-related langs (`es`, `es-*`, `ca`, `gl`, `eu`)→ES else→EN when no stored preference. Explicit `localStorage` MUST win. MUST NOT redirect if URL already matches. SHOULD avoid crawler-harmful loops.

#### Scenario: Detect to Spanish

- GIVEN no preference; Spain-related lang; mismatched URL
- WHEN boot runs
- THEN redirect to Spanish

#### Scenario: Detect to English

- GIVEN no preference; non-Spain lang; mismatched URL
- WHEN boot runs
- THEN redirect to `/en/`

#### Scenario: Stored preference wins

- GIVEN explicit stored language
- WHEN boot runs
- THEN storage beats browser detection

#### Scenario: No redirect loop

- GIVEN URL already matches resolved locale
- WHEN boot runs
- THEN no redirect

### Requirement: English section anchors

EN pages MUST use English section ids (at least `#about`, `#massages`, `#packages`, `#contact`). Nav hrefs MUST match those ids.

#### Scenario: EN nav targets

- GIVEN `/en/`
- WHEN primary nav activated
- THEN scroll uses matching English section id

### Requirement: Locale WhatsApp messages

`/en/` WhatsApp bodies MUST be fully English including treatment/ritual names. `/` messages MUST remain Spanish.

#### Scenario: EN WhatsApp

- GIVEN `/en/` booking opens WhatsApp
- WHEN message inspected
- THEN names and chrome are English

#### Scenario: ES WhatsApp

- GIVEN `/` booking opens WhatsApp
- WHEN message inspected
- THEN message remains Spanish

### Requirement: Spanish copy preservation

Spanish wording/meaning on `/` MUST NOT change. Brand “Marta Orozco” MUST remain in both locales.

#### Scenario: ES unchanged

- GIVEN `/` before vs after
- WHEN Spanish copy reviewed
- THEN wording and meaning are unchanged
