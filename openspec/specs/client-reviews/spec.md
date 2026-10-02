# Client-Reviews Specification

## Purpose

Homepage social-proof section (`#testimonios`) with mocked Spanish reviews in an infinite manual carousel, placed before the gift section (and therefore before Contact), without changing massage finite-end behavior.

## Requirements

### Requirement: Section placement and anchor

The homepage MUST render the client-reviews section after Rituals/Bonos and before the gift section (and therefore before Contact). The section root MUST expose `id="testimonios"` on Spanish pages (English reviews id unchanged if already localized elsewhere). Client-reviews MUST remain immediately before the gift section; Contact MUST NOT sit between reviews and gift.

#### Scenario: DOM order before Gift and Contact

- GIVEN the homepage is rendered
- WHEN section order is inspected
- THEN Rituals appears before client-reviews
- AND client-reviews appears immediately before the gift section
- AND the gift section appears before Contact
- AND the reviews section has `id="testimonios"` on Spanish pages

### Requirement: Navigation entry

`navItems` MUST include the reviews item (ES `{ href: "#testimonios", label: "TESTIMONIOS" }` or the EN equivalent) immediately before the gift nav item (`REGALA` / `GIFT CARD`). Header MUST surface that item in desktop and mobile nav via `navItems` only. Reviews MUST NOT be immediately before Contact after the gift item is inserted.

#### Scenario: TESTIMONIOS precedes gift nav item

- GIVEN `navItems` is loaded
- WHEN the list is read in order
- THEN the reviews item appears immediately before the gift item (`REGALA` / `GIFT CARD`)
- AND Contact appears after the gift item
- AND activating the reviews item targets the reviews section hash

### Requirement: Locked intro copy

The section MUST show title `¿Tienes dudas?` and this exact description: `Desde 2021 he acompañado a más de 1.500 personas en su camino hacia el bienestar. Estas voces cuentan cómo se sintieron después de la sesión — por si te ayuda a dar el paso.`

#### Scenario: Intro matches locked text

- GIVEN the client-reviews section is visible
- WHEN heading and description are read
- THEN the heading is `¿Tienes dudas?`
- AND the description matches the locked body verbatim

### Requirement: Review content source

Site data MUST provide at least eight invented Spanish reviews. Each MUST include `name`, `quote`, `treatmentName` (massage/ritual title), and `stars` fixed at `5`. Quotes MUST be happy/relaxed. Real-quote CMS/API is out of scope for v1.

#### Scenario: Minimum mock set

- GIVEN site review data is loaded
- WHEN the reviews collection is counted
- THEN it contains at least 8 entries
- AND every entry has name, quote, treatmentName, and stars equal to 5

### Requirement: Review card presentation

Each card MUST show exactly five yellow/amber stars, italic quote, bold reviewer name, and `treatmentName` as subtitle directly below the name. Cards MUST NOT include a Reservar or other booking button.

#### Scenario: Card anatomy

- GIVEN a review card is rendered
- WHEN its contents are inspected
- THEN five yellow stars are present
- AND quote is italic, name is bold, and treatmentName appears below the name
- AND no Reservar control appears in the card or section

### Requirement: Infinite reviews carousel without autoplay

The reviews carousel MUST support manual prev/next and drag/pointer scrolling. It MUST NOT autoplay or marquee. When content overflows, scrolling MUST loop continuously; prev/next MUST NOT hard-disable solely for reaching a logical start or end.

#### Scenario: Manual loop, no autoplay

- GIVEN the reviews carousel has overflow
- WHEN the user advances past the last real slide via next or drag
- THEN the track continues without a hard end stop
- AND no autoplay timer advances the carousel

#### Scenario: Prev never permanently stuck at start

- GIVEN the reviews carousel has overflow
- WHEN the user moves toward the first real slide via prev or drag
- THEN navigation remains usable for continued looping

### Requirement: Massage carousel finite invariant

Shared carousel reuse MUST be parameterized so reviews can be infinite while massage MUST keep finite ends (prev disabled at start, next disabled at end). Reviews MUST NOT require massage treatment-selection behavior.

#### Scenario: Massage ends still disable

- GIVEN the massage carousel is shown with overflow
- WHEN the track is at the start
- THEN prev is disabled
- AND WHEN the track is at the end
- THEN next is disabled

#### Scenario: Reviews do not drive massage selection

- GIVEN a review card is interacted with
- WHEN the user clicks or focuses the card
- THEN no massage treatment panel selection is required or triggered
