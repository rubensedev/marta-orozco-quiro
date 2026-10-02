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

Boot script MUST map Spain-related langs (`es`, `es-*`, `ca`, `gl`, `eu`)→ES else→EN when no stored preference. Explicit `localStorage` MUST win. MUST NOT redirect if URL already matches. SHOULD avoid crawler-harmful loops. When the document shell opts in with `skipLocaleRedirect`, the boot script MUST NOT perform preferred-locale redirects (so static 404 URLs are not replaced by `/` or `/en/`).

#### Scenario: Detect to Spanish

- GIVEN no preference; Spain-related lang; mismatched URL
- WHEN boot runs without skipLocaleRedirect
- THEN redirect to Spanish

#### Scenario: Detect to English

- GIVEN no preference; non-Spain lang; mismatched URL
- WHEN boot runs without skipLocaleRedirect
- THEN redirect to `/en/`

#### Scenario: Stored preference wins

- GIVEN explicit stored language
- WHEN boot runs without skipLocaleRedirect
- THEN storage beats browser detection

#### Scenario: No redirect loop

- GIVEN URL already matches resolved locale
- WHEN boot runs
- THEN no redirect

#### Scenario: 404 skips locale redirect

- GIVEN the 404 shell with `skipLocaleRedirect`
- AND a preferred locale that would normally mismatch the preserved URL
- WHEN boot runs
- THEN no preferred-locale redirect occurs
- AND the missing-path URL is preserved

### Requirement: Gift section ids and hash pair

Locale dictionaries MUST expose `sectionIds.gift` as `tarjeta-regalo` (ES) and `gift-card` (EN). The ES↔EN hash map MUST include the bidirectional pair `tarjeta-regalo` ↔ `gift-card`.

#### Scenario: sectionIds.gift per locale

- GIVEN Spanish and English site dictionaries
- WHEN `sectionIds.gift` is read
- THEN ES is `tarjeta-regalo` and EN is `gift-card`

#### Scenario: Gift hashes remap both ways

- GIVEN the hash map used by the locale switcher
- WHEN `tarjeta-regalo` or `gift-card` is remapped
- THEN each resolves to the other locale’s gift section id

### Requirement: Gift UI and FAQ copy dictionaries

Locale dictionaries MUST expose gift section, GiftModal, and gift WhatsApp template strings for ES and EN matching the approved proposal (locked ES section/FAQ; approved EN drafts; locked modal labels including full EN giver/receiver forms). FAQ answer-part actions MUST include `gift` alongside existing actions.

#### Scenario: Gift dictionary keys present

- GIVEN `es` and `en` site dictionaries
- WHEN gift section, GiftModal, and gift WhatsApp template strings are inspected
- THEN required keys exist in both locales
- AND values match the approved proposal copy

#### Scenario: FAQ action union includes gift

- GIVEN FAQ answer-part typing and data
- WHEN actions are inventoried
- THEN `gift` is a supported action
- AND gift FAQ link labels use ES `sección tarjeta regalo` and EN `gift card section`

### Requirement: English section anchors

EN pages MUST use English section ids (at least `#about`, `#massages`, `#packages`, `#gift-card`, `#contact`). Nav hrefs MUST match those ids.

#### Scenario: EN nav targets

- GIVEN `/en/`
- WHEN primary nav activated
- THEN scroll uses matching English section id

#### Scenario: EN gift anchor

- GIVEN `/en/`
- WHEN the gift nav item or gift section is inspected
- THEN the section id and href use `gift-card`

### Requirement: Locale WhatsApp messages

`/en/` WA bodies MUST be fully English (incl. service names). `/` MUST stay Spanish. WA MUST be questions, packages, or curated gift-card inquiry only; booking confirm MUST NOT open WA; booking WA templates MUST be removed or unused. Gift curated templates MUST follow the locked ES/EN gift body strings and MUST NOT impersonate booking confirmation.

#### Scenario: EN WhatsApp

- GIVEN `/en/` WA for questions, packages, or gift inquiry
- WHEN body inspected
- THEN English chrome/names; not booking confirmation

#### Scenario: ES WhatsApp

- GIVEN `/` WA for questions, packages, or gift inquiry
- WHEN body inspected
- THEN Spanish; not booking confirmation

#### Scenario: Gift inquiry is not booking confirm

- GIVEN a gift-modal WhatsApp handoff on `/` or `/en/`
- WHEN the body is inspected
- THEN it matches the curated gift template for that locale
- AND it is not a booking-confirmation message

### Requirement: Spanish copy preservation

Spanish `/` MUST NOT change except booking-channel updates (FAQ, meta, modal, MobileBar, related CTA/WA) and approved gift-channel additions (gift section, GiftModal, gift WA templates, gift FAQ items, gift nav/hash). Brand “Marta Orozco” MUST remain both locales.

#### Scenario: ES outside booking and gift channels

- GIVEN `/` before vs after
- WHEN Spanish outside booking-channel and gift-channel surfaces is reviewed
- THEN wording/meaning unchanged

#### Scenario: Brand retained

- GIVEN `/` or `/en/`
- WHEN brand inspected
- THEN “Marta Orozco” remains

### Requirement: Booking channel copy

FAQ, meta, modal, MobileBar MUST NOT claim WhatsApp booking. Book = reserve/calendar; WA = questions, packages, or curated gift-card inquiry (gift is not a booking confirm). Gift FAQ copy MAY describe completing the gift form and receiving a PDF by email without claiming WhatsApp as the booking channel.

#### Scenario: FAQ meta MobileBar

- GIVEN FAQ booking answer, meta, MobileBar WA/Book
- WHEN inspected
- THEN booking points to site/calendar not WA; WA ≠ Book label

#### Scenario: Gift FAQ does not claim WA booking

- GIVEN the gift FAQ items
- WHEN answers are read
- THEN they do not instruct visitors to book a session via WhatsApp
- AND they describe the gift-card request / PDF delivery path instead

### Requirement: Modal UI copy without vendor name

Modal `intro` and `submit` (ES+EN) MUST NOT contain the vendor name “TidyCal”. Intro MUST describe selecting treatment/duration and confirming to open the calendar. Submit MUST be “Confirmar reserva” (ES) / “Confirm booking” (EN). FAQ/meta strings that still mention TidyCal are deferred optional (out of Phase 7 modal scope).

#### Scenario: Vendor-free modal strings

- GIVEN `ui.modal.intro` and `ui.modal.submit` in `es.ts` / `en.ts`
- WHEN inspected
- THEN no “TidyCal” substring; submit matches Confirmar reserva / Confirm booking

### Requirement: 404 locale resolution

For the static 404 experience, the active UI locale MUST be resolved client-side from the preserved pathname: paths under `/en` (prefix `/en…`) MUST use English; otherwise Spanish. When the pathname has no `/en` prefix, the system MAY honor an explicit preferred-locale value in `marta-orozco-locale` localStorage (preferred EN → English UI). Anti-FOUC measures SHOULD prevent a wrong-locale flash. Static meta MAY default to one locale when dual-head is impractical.

#### Scenario: English from /en pathname

- GIVEN a missing URL whose pathname starts with `/en`
- WHEN the 404 UI resolves locale
- THEN English copy and CTAs are shown

#### Scenario: Spanish default without /en

- GIVEN a missing URL whose pathname does not start with `/en`
- AND no preferred EN in `marta-orozco-locale`
- WHEN the 404 UI resolves locale
- THEN Spanish copy and CTAs are shown

#### Scenario: Stored EN when path has no /en prefix

- GIVEN a missing URL whose pathname does not start with `/en`
- AND `marta-orozco-locale` prefers English
- WHEN the 404 UI resolves locale
- THEN English copy and CTAs are shown

### Requirement: Not-found UI copy dictionaries

Locale dictionaries MUST expose `ui.notFound` strings for ES and EN covering meta title/description, soft `h1`, body, and primary CTA label. WhatsApp labels on 404 MUST reuse existing thank-you WhatsApp label fields. EN forms MUST follow the locked EN-GB glossary where applicable.

#### Scenario: ES and EN notFound keys present

- GIVEN `es` and `en` site dictionaries
- WHEN `ui.notFound` is inspected
- THEN title, message, primary CTA, and meta fields exist in both locales
- AND values match the locked proposal copy
