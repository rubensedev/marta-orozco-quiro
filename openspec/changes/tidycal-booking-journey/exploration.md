## Exploration: tidycal-booking-journey

### Current State

Booking is a **client-side modal → WhatsApp deep link** flow on an Astro 7 + Tailwind 4 bilingual landing (`/` ES, `/en/` EN).

**Flow today**

1. CTAs with `data-open-booking` (optional `data-treatment`, `data-bono`) open `#bookingModal`.
2. Modal collects: treatment, duration (massages only), purchase type (single/bono5/bono10), **name, email, date preference**.
3. Price estimate updates via JS (`calculateQuote` in `PageScripts.astro`).
4. Submit builds a localized WhatsApp body (`ui.whatsappBooking`) and `window.open(https://wa.me/{number}?text=...)`.

**Key files**

| Role | Path |
|------|------|
| Modal UI | `src/components/BookingModal.astro` |
| Open/close, pricing, WA submit | `src/components/PageScripts.astro` |
| Shell mounts modal | `src/components/HomePage.astro` |
| Shared IDs/prices | `src/data/site/shared.ts` |
| Types + `bookingOptions` | `src/data/site/index.ts` |
| Modal/WA copy ES/EN | `src/data/site/es.ts`, `src/data/site/en.ts` |
| WA number | `sharedMeta.whatsappNumber` in `shared.ts` |
| CTA surfaces | `Hero.astro`, `Header.astro`, `MobileBar.astro`, `Massages.astro`, `PricingCard.astro`, `Rituals.astro`, `Contact.astro`, `FAQ.astro` |
| Direct WA (non-booking) | `Contact.astro`, `Footer.astro`, `MobileBar.astro`, `Rituals.astro` (bonos inquiry), `FAQ.astro` (`action: "whatsapp"`) |
| Modal styles | `src/styles/global.css` (`.booking-modal`, `.btn-whatsapp`) |

**Site catalog (bookable via modal)**

| Site `id` | Kind | Durations / price |
|-----------|------|-------------------|
| `descontracturante` | treatment | 30/25€, 50/35€, **80/50€** |
| `relajante` | treatment | 30/20€, 50/30€, 80/45€ |
| `detox` | treatment | 50/40€, 80/55€ |
| `craneo-facial` | treatment | 30/20€ |
| `ritual-desconexion` | ritual | 80/55€ (duration/purchase hidden) |
| `ritual-cuerpo-ligero` | ritual | 80/60€ |
| `single` / `bono5` / `bono10` | purchase tiers | 0% / 10% / 15% (modal price math) |

**TidyCal public profile** (`https://tidycal.com/martaorozcoquiro`) — titles visible, **slugs not extractable** from public HTML (SPA; guessed paths still render the listing; List Booking Types API needs auth). Observed booking types:

| TidyCal title (public) | Duration |
|------------------------|----------|
| Masaje Descontracturante | 50, 30 (**no 80 listed**) |
| Masaje relajante | 80, 50, 30 |
| Masaje detox | 80, 50 |
| Ritual cuerpo ligero | 80 |
| Ritual desconexión total | 80 |
| Masaje cráneo facial | 30 |
| Bono 5 sesiones | 80 and 50 |
| Bono 10 sesiones | 80 and 50 |

**Catalog mismatch (blocking for robust deep links)**

- Site has **descontracturante 80**; TidyCal listing does not.
- Site bonos are **treatment + duration + tier**; TidyCal bonos are **duration-only packs** (50/80), not per-massage.
- TidyCal = **one booking type per duration** (and separate bono types) → site modal must map `(treatmentId, durationMin)` or `(bonoId, duration?)` → URL, not just `treatmentId`.

**i18n**

- FAQ/meta still say “book via WhatsApp” (`es.ts` / `en.ts` meta description + FAQ “¿Cómo reservo?”).
- EN WhatsApp messages intentionally English (prior i18n lock).
- `ui.modal.submit` / `ui.whatsappBooking.*` are booking-channel copy to rewrite.

### Affected Areas

- `src/components/BookingModal.astro` — remove name/email/date; change CTA to TidyCal; possibly restyle away from `.btn-whatsapp`
- `src/components/PageScripts.astro` — replace `bookingMessage` + `wa.me` submit with URL resolver; keep duration/bono visibility + price estimate
- `src/data/site/shared.ts` (+ types in `index.ts`) — store `tidycalUrl` / path per duration (and rituals/bonos)
- `src/data/site/es.ts`, `en.ts` — modal intro/submit, FAQ, meta SEO, drop or shrink `whatsappBooking`
- `src/components/MobileBar.astro` — WA labeled like booking (`reserveAppointment`); clarify WA = questions vs Book = TidyCal
- `src/components/Rituals.astro` — ritual CTAs + bono CTAs; bonos WhatsApp CTA role
- `src/components/FAQ.astro` + FAQ answer parts — booking vs WhatsApp actions
- `src/components/Hero.astro`, `Header.astro`, `Contact.astro`, `Massages.astro`, `PricingCard.astro` — CTA copy/behavior if direct-link variant chosen
- `src/styles/global.css` — `.btn-whatsapp` may become brand primary for TidyCal CTA
- `src/components/SeoJsonLd.astro` — telephone stays WA; booking URL schema optional later

### Approaches

1. **A — Slim modal → open TidyCal URL (same/new tab)**
   - Keep treatment/duration/purchase selects + price card; drop PII; submit → `window.open(tidycalUrl)`.
   - Pros: Matches user ask; reuses existing CTA wiring; duration/bono → correct deep link; price builds trust before leave-site.
   - Cons: Still a step before calendar; needs complete URL map; tab/back UX to decide.
   - Effort: Medium

2. **B — Embed TidyCal iframe in modal**
   - `tidycal-embed` + `embed.js` inside `<dialog>` (TidyCal has no native popup embed).
   - Pros: Stay on-site; per-type `data-path`.
   - Cons: Mobile height/scroll friction; third-party UI inside branded glass modal; CSP; hard to swap embed when treatment/duration changes; weaker “first step” clarity.
   - Effort: High

3. **C — Dedicated `/reservar` page**
   - Service picker then embed or redirect.
   - Pros: SEO landing; room for instructions.
   - Cons: Extra route on a one-page site; more nav/i18n surface; overkill vs goal.
   - Effort: High

4. **D — Direct Book from cards (skip modal)**
   - `href` to TidyCal per ritual/treatment.
   - Pros: Fewest clicks for fixed-duration rituals.
   - Cons: Multi-duration massages need duration choice somewhere; opening profile listing dumps all types (bad first step); bonos ambiguous.
   - Effort: Low–Medium (incomplete without duration UX)

5. **E — Hybrid (recommended): slim modal + TidyCal confirm + WhatsApp for questions only**
   - Primary path = A. Secondary WA stays on Contact/Footer/MobileBar/FAQ/bonos inquiry — never booking confirmation.
   - Optional later: rituals deep-link shortcut if URL known.
   - Pros: Conversion + trust (price/context) + correct per-service link; clear channel split; mobile-first without iframe pain.
   - Cons: Requires full URL matrix; catalog gaps must be fixed in TidyCal or site.
   - Effort: Medium

| Approach | Pros | Cons | Effort |
|----------|------|------|--------|
| A Modal→URL | Fits ask; maps duration | Leave-site step | Med |
| B Embed | On-site calendar | Mobile/iframe UX risk | High |
| C Booking page | Space/SEO | Overbuilt for SPA | High |
| D Skip modal | Fast for rituals | Wrong for multi-duration | Low–Med |
| **E Hybrid** | Best channel split + A path | Needs URL inventory | Med |

### Recommendation

**Primary: E (Hybrid), implemented via A.**

For a wellness/massage landing (mobile-first, trust, conversion): keep a **short selection modal** (treatment → duration → pack when relevant → estimated price) so the first intentional booking action is **“Confirm reserve via TidyCal”** opening the **exact** booking-type URL. Do **not** embed by default. Keep WhatsApp as **human questions / bonos clarification**, not confirmation.

**Data model proposal**

```ts
// sharedTreatments durations become:
{ min: number; price: number; tidycalPath: string } // e.g. "martaorozcoquiro/{slug}"

// sharedRituals:
{ id, iconClass, duration, price, tidycalPath: string }

// bonos: separate map — TidyCal is duration-based packs, not treatment×tier
{ id: "bono5-50" | "bono5-80" | ...; tidycalPath: string }
// OR ask user how site bono CTAs should map
```

Resolve URL in JS: `https://tidycal.com/${path}` (or store full HTTPS URL).

**Modal fields**

| Keep | Remove |
|------|--------|
| Treatment | Name |
| Duration (massages) | Email |
| Purchase type (if still mapped) | Date preference |
| Price estimate | WhatsApp message builder |
| CTA → TidyCal | `.btn-whatsapp` branding as WA |

**WhatsApp after change**

- Keep: Contact, Footer, MobileBar inquiry, FAQ WhatsApp action, optional bonos “ask me” link.
- Remove: modal submit → `wa.me` with booking payload; rewrite FAQ/meta that say booking is via WhatsApp.
- Relabel MobileBar so WA ≠ “book appointment”.

**URL extraction status**

- Confirmed account: `https://tidycal.com/martaorozcoquiro`
- Individual slugs: **extracted from live profile DOM** (2026-09-05):
  - `masaje-descontracturante-50`, `masaje-descontracturante-30` (no 80)
  - `masaje-relajante-80`, `masaje-relajante-50`, `masaje-relajante-30`
  - `masaje-detox-80`, `masaje-detox-50`
  - `ritualcuerpoligero-80`, `ritualdesconexiontotal-80`
  - `masaje-creaneofacial-30` (TidyCal slug typo: creaneo)
  - `bono-5-sesiones-80`, `bono-5-sesiones` (50)
  - `bono-10-sesiones-80`, `bono-10-sesiones` (50)
- Full URL pattern: `https://tidycal.com/martaorozcoquiro/{slug}`
- Embed format if needed later: `<div class="tidycal-embed" data-path="martaorozcoquiro/{slug}">` + `https://tidycal.com/js/embed.js`

### Risks

- Incomplete/mismatched TidyCal catalog (missing descontracturante 80; bono semantics differ) → wrong or dead links.
- Slug drift if titles change in TidyCal (FAQ notes slug updates with title).
- New-tab booking can feel like abandon; same-tab loses site context.
- Leaving duration selects without URLs breaks resolve; need fail-closed (disable CTA / fallback profile).
- No automated tests (`strict_tdd: false`); rely on `astro check` + manual smoke ES/EN.
- Review budget ~400 lines; this change may need chained PRs if copy + data + modal + scripts all land together.

### Gaps / clarifying questions

**Resolved 2026-09-05 (user confirmed):**

1. URL map extracted from live profile (incl. `masaje-descontracturante-80`; craneofacial = `masaje-craneofacial-30`).
2. Descontracturante 80 — **added on TidyCal**.
3. Bonos — **WhatsApp packages inquiry only** (not TidyCal).
4. Open TidyCal in **new tab**.
5. Untargeted BOOK NOW — **open modal**, default treatment prefilled.
6. Keep **price estimate**.
7. Post-book — **bilingual thank-you pages** (`/gracias`, `/en/thank-you`) via TidyCal `redirect_url`.
8. No embed v1. Analytics deferred unless needed later.

### Ready for Proposal

**Yes** — decisions confirmed; research unselected. Run **sdd-propose**.

### Suggested next SDD artifacts

1. **sdd-propose** — scope: replace WA booking confirmation with per-service TidyCal; WA = communication only; out-of-scope: full embed, new `/reservar` route (unless chosen).
2. **sdd-spec** — domains: `booking-journey`, maybe `site-i18n` (FAQ/meta), `contact-channels`.
3. **sdd-design** — URL map schema, resolve algorithm, CTA matrix, mobile tab behavior, bonos mapping, failure modes.
4. **sdd-tasks** — data URLs → modal/scripts → copy → MobileBar/FAQ → smoke ES/EN; watch 400-line budget.
