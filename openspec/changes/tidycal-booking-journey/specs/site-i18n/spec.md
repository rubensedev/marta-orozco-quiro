# Delta for Site-i18n

## ADDED Requirements

### Requirement: Booking channel copy

FAQ, meta, modal, MobileBar MUST NOT claim WhatsApp booking. Book = reserve/TidyCal; WA = questions or packages.

#### Scenario: FAQ meta MobileBar

- GIVEN FAQ booking answer, meta, MobileBar WA/Book
- WHEN inspected
- THEN booking points to site/TidyCal not WA; WA ≠ Book label

## MODIFIED Requirements

### Requirement: Locale WhatsApp messages

`/en/` WA bodies MUST be fully English (incl. service names). `/` MUST stay Spanish. WA MUST be questions/packages only; booking confirm MUST NOT open WA; booking WA templates MUST be removed or unused.
(Previously: Assumed booking opened WhatsApp.)

#### Scenario: EN WhatsApp

- GIVEN `/en/` WA for questions or packages
- WHEN body inspected
- THEN English chrome/names; not booking confirmation

#### Scenario: ES WhatsApp

- GIVEN `/` WA for questions or packages
- WHEN body inspected
- THEN Spanish; not booking confirmation

### Requirement: Spanish copy preservation

Spanish `/` MUST NOT change except booking-channel updates (FAQ, meta, modal, MobileBar, related CTA/WA). Brand “Marta Orozco” MUST remain both locales.
(Previously: All Spanish `/` copy frozen.)

#### Scenario: ES outside booking channel

- GIVEN `/` before vs after
- WHEN non-booking-channel Spanish reviewed
- THEN wording/meaning unchanged

#### Scenario: Brand retained

- GIVEN `/` or `/en/`
- WHEN brand inspected
- THEN “Marta Orozco” remains
