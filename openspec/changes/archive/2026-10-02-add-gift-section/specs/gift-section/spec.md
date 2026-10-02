# Gift-Section Specification

## Purpose

Homepage gift-card offer between Reviews and Contact: locale nav/hashes, locked section copy with placeholder visual, dedicated GiftModal (parallel to BookingModal), curated WhatsApp inquiry plus existing thank-you handoff, and FAQ gift deep-link — without TidyCal or BookingModal merge.

## Requirements

### Requirement: Section placement between reviews and contact

The homepage MUST render the gift section after client-reviews and before Contact in DOM mount order. The Spanish section root MUST expose `id="tarjeta-regalo"`. The English section root MUST expose `id="gift-card"`.

#### Scenario: DOM order Reviews → Gift → Contact

- GIVEN the homepage is rendered (ES or EN)
- WHEN section order is inspected
- THEN client-reviews appears before the gift section
- AND the gift section appears before Contact
- AND no other homepage section is mounted between gift and Contact

#### Scenario: Locale section ids

- GIVEN `/` is rendered
- WHEN the gift section root is inspected
- THEN it has `id="tarjeta-regalo"`
- AND GIVEN `/en/` is rendered
- WHEN the gift section root is inspected
- THEN it has `id="gift-card"`

### Requirement: Navigation entry REGALA / GIFT CARD

Locale `navItems` MUST include a gift item immediately after the reviews item and immediately before Contact. Spanish MUST use label `REGALA` and href `#tarjeta-regalo`. English MUST use label `GIFT CARD` and href `#gift-card`. Header MUST surface the item via `navItems` only (desktop and mobile/drawer).

#### Scenario: ES nav order and target

- GIVEN Spanish `navItems` is loaded
- WHEN the list is read in order
- THEN an item with label `REGALA` and href `#tarjeta-regalo` appears immediately after the reviews item
- AND that item appears immediately before Contact
- AND activating it targets `#tarjeta-regalo`

#### Scenario: EN nav order and target

- GIVEN English `navItems` is loaded
- WHEN the list is read in order
- THEN an item with label `GIFT CARD` and href `#gift-card` appears immediately after the reviews item
- AND that item appears immediately before Contact
- AND activating it targets `#gift-card`

### Requirement: Gift hash pair for locale switcher

The ES↔EN hash map MUST include the bidirectional pair `tarjeta-regalo` ↔ `gift-card` so locale switching with a gift-section hash remaps correctly.

#### Scenario: ES gift hash maps to EN

- GIVEN a Spanish URL whose hash is `tarjeta-regalo` and JS is enabled
- WHEN the visitor switches to English via the locale control
- THEN navigation targets the English locale URL with hash `gift-card`

#### Scenario: EN gift hash maps to ES

- GIVEN an English URL whose hash is `gift-card` and JS is enabled
- WHEN the visitor switches to Spanish via the locale control
- THEN navigation targets the Spanish locale URL with hash `tarjeta-regalo`

### Requirement: Locked section copy and placeholder visual

The gift section MUST render locked locale title, body, and CTA strings from the approved proposal. The section MUST include a mock/placeholder gift-card visual (CSS/SVG or equivalent). The section MUST NOT require real gift-card artwork, PDF generation, or payment checkout.

| Key | ES (locked) | EN |
|-----|-------------|-----|
| Title | `TARJETA REGALO` | `GIFT CARD` |
| Body | `Regala momentos especiales y sorprende con una experiencia de relajación, bienestar y cuidado personal. Consíguelo fácilmente online indicándonos el tipo de tratamiento, tu nombre y el nombre de la persona a quién va dirigido el regalo.` | `Give special moments and surprise someone with an experience of relaxation, wellbeing and personal care. Arrange it easily online by telling us the treatment type, your name and the name of the person receiving the gift.` |
| CTA | `Regalar tratamiento` | `Gift a treatment` |

#### Scenario: ES section copy locked

- GIVEN `/` gift section is visible
- WHEN title, body, and CTA are read
- THEN they match the locked ES strings verbatim

#### Scenario: EN section copy present

- GIVEN `/en/` gift section is visible
- WHEN title, body, and CTA are read
- THEN they match the approved EN draft strings verbatim

#### Scenario: Placeholder visual present

- GIVEN the gift section is visible
- WHEN media in the section is inventoried
- THEN a placeholder gift-card visual is present
- AND the section does not depend on a production gift-card image asset

### Requirement: Section CTA opens GiftModal

The gift section primary CTA MUST open the dedicated GiftModal (not BookingModal). Opening GiftModal MUST NOT open TidyCal and MUST NOT open BookingModal.

#### Scenario: CTA opens gift dialog only

- GIVEN the gift section CTA is available
- WHEN the visitor activates it
- THEN GiftModal opens
- AND BookingModal remains closed
- AND no TidyCal URL opens

### Requirement: GiftModal fields all required

GiftModal MUST collect treatment (massages and rituals from the same options list as booking), duration (when applicable), giver name, receiver name, and estimated price. All of those fields MUST be required before submit succeeds. Visible and accessible labels MUST use the locked strings below (EN giver/receiver MUST be the full “Who is …” forms, not From/To-only).

| Key | ES | EN |
|-----|----|-----|
| Title | `Regalar tratamiento` | `Gift a treatment` |
| Treatment | `Tratamiento deseado` | `Treatment desired` |
| Duration | `Duración` | `Duration` |
| Giver | `Quién lo regala` | `Who is giving this gift` |
| Receiver | `Quién lo recibe` | `Who is receiving this gift` |
| Price | `Precio estimado` | `Estimated price` |
| Submit | `Solicitar tarjeta regalo` | `Request gift card` |
| Close aria | `Cerrar modal de regalo` | `Close gift modal` |

GiftModal MUST be a separate dialog from BookingModal. The system MUST NOT merge gift fields into BookingModal and MUST NOT add a gift mode to BookingModal.

#### Scenario: Required fields block empty submit

- GIVEN GiftModal is open with one or more required fields empty
- WHEN the visitor attempts submit
- THEN submit does not complete the WhatsApp handoff
- AND the visitor remains on the homepage with GiftModal still available to correct input

#### Scenario: Labels match locked strings

- GIVEN GiftModal is open on `/` or `/en/`
- WHEN field labels, title, submit, and close accessible name are inspected
- THEN they match the locked locale strings for that language
- AND EN giver/receiver labels are the full “Who is giving/receiving this gift” forms

#### Scenario: Separate from BookingModal

- GIVEN GiftModal markup and behavior
- WHEN compared to BookingModal
- THEN gift uses a distinct dialog identity
- AND BookingModal is not extended with gift-only fields or a gift mode

### Requirement: Pricing and ritual duration parity with booking

GiftModal estimated price MUST use the same treatment and ritual price maps as the booking journey. For massage treatments, duration MUST be selectable and price MUST follow the selected duration tier. For fixed rituals, duration MUST be hidden or fixed as in booking, and price MUST use the ritual fixed price.

#### Scenario: Massage price matches booking maps

- GIVEN GiftModal with a massage treatment and duration selected
- WHEN estimated price is shown
- THEN the displayed price equals the booking journey price for that treatment id and duration

#### Scenario: Ritual hides duration and uses fixed price

- GIVEN GiftModal with a fixed ritual selected
- WHEN controls and price are inspected
- THEN duration is hidden or non-editable as in booking
- AND estimated price equals the booking journey ritual fixed price

### Requirement: Curated WhatsApp then thank-you handoff

Valid GiftModal submit MUST build a curated WhatsApp body from the locked locale templates, open WhatsApp in a new tab (or equivalent WA handoff), close GiftModal, and navigate the current tab to the existing locale thank-you route (`/gracias` or `/en/thank-you`). Submit MUST NOT open TidyCal, MUST NOT resolve calendar URLs, and MUST NOT create new thank-you routes.

Locked WhatsApp body templates:

- ES: `Hola Marta! Quiero una tarjeta regalo. Tratamiento: {treatment}. Duración: {duration}. De: {from}. Para: {to}. Precio estimado: {price}.`
- EN: `Hello Marta! I would like a gift card. Treatment: {treatment}. Duration: {duration}. From: {from}. To: {to}. Estimated price: {price}.`

When a ritual (fixed duration) is selected, `{duration}` MUST be filled with a locale-appropriate fixed marker so the template remains complete (exact marker MAY be finalized in design).

#### Scenario: Successful gift handoff

- GIVEN GiftModal with all required fields valid on `/` or `/en/`
- WHEN the visitor submits
- THEN a WhatsApp URL opens with the curated locale body including treatment, duration marker, giver, receiver, and estimated price
- AND GiftModal closes
- AND the current tab navigates to `/gracias` (ES) or `/en/thank-you` (EN)

#### Scenario: No TidyCal on gift submit

- GIVEN GiftModal with valid input
- WHEN submit completes
- THEN no TidyCal or calendar booking URL opens
- AND BookingModal confirm behavior is unchanged

#### Scenario: Ritual duration placeholder filled

- GIVEN GiftModal with a fixed ritual selected and other fields valid
- WHEN the curated WhatsApp body is built
- THEN the `{duration}` slot is not empty
- AND it uses a locale-appropriate fixed marker

### Requirement: Dual-dialog body lock safety

When GiftModal is open, page body lock / inert behavior MUST keep the rest of the page non-interactive as for BookingModal. Opening or closing GiftModal MUST NOT break BookingModal open/close, Escape, or body-lock behavior.

#### Scenario: Gift open locks page

- GIVEN GiftModal opens from the gift CTA
- WHEN the visitor interacts with background page controls
- THEN those controls are inert or otherwise non-interactive while GiftModal is open

#### Scenario: Booking modal still works after gift

- GIVEN GiftModal was opened and then closed
- WHEN the visitor opens BookingModal
- THEN BookingModal opens and closes normally
- AND body lock / Escape behave as before this change

### Requirement: FAQ gift items and deep-link action

Locale FAQ data MUST include exactly these two gift items (ES locked; EN as approved drafts). The first answer MUST include a link part with `action: "gift"` whose visible labels are ES `sección tarjeta regalo` and EN `gift card section`. FAQ rendering MUST resolve `action: "gift"` to `#tarjeta-regalo` on `/` and `#gift-card` on `/en/` (same deep-link pattern as packages). Unknown actions MUST NOT silently treat `gift` as contact.

1. ES Q: `¿Tenéis tarjetas regalo?`  
   ES A: `Sí, en nuestra [sección tarjeta regalo](action: gift) puedes completar el formulario que se te despliega y, en cuanto tengamos los datos, te haremos llegar a tu correo un pdf con la tarjeta.`  
   EN Q: `Do you offer gift cards?`  
   EN A: `Yes. In our [gift card section](action: gift) you can fill in the form that opens, and once we have the details we will email you a PDF of the card.`

2. ES Q: `¿Cuál es la caducidad de la tarjeta regalo?`  
   ES A: `La caducidad de la tarjeta regalo es de un año a partir del día de la compra.`  
   EN Q: `How long is the gift card valid?`  
   EN A: `The gift card is valid for one year from the date of purchase.`

#### Scenario: Two FAQ items present

- GIVEN locale FAQ data for ES and EN
- WHEN gift-related items are inspected
- THEN both questions and answers match the locked/approved strings above

#### Scenario: Gift action deep-links gift section

- GIVEN the first gift FAQ answer is rendered on `/` or `/en/`
- WHEN the gift-section link is activated
- THEN navigation targets `#tarjeta-regalo` (ES) or `#gift-card` (EN)
- AND the link does not fall through to `#contact`

#### Scenario: Gift action is explicit in the union

- GIVEN FAQ answer-part action typing and FAQ link rendering
- WHEN `action: "gift"` is processed
- THEN it is a supported action distinct from `packages` and `contact`
