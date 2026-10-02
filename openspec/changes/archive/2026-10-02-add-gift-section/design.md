# Design: Add Gift Section

## Technical Approach

Ship a **parallel gift channel** beside the existing TidyCal booking journey: homepage `GiftSection` (Reviews → Gift → Contact) + dedicated `GiftModal` + PageScripts gift handlers that reuse `bookingOptions` / `treatmentMap` / `ritualMap` for duration visibility and price estimates, then hand off via curated WhatsApp + existing thank-you routes. Maps locked proposal Approach 1 / capability `gift-section`; does not merge into `BookingModal` or touch TidyCal confirm.

Specs (parallel `sdd-spec`) own MUST/SHOULD scenarios; this doc owns HOW — file layout, copy keys, dual-dialog lock, WA interpolation, FAQ wiring, placeholder visual, PR sizing.

## Architecture Decisions

### Decision: Dedicated modal + script path (not BookingModal mode)

**Choice**: New `GiftModal.astro` (`#giftModal`) + gift-specific handlers in `PageScripts.astro`; reuse glass chrome classes (`.booking-modal`, `.booking-field-group`, `.booking-price-card`) and shared maps; keep BookingModal / `resolveTidycalUrl` submit path untouched.

**Alternatives considered**: (A) `mode=gift` on BookingModal; (B) section CTA → static WA only.

**Rationale**: Locked proposal. (A) conflates TidyCal + WA and raises booking regression risk. (B) cannot collect required fields or dynamic message. Glass class reuse avoids growing `global.css` allow-list for ordinary layout.

### Decision: Ritual WA `{duration}` = concrete minutes always

**Choice**: For rituals, UI still hides the duration `<select>` (same as booking). WA `{duration}` always interpolates **concrete minutes** from `ritual.duration` (or the hidden option value), formatted like massages: `{n} {minutesSuffix}` (e.g. `90 minutos` / `90 minutes`). No bare `Ritual` / `—` marker.

**Alternatives considered**: Locale marker `Ritual`/`Rituale`; em dash `—`; omit duration token for rituals.

**Rationale**: Ops get actionable length in WhatsApp without opening the site maps; template stays fully filled; matches data already written into the hidden option in booking’s `syncBookingFieldVisibility`.

### Decision: Placeholder = inline SVG mock (no asset file)

**Choice**: Decorative inline SVG gift-card mock inside `GiftSection` (Tailwind + current brand tokens / `currentColor`). `aria-hidden="true"` on decorative SVG; optional short `gift.imageAlt` only if a meaningful non-decorative figure wrapper is used (prefer decorative + section copy carries meaning).

**Alternatives considered**: Empty figure; CSS-only abstract shapes; commit a raster/webp placeholder under `src/assets`.

**Rationale**: Locked “mock only”; no asset pipeline churn; dark mode via CSS tokens; easy swap later for real artwork without changing section structure.

### Decision: Dual-dialog body lock — OR open state; mutual exclusion; native Escape

**Choice**:
1. Extend `syncBodyLock` to `isNavOpen() || Boolean(bookingDialog?.open) || Boolean(giftDialog?.open)`.
2. Opening gift closes booking (and vice versa) before `showModal()` — never both open.
3. Rely on native `<dialog showModal()>` Escape/focus trap for each dialog (booking today does **not** call `setPageInert` on open; gift matches that parity). Mobile-nav `setPageInert` stays nav-only.
4. Backdrop click + `[data-close-gift]` mirror booking’s close pattern; listen `close` on gift dialog to `syncBodyLock`.
5. Document-level Escape handler stays nav/theme/lang only (unchanged); do not double-close dialogs in that handler.

**Alternatives considered**: Page `inert` whenever any modal open; shared abstracted Modal controller; allow both dialogs open.

**Rationale**: Minimal diff to proven booking path; OR-ing lock fixes scroll when gift is open; mutual exclusion avoids stacked dialogs / inert races; inventing inert for gift alone would diverge from booking a11y without a booking fix (out of scope).

### Decision: WA handoff sequence mirrors booking confirm shape

**Choice** on valid submit:
1. Build message from locale template + field values (treatment **label** text, duration string, giver, receiver, price display).
2. `window.open(wa.me/…?text=…, "_blank", "noopener,noreferrer")`.
3. Close gift modal + `syncBodyLock`.
4. `location.assign(thankYouPath)` (`/gracias` | `/en/thank-you`).

**Alternatives considered**: WA only (no thank-you); thank-you then WA; new gift thank-you page.

**Rationale**: Locked reuse of thank-you; same tab pattern as TidyCal confirm (external tab + current-tab handoff). Thank-you calendar wording remains known awkwardness — **non-goal** this change.

### Decision: FAQ `gift` action = packages-style hash deep-link

**Choice**: Extend `FaqAnswerPart.action` with `"gift"`; `FAQ.astro` branch before contact fallback → `<a href={`#${sectionIds.gift}`}>`. Section CTA uses `data-open-gift` (opens modal); FAQ link only scrolls to section (user opens modal via CTA) — matches packages deep-link behavior (packages does not auto-open a modal).

**Alternatives considered**: FAQ `gift` auto-opens GiftModal; fall through to contact.

**Rationale**: Explicit branch prevents contact mis-link; auto-open is extra behavior not in locked FAQ copy (“sección … formulario que se te despliega” implies user reaches section then form).

### Decision: PR sizing under `ask-on-risk` / 400-line budget

**Choice**: Forecast **High** authored churn (new section + modal + PageScripts gift path + ES/EN strings + FAQ + hashes + HomePage). Recommend chained slices if apply exceeds ~400 add+del:

| Slice | Scope |
|-------|--------|
| PR1 | Data/i18n/hashes/FAQ type + `FAQ.astro` `gift` branch + optional empty `gift` mount stub |
| PR2 | `GiftSection` + `GiftModal` + PageScripts gift path + HomePage mount order |

**Alternatives considered**: Single PR always; extract shared `syncTreatmentPriceFields` helper first.

**Rationale**: `delivery_strategy: ask-on-risk`. Thin shared extract optional later — prefer duplicated gift sync functions first to avoid booking refactor in same PR; tasks phase confirms chain vs single after line forecast.

## Data Flow

```
es.ts / en.ts
  sectionIds.gift, navItems, gift{}, ui.giftModal, faq items
hashes.ts  tarjeta-regalo ↔ gift-card
faq.ts     action union += "gift"
getSite()  → SiteBundle.gift (+ existing bookingOptions/treatments/rituals)
        │
HomePage   Reviews → GiftSection → Contact ; GiftModal + PageScripts
        │
GiftSection  CTA [data-open-gift] ──► openGiftModal()
GiftModal    form fields (all required)
        │
PageScripts  treatmentMap / ritualMap (shared)
             syncGiftFieldVisibility / updateGiftPriceEstimate
             submit → interpolate WA template → window.open(WA)
                   → closeGiftModal → location.assign(thankYou)
FAQ          action gift → #sectionIds.gift
```

```mermaid
sequenceDiagram
  participant U as User
  participant GS as GiftSection
  participant GM as GiftModal
  participant PS as PageScripts
  participant WA as WhatsApp tab
  participant TY as Thank-you route

  U->>GS: Click Regalar / Gift CTA
  GS->>PS: data-open-gift
  PS->>GM: close booking if open; showModal
  U->>GM: Fill required fields; submit
  PS->>PS: Validate HTML required + price from maps
  PS->>WA: window.open wa.me curated text
  PS->>GM: close + syncBodyLock
  PS->>TY: location.assign /gracias or /en/thank-you
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/GiftSection.astro` | Create | `#sectionIds.gift`; SectionHeading; body; inline SVG mock; CTA `data-open-gift` |
| `src/components/GiftModal.astro` | Create | `#giftModal` dialog; treatment/duration/giver/receiver/price; reuse booking glass classes; distinct ids (`giftTreatment`, …) |
| `src/components/HomePage.astro` | Modify | Import/mount Gift between Reviews and Contact; mount GiftModal beside BookingModal |
| `src/components/PageScripts.astro` | Modify | Gift open/close/backdrop; duration/price sync; WA+thank-you submit; extend `syncBodyLock`; mutual exclusion with booking |
| `src/components/FAQ.astro` | Modify | Explicit `part.action === "gift"` → `#${sectionIds.gift}` before contact fallback |
| `src/data/site/faq.ts` | Modify | Add `"gift"` to `FaqAnswerPart` action union |
| `src/data/site/es.ts` | Modify | `sectionIds.gift`, nav REGALA, `gift` content, `ui.giftModal`, WA template, two FAQ items |
| `src/data/site/en.ts` | Modify | Same shape; EN drafts from proposal |
| `src/data/site/hashes.ts` | Modify | `"tarjeta-regalo": "gift-card"` |
| `src/data/site/index.ts` | Modify | Pass through `dict.gift` on `SiteBundle` if not auto-spread via dict fields consumed by components |
| `src/components/Header.astro` | Verify only | Nav from data; check +1 item desktop/drawer overflow — change only if broken |
| `src/styles/global.css` | Prefer none | Reuse `.booking-modal*` / field/price classes; no new allow-list entries unless gift needs a tiny named hook |
| Thank-you pages / TidyCal / BookingModal | Unchanged | Non-goals |

## Interfaces / Contracts

### Locale data keys

```ts
// es.ts / en.ts — additions
sectionIds: {
  // …
  gift: "tarjeta-regalo" | "gift-card";
};

navItems: [
  // … testimonials/reviews entry,
  { href: "#tarjeta-regalo" | "#gift-card", label: "REGALA" | "GIFT CARD" },
  // contact …
];

gift: {
  heading: string;       // TARJETA REGALO / GIFT CARD
  body: string;          // locked ES / drafted EN
  cta: string;           // Regalar tratamiento / Gift a treatment
  imageAlt?: string;     // optional; omit if SVG is purely decorative
  whatsappTemplate: string;
  // ES: Hola Marta! Quiero una tarjeta regalo. Tratamiento: {treatment}. Duración: {duration}. De: {from}. Para: {to}. Precio estimado: {price}.
  // EN: Hello Marta! I would like a gift card. Treatment: {treatment}. Duration: {duration}. From: {from}. To: {to}. Estimated price: {price}.
};

ui.giftModal: {
  title: string;
  treatmentLabel: string;
  durationLabel: string;
  giverLabel: string;      // Quién lo regala / Who is giving this gift
  receiverLabel: string;   // Quién lo recibe / Who is receiving this gift
  priceEstimateLabel: string;
  submit: string;
  closeAria: string;
};
```

### GiftModal fields (all `required`)

| Field | Control | IDs (suggested) | Notes |
|-------|---------|-----------------|-------|
| Treatment | `<select>` | `giftTreatment` | Same `bookingOptions` list |
| Duration | `<select>` | `giftDuration` / group `giftDurationGroup` | Hidden for rituals; still populated with ritual minutes |
| Giver | `<input type="text">` | `giftFrom` | Required; trim on submit |
| Receiver | `<input type="text">` | `giftTo` | Required; trim on submit |
| Price | `<output>` | `giftPriceEstimate` | Read-only estimate; not a user-editable input |

### PageScripts gift helpers (sketch)

```js
// Shared maps already constructed for booking:
// ritualMap, treatmentMap, thankYouPath, meta.whatsappNumber

function syncBodyLock() {
  document.body.classList.toggle(
    "is-locked",
    isNavOpen() || Boolean(bookingDialog?.open) || Boolean(giftDialog?.open),
  );
}

function openGiftModal() {
  if (bookingDialog?.open) closeBookingModal();
  syncGiftFieldVisibility();
  updateGiftPriceEstimate();
  giftDialog.showModal();
  syncBodyLock();
}

function buildGiftWhatsappHref({ treatmentLabel, durationLabel, from, to, price }) {
  const body = giftWhatsappTemplate
    .replace("{treatment}", treatmentLabel)
    .replace("{duration}", durationLabel)
    .replace("{from}", from)
    .replace("{to}", to)
    .replace("{price}", price);
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`;
}

// Ritual duration for WA: always `${ritual.duration} ${uiClient.minutesSuffix}`
// Massage: selected option text or `${min} ${minutesSuffix}`
// Price: same `${n} €` formatting as booking outputs
```

Pass `gift.whatsappTemplate` (+ any gift UI strings needed client-side) via the existing `define:vars` / JSON bridge pattern in `PageScripts.astro`.

### FAQ

```ts
action: "booking" | "maps" | "contact" | "packages" | "gift" | "whatsapp" | "whatsappPackages";
// Render gift: <a href={`#${sectionIds.gift}`}>{part.label}</a>
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | — | N/A (no test runner) |
| Typecheck | New copy keys, FAQ union, Gift props | `npx astro check` |
| Build | Homepage + locales emit | `npm run build` |
| Manual | Section order/nav/hashes; modal open/close/Escape/backdrop; ritual hides duration; price matches booking; WA message tokens; thank-you assign; booking regression; FAQ gift link; nav overflow | Local preview ES + EN |

## Threat Matrix

N/A — no routing CLI, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary. Client-side `wa.me` open + same-origin thank-you navigation only.

## Migration / Rollout

No data migration or feature flag. Ship on feature branch; `delivery_strategy: ask-on-risk` — prefer single PR if authored diff stays ≤400; else PR1 data/FAQ → PR2 UI/scripts as above. Rollback: remove Gift components/nav/FAQ/hashes; revert PageScripts gift path and HomePage mounts; booking path unchanged if gift stayed parallel.

## Non-goals

- Softening thank-you calendar-oriented copy after gift WA handoff.
- PDF gift-card generation / email delivery automation.
- Real gift-card artwork asset.
- Extending BookingModal / TidyCal / new thank-you routes.
- Payment checkout or CMS for gift cards.

## Open Questions

- [x] Ritual `{duration}` token — **concrete minutes always** (this design).
- [x] Placeholder visual — **inline SVG** (this design).
- [x] FAQ gift — **hash deep-link only** (no auto-open modal).
- [ ] Exact PR chain vs single — confirm at `sdd-tasks` after line forecast (`ask-on-risk`).
- [ ] Header overflow with +1 nav item — verify at apply; fix only if broken.
