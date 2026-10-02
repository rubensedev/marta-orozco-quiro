# Proposal: Add Gift Section

## Intent

Let visitors request a gift card (tarjeta regalo) from the homepage: discover the offer between Testimonios and Contact, open a dedicated form, send a curated WhatsApp inquiry, then land on the existing thank-you route — without touching the TidyCal booking modal.

## Scope

### In Scope

- Homepage **Gift** section between Reviews and Contact (nav + mount order).
- Nav **REGALA** / **GIFT CARD**; section ids `tarjeta-regalo` / `gift-card`; `hashes.ts` pair.
- Locked ES section copy + drafted EN; mock gift-card placeholder; CTA opens **GiftModal**.
- Separate `GiftModal` (not BookingModal / not TidyCal): treatment (massages+rituals), duration, from/to names, estimated price; all required; price from same maps as booking.
- Submit → curated WA message → open WA → close modal → `/gracias` or `/en/thank-you`.
- FAQ: two locked ES items + EN; `FaqAnswerPart` action `gift` deep-link to gift section.
- Concrete ES/EN strings for nav, section, modal, WA templates, FAQ (below).

### Out of Scope

- New thank-you routes or gift-specific handoff pages.
- Softening thank-you calendar-oriented copy (optional later; see Risks).
- Real gift-card artwork / PDF generation / email delivery automation.
- Extending BookingModal with a gift mode; TidyCal changes.
- CMS or payment checkout for gift cards.

## Locked decisions

| Topic | Decision |
|-------|----------|
| Placement / nav | After Testimonios → before Contact; `REGALA` / `GIFT CARD` |
| Section ids | ES `tarjeta-regalo` · EN `gift-card`; update `hashes.ts` |
| Modal | Dedicated `GiftModal`; all fields required; pricing = booking maps |
| Fields | Treatment (massages+rituals), duration, giver, receiver, estimated price |
| Field labels (EN) | Visible + accessible: “Who is giving this gift” / “Who is receiving this gift” (same pattern as ES long labels; not From/To-only) |
| Submit handoff | Curated WA → open WA tab → close modal → existing thank-you |
| Image | Mock / placeholder only |
| FAQ | Two ES items locked; `action: "gift"` on gift-section link |
| Approach | Dedicated GiftSection + GiftModal + PageScripts gift path |

Question round: **closed** (locked — do not reopen placement/fields/thank-you/pricing).

## Draft copy (concrete strings)

### Nav

| Locale | Label | Href |
|--------|-------|------|
| ES | `REGALA` | `#tarjeta-regalo` |
| EN | `GIFT CARD` | `#gift-card` |

### Section

| Key | ES (locked) | EN |
|-----|-------------|-----|
| Title | `TARJETA REGALO` | `GIFT CARD` |
| Body | `Regala momentos especiales y sorprende con una experiencia de relajación, bienestar y cuidado personal. Consíguelo fácilmente online indicándonos el tipo de tratamiento, tu nombre y el nombre de la persona a quién va dirigido el regalo.` | `Give special moments and surprise someone with an experience of relaxation, wellbeing and personal care. Arrange it easily online by telling us the treatment type, your name and the name of the person receiving the gift.` |
| CTA | `Regalar tratamiento` | `Gift a treatment` |

### GiftModal

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

### WhatsApp body templates

- ES: `Hola Marta! Quiero una tarjeta regalo. Tratamiento: {treatment}. Duración: {duration}. De: {from}. Para: {to}. Precio estimado: {price}.`
- EN: `Hello Marta! I would like a gift card. Treatment: {treatment}. Duration: {duration}. From: {from}. To: {to}. Estimated price: {price}.`

Rituals / fixed-duration: `{duration}` SHOULD use a locale-appropriate fixed marker (e.g. `Ritual` / `—`) so the template stays filled — finalize in design.

### FAQ

1. **ES Q:** ¿Tenéis tarjetas regalo?  
   **ES A:** Sí, en nuestra [sección tarjeta regalo](`action: gift`) puedes completar el formulario que se te despliega y, en cuanto tengamos los datos, te haremos llegar a tu correo un pdf con la tarjeta.  
   **EN Q:** Do you offer gift cards?  
   **EN A:** Yes. In our [gift card section](`action: gift`) you can fill in the form that opens, and once we have the details we will email you a PDF of the card.  
   Link labels: ES `sección tarjeta regalo` · EN `gift card section`.

2. **ES Q:** ¿Cuál es la caducidad de la tarjeta regalo?  
   **ES A:** La caducidad de la tarjeta regalo es de un año a partir del día de la compra.  
   **EN Q:** How long is the gift card valid?  
   **EN A:** The gift card is valid for one year from the date of purchase.

## Capabilities

### New Capabilities

- `gift-section`: homepage gift section + nav/hashes, GiftModal form/pricing, WA+thank-you handoff, FAQ `gift` action, placeholder visual.

### Modified Capabilities

- `client-reviews`: nav adjacency — `TESTIMONIOS` no longer immediately before Contact (gift item inserts between).
- `site-i18n`: gift section ids, nav, modal/section/WA/FAQ strings; `hashes.ts` ES↔EN gift pair; FAQ action union includes `gift`.

## Approach

**Dedicated GiftSection + GiftModal + PageScripts gift path** (exploration Approach 1; locked).

1. Data: `sectionIds.gift`, nav between reviews and contact, hashes, gift UI + WA templates, two FAQ items with `action: "gift"`.
2. `GiftSection.astro` — locked copy, placeholder image, CTA `data-open-gift`.
3. `GiftModal.astro` — parallel dialog; reuse `bookingOptions` + treatment/ritual price maps; all fields required.
4. `PageScripts.astro` — gift open/close, duration/price sync, WA open + thank-you assign; extend `syncBodyLock` / inert for second dialog; **do not** change TidyCal confirm path.
5. `faq.ts` + `FAQ.astro` — `gift` → `#${sectionIds.gift}` (same pattern as `packages`).
6. Reuse `/gracias` and `/en/thank-you` unchanged.

## Affected Areas

| Area | Impact |
|------|--------|
| `src/components/HomePage.astro` | Mount Gift between Reviews and Contact; mount GiftModal |
| `src/components/GiftSection.astro` | New |
| `src/components/GiftModal.astro` | New |
| `src/components/PageScripts.astro` | Gift handlers + dual-dialog body lock |
| `src/data/site/es.ts`, `en.ts` | Nav, sectionIds, gift/modal copy, FAQ, WA templates |
| `src/data/site/hashes.ts` | `tarjeta-regalo` ↔ `gift-card` |
| `src/data/site/faq.ts` | `action: "gift"` on `FaqAnswerPart` |
| `src/components/FAQ.astro` | Explicit `gift` branch |
| Thank-you routes | Unchanged (reuse only) |
| `src/components/Header.astro` | Unchanged if nav from data (verify +1 item overflow) |

## Risks

| Risk | L | Mitigation |
|------|---|------------|
| Thank-you still calendar-oriented after gift WA | Med | Accept for this change; optional minimal channel-agnostic soften later (out of scope unless approved) |
| Dual dialog body-lock / focus / Escape breaks booking | Med | Share `syncBodyLock`; regression-check BookingModal open/close |
| FAQ unknown action falls through to contact | Med | Explicit `gift` branch before fallback |
| Nav density (+1 item) | Low | Verify Header desktop + drawer |
| PR size ~400-line budget | Med | Forecast in tasks; chain PRs if needed (`ask-on-risk`) |
| Placeholder image quality | Low | CSS/SVG mock until real asset |

## Rollback Plan

Remove GiftSection/GiftModal/nav/FAQ gift items/hashes; revert PageScripts gift path and FAQ `gift` action; restore HomePage mount order (or revert feature branch). Booking/TidyCal path untouched if gift stays parallel.

## Dependencies

- `bookingOptions` + treatment/ritual price maps (same as BookingModal).
- Existing thank-you routes; WhatsApp `wa.me` number from site meta.
- FAQ answer-part renderer (`packages` deep-link pattern).
- Glass modal chrome patterns from BookingModal (copy shell, do not merge logic).

## Success Criteria

- [ ] Gift section between Testimonios and Contact; ids `tarjeta-regalo` / `gift-card`; nav REGALA / GIFT CARD; hashes map works.
- [ ] Locked ES section copy + EN drafts render; CTA opens GiftModal; placeholder image present.
- [ ] All modal fields required; price matches booking maps; rituals hide/fix duration like booking.
- [ ] Submit opens curated WA, closes modal, navigates to locale thank-you; BookingModal/TidyCal unchanged.
- [ ] Two FAQ items (ES locked + EN); gift FAQ answer link targets gift section via `action: "gift"`.
- [ ] `npx astro check` clean after apply.

## Approval

**Ready for user approval.** Please approve this proposal (locked strings + approach) before `sdd-spec` + `sdd-design` run in parallel.
