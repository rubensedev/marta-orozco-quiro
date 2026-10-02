# Delta for Site-i18n

## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: English section anchors

EN pages MUST use English section ids (at least `#about`, `#massages`, `#packages`, `#gift-card`, `#contact`). Nav hrefs MUST match those ids.
(Previously: EN required anchors listed about/massages/packages/contact only — no gift-card.)

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
(Previously: WA allowed only questions/packages; no gift-card inquiry channel.)

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
(Previously: Exceptions covered booking-channel updates only; gift-channel copy was not allowed.)

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
(Previously: WA described only as questions or packages.)

#### Scenario: FAQ meta MobileBar

- GIVEN FAQ booking answer, meta, MobileBar WA/Book
- WHEN inspected
- THEN booking points to site/calendar not WA; WA ≠ Book label

#### Scenario: Gift FAQ does not claim WA booking

- GIVEN the gift FAQ items
- WHEN answers are read
- THEN they do not instruct visitors to book a session via WhatsApp
- AND they describe the gift-card request / PDF delivery path instead
