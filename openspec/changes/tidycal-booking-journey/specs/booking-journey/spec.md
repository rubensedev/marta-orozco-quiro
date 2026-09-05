# Booking Journey Specification

## Purpose

Modal → TidyCal URL → new tab; WA questions/bonos; thank-you; fail-closed; no embed.

## Requirements

### Requirement: Slim booking modal

Modal MUST collect treatment + massage duration and show price; MUST NOT collect name, email, date, or purchase type. Fixed rituals MUST hide duration.

#### Scenario: Fields

- GIVEN massage or ritual selection in modal
- WHEN controls inspected
- THEN price shows; massage has duration; ritual hides duration; PII and purchase-type absent

### Requirement: TidyCal URL map

MUST resolve HTTPS URLs from `state.yaml` `url_map` for every bookable massage `(id, durationMin)` and ritual `id`, incl. `descontracturante`/80 → `masaje-descontracturante-80` and `craneo-facial`/30 → `masaje-craneofacial-30`.

#### Scenario: Resolve mapped sessions

- GIVEN mapped massage/ritual/edge slug
- WHEN confirm runs
- THEN URL matches `url_map` exactly

### Requirement: Confirm opens TidyCal then handoff page

Confirm MUST indicate TidyCal, open the resolved URL in a new tab with `noopener` (SHOULD `noreferrer`), close the modal, and navigate the current tab to the locale thank-you/handoff route (`/gracias` or `/en/thank-you`). MUST NOT open a second thank-you tab. MUST NOT rely on TidyCal paid `redirect_url`.

#### Scenario: Confirm handoff

- GIVEN mapped selection
- WHEN Confirm via TidyCal activates
- THEN TidyCal opens in a new tab with noopener; current tab goes to the locale handoff page; modal closes

### Requirement: Untargeted Book opens modal

Untargeted Book MUST open modal with default treatment. MUST NOT deep-link TidyCal profile listing.

#### Scenario: Untargeted Book

- GIVEN Book without treatment target
- WHEN activated
- THEN modal opens with default treatment selected

### Requirement: Bonos WhatsApp only

Package/bono CTAs MUST open WhatsApp packages inquiry. Confirm MUST NOT offer purchase-type or TidyCal bono types.

#### Scenario: Bono CTA

- GIVEN packages/bono control
- WHEN activated
- THEN WhatsApp packages inquiry opens; no TidyCal bono URL

### Requirement: Fail-closed URL resolve

Unmapped selections MUST NOT open guessed/profile URLs; confirm MUST disable or show non-navigating error.

#### Scenario: Missing map entry

- GIVEN unmapped selection
- WHEN confirm attempted
- THEN no guessed URL opens; visitor stays on-page

### Requirement: Bilingual handoff thank-you pages

MUST serve `/gracias` (ES) and `/en/thank-you` (EN) as calm gratitude for starting the booking (not a false “booked” claim). MUST include home + WhatsApp. Copy MUST acknowledge the calendar opened in another tab.

#### Scenario: Thank-you routes

- GIVEN `/gracias` or `/en/thank-you`
- WHEN loaded
- THEN locale-matched handoff gratitude, home link, and WhatsApp are served

### Requirement: No embed in v1

MUST NOT embed TidyCal (iframe/`tidycal-embed`).

#### Scenario: No embed markup

- GIVEN booking UI
- WHEN markup inspected
- THEN no TidyCal embed required

### Requirement: Channel split

Contact, MobileBar WA, FAQ WA actions, Rituals packages MUST be questions/bonos only; booking confirm MUST use TidyCal only.

#### Scenario: WA not booking confirm

- GIVEN those WA entry points
- WHEN activated
- THEN body is questions/packages inquiry, not booking confirmation
