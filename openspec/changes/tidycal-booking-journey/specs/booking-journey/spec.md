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

Package/bono CTAs MUST open WhatsApp packages inquiry (`meta.whatsappBonosInquiry` / `bonosWhatsappHref` pattern). Confirm MUST NOT offer purchase-type or TidyCal bono types.

#### Scenario: Bono CTA

- GIVEN packages/bono control (Rituals/FAQ packages)
- WHEN activated
- THEN WhatsApp packages inquiry opens; no TidyCal bono URL

#### Scenario: Massage pricing-card Book with package selected

- GIVEN a massage `[data-pricing-card]` with purchase type `bono5` or `bono10` (sessions > 1)
- WHEN the card’s Book/Reservar control is activated
- THEN WhatsApp opens with the same packages-inquiry body as Rituals/FAQ bonos
- AND the booking modal MUST NOT open
- AND TidyCal MUST NOT open

#### Scenario: Massage pricing-card Book with single session

- GIVEN a massage `[data-pricing-card]` with purchase type `single`
- WHEN the card’s Book/Reservar control is activated
- THEN the booking modal opens with that treatment and selected duration (existing TidyCal path)

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

Contact, MobileBar WA, FAQ WA actions, Rituals packages, and massage pricing-card Book when a package is selected MUST be questions/bonos only; single-session booking confirm MUST use TidyCal only.

#### Scenario: WA not booking confirm

- GIVEN those WA entry points (incl. pricing-card Book with package selected)
- WHEN activated
- THEN body is questions/packages inquiry, not booking confirmation

## ADDED Requirements

### Requirement: Thank-you logo brand mark

Thank-you pages MUST show the site logo (`/assets/images/logo.svg`) as the brand mark instead of plain “MARTA OROZCO” text. Logo treatment MUST follow the Header pattern (invert/brightness) so it remains legible on the glass card. Brand MUST remain a hero-level signal above the handoff title.

#### Scenario: Logo on handoff

- GIVEN `/gracias` or `/en/thank-you`
- WHEN the glass card is inspected
- THEN the site logo image is present as the brand mark (not text-only “MARTA OROZCO”); contrast remains readable on the glass surface

### Requirement: Dark-mode handoff background

Thank-you page background MUST NOT appear brightly lit in dark theme. Gradients and fills MUST use dark-aware tokens (e.g. `--color-brand-bg-dark` / dark mixes), not light-only `--color-brand-bg`.

#### Scenario: Dark theme not bright

- GIVEN dark theme (`html.dark`)
- WHEN a thank-you route loads
- THEN the page background reads as a dark calm surface, not a light peach/cream field

### Requirement: Relax-flow pointer interaction

Thank-you background MUST include a calm “relax flow” dot field whose dots react to pointer/touch with gentle wave/ripple displacement. Implementation MUST use lightweight `requestAnimationFrame` (no heavy animation libraries). When `prefers-reduced-motion: reduce` is set, motion MUST be static or very subtle.

#### Scenario: Pointer waves

- GIVEN thank-you page with motion allowed
- WHEN the pointer or touch moves over the background
- THEN dots displace in a gentle wave/ripple response without janky heavy libraries

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce`
- WHEN thank-you loads
- THEN the dot field is static or only very subtly animated
