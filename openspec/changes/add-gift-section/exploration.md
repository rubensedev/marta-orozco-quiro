## Exploration: add-gift-section

### Current State

Bilingual Astro 7 + Tailwind 4 landing. Homepage mount order today:

`Hero → About → Massages → Rituals → Packages → FAQ → Reviews → Contact`

**Booking channel (TidyCal — do not conflate with gift)**

1. CTAs `data-open-booking` open `#bookingModal` (`BookingModal.astro`).
2. Modal fields: treatment (`bookingOptions`) + massage duration (rituals hide duration, fixed price).
3. Price estimate from `treatments` / `rituals` maps in `PageScripts.astro`.
4. Confirm → `resolveTidycalUrl` → `window.open(tidycal)` + `location.assign(thankYouPath)` (`/gracias` | `/en/thank-you`).

**Bonos / packages WA pattern (closest gift handoff cousin)**

- Static curated body: `meta.whatsappBonosInquiry` → `wa.me/...`.
- Pricing-card Book with `sessions > 1` opens WA only (no modal, no thank-you).
- Gift differs: curated **dynamic** body from form fields + **then** navigate to existing thank-you (like booking confirm’s current-tab handoff, but WA tab instead of TidyCal).

**FAQ actions** (`src/data/site/faq.ts`)

`booking | maps | contact | packages | whatsapp | whatsappPackages` — `packages` deep-links `#${sectionIds.packages}`; unknown actions fall through to `#contact` in `FAQ.astro`.

**Nav / hashes**

- `navItems` in `es.ts` / `en.ts`; Header consumes list (desktop + drawer).
- `hashes.ts`: `HASH_ES_TO_EN` / reverse for locale switcher — gift slug pair must be added.
- No gift/tarjeta content exists today (grep clean).

**Active vs archive**

- `openspec/changes/tidycal-booking-journey/` — **absent** (no stale active folder).
- Archive only: `openspec/changes/archive/2026-09-06-tidycal-booking-journey/`.
- Main booking spec: `openspec/specs/booking-journey/spec.md`.

**Thank-you pages**

- Shared `ThankYouPage.astro`; copy currently assumes **calendar** opened in another tab. Locked: reuse routes — no gift-specific thank-you. Softening copy (channel-agnostic) is a design follow-up, not a new route.

### Prior art map

| Concern | Prior art | Gift use |
|---------|-----------|----------|
| Treatment dropdown | `bookingOptions` in `getSite()` / `BookingModal` | Same options list |
| Duration + price | `syncBookingFieldVisibility` / `updateModalPriceEstimate` | Same rules (massage tiers; ritual fixed) |
| Modal chrome | `BookingModal.astro` + `.booking-modal` glass | Parallel dialog, not same `#bookingModal` |
| Open/close + body lock | `PageScripts` `dialog` + `syncBodyLock` / inert | Second dialog must participate in lock/inert |
| WA curated message | Bonos static `whatsappBonosInquiry` | Dynamic gift template strings (ES/EN) |
| Post-handoff page | Booking: TidyCal tab + thank-you | Gift: WA tab + same thank-you |
| Section + nav + hash | Reviews / Packages pattern | Insert Reviews → Gift → Contact |
| FAQ deep-link | `action: "packages"` | New `action: "gift"` → `#sectionIds.gift` |
| FAQPage JSON-LD | `faqAnswerText` + SeoJsonLd | New items flatten via existing helper |

### Suggested slug / nav ids

| Locale | `sectionIds.gift` | Nav label (draft) |
|--------|-------------------|-------------------|
| ES | `tarjeta-regalo` | `REGALA` |
| EN | `gift-card` | `GIFT CARD` |

Hash map: `"tarjeta-regalo": "gift-card"`.

### Draft copy (EN + ES labels)

**Section (ES locked)**

- Heading: `TARJETA REGALO`
- Body: `Regala momentos especiales y sorprende con una experiencia de relajación, bienestar y cuidado personal. Consíguelo fácilmente online indicándonos el tipo de tratamiento, tu nombre y el nombre de la persona a quién va dirigido el regalo.`
- CTA: `Regalar tratamiento`

**Section (EN draft)**

- Heading: `GIFT CARD`
- Body: `Give special moments and surprise someone with an experience of relaxation, wellbeing and personal care. Arrange it easily online by telling us the treatment type, your name and the name of the person receiving the gift.`
- CTA: `Gift a treatment`

**Modal**

| Key | ES | EN draft |
|-----|----|----------|
| Title | Regalar tratamiento | Gift a treatment |
| Treatment | Tratamiento deseado | Treatment desired |
| Duration | Duración / tiempo | Duration |
| From | Quién lo regala | Who is giving this gift |
| To | Quién lo recibe | Who is receiving this gift |
| Price | Precio estimado | Estimated price |
| Submit | Solicitar tarjeta regalo | Request gift card |
| Close aria | Cerrar modal de regalo | Close gift modal |

**WhatsApp body (draft templates)**

- ES: `Hola Marta! Quiero una tarjeta regalo. Tratamiento: {treatment}. Duración: {duration}. De: {from}. Para: {to}. Precio estimado: {price}.`
- EN: `Hello Marta! I would like a gift card. Treatment: {treatment}. Duration: {duration}. From: {from}. To: {to}. Estimated price: {price}.`

**FAQ (ES locked; EN draft)**

1. Q ES: ¿Tenéis tarjetas regalo?  
   A ES: Sí, en nuestra sección tarjeta regalo puedes completar el formulario que se te despliega y, en cuanto tengamos los datos, te haremos llegar a tu correo un pdf con la tarjeta.  
   Link label → `action: "gift"` (e.g. “sección tarjeta regalo”).  
   EN Q: Do you offer gift cards?  
   EN A: Yes. In our gift card section you can fill in the form that opens, and once we have the details we will email you a PDF of the card.

2. Q ES: ¿Cuál es la caducidad de la tarjeta regalo?  
   A ES: La caducidad de la tarjeta regalo es de un año a partir del día de la compra.  
   EN Q: How long is the gift card valid?  
   EN A: The gift card is valid for one year from the date of purchase.

### Affected Areas

- `src/components/HomePage.astro` — mount Gift between Reviews and Contact; mount GiftModal
- `src/components/GiftSection.astro` (new) — heading, locked copy, placeholder image, CTA `data-open-gift`
- `src/components/GiftModal.astro` (new) — dialog parallel to BookingModal
- `src/components/PageScripts.astro` — gift open/close, duration/price sync, WA + thank-you; extend `syncBodyLock` for gift dialog
- `src/data/site/es.ts`, `en.ts` — `sectionIds.gift`, nav item, `gift` / `ui.giftModal` copy, FAQ items, WA templates
- `src/data/site/hashes.ts` — ES↔EN gift hashes
- `src/data/site/index.ts` — wire `gift` content into `SiteBundle` if structured separately
- `src/data/site/faq.ts` + `FAQ.astro` — add `gift` action → `#${sectionIds.gift}`
- `src/components/Header.astro` — unchanged if nav comes from data (verify overflow with +1 item)
- Thank-you routes — **no new pages**; optional later copy soften in design/propose
- Specs (later): new capability e.g. `gift-card` + MODIFIED FAQ/i18n/booking-journey channel notes
- Placeholder asset — CSS/SVG mock or empty figure; no real gift-card image

### Approaches

1. **Dedicated GiftSection + GiftModal + PageScripts gift path (recommended)**  
   Parallel dialog; reuse `bookingOptions` + treatment/ritual price maps; submit builds WA URL, `window.open` WA, close modal, `location.assign(thankYouPath)`.  
   - Pros: Clear channel split from TidyCal; matches locks; mirrors Bonos WA + booking thank-you handoff; low regression risk on booking.  
   - Cons: Some duplicated duration/price JS; second dialog in body-lock/inert.  
   - Effort: Medium

2. **Extend BookingModal with `mode=gift`**  
   Extra fields + branch submit (TidyCal vs WA).  
   - Pros: One dialog shell.  
   - Cons: Conflates channels; high regression risk; contradicts prior-art guidance.  
   - Effort: Medium–High (worse risk)

3. **Section CTA → static WA only (no modal)**  
   - Pros: Tiny.  
   - Cons: Fails locked required fields, pricing, curated dynamic message.  
   - Effort: Low (wrong fit)

### Recommendation

Use **Approach 1**.

Implementation sketch:

1. Data first: `sectionIds.gift`, nav between reviews and contact, hashes, gift UI + WA templates, 2 FAQ items with `action: "gift"`.
2. `GiftSection` + placeholder visual + CTA; `GiftModal` with all required fields.
3. PageScripts: gift handlers sharing treatment/ritual maps (thin extract optional); do not touch TidyCal confirm path.
4. FAQ.astro: explicit `gift` branch before contact fallback.
5. Reuse `/gracias` and `/en/thank-you` unchanged in this change; flag thank-you calendar wording as design note.

### FAQ action extension

```ts
action: "booking" | "maps" | "contact" | "packages" | "gift" | "whatsapp" | "whatsappPackages";
```

Render: `<a href={`#${sectionIds.gift}`}>` (same pattern as `packages`).

### Risks

- Thank-you copy still mentions calendar tab — awkward after gift WA handoff (locked reuse; soften later or accept).
- Dual-dialog body lock / focus / Escape must not break booking modal.
- Nav density (+1 item) on desktop/mobile.
- FAQ fallback today maps unknown actions to contact — forgetting `gift` branch would mis-link.
- Review budget: section + modal + scripts + i18n + FAQ may approach ~400 lines — chain if needed.
- Placeholder image quality until real asset arrives.

### Open questions

- (none — product locks cover placement, fields, pricing, WA+thank-you, FAQ ES, Regala spelling, no new thank-you route)

### Ready for Proposal

**Yes** — recommend `sdd-propose` next. Draft EN/WA strings above are starting points for proposal/design polish.
