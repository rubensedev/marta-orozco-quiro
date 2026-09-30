# Tasks: Add Gift Section

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~520–720 authored (data/FAQ ≈180–260; GiftSection/Modal/PageScripts/HomePage ≈340–460) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR1 data/i18n/FAQ → PR2 GiftSection + GiftModal + PageScripts + HomePage |
| Delivery strategy | ask-on-risk |
| Chain strategy | feature-branch-chain — work-unit commits on current branch |

Decision needed before apply: No (user chose: chained commits on current branch)
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain (commits on current branch; PR split later if needed)
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Locale gift ids/nav/copy, hashes, FAQ `gift` action + render branch | PR 1 | `npx astro check` | Preview `/` + `/en/`: REGALA/GIFT CARD nav; FAQ gift link → `#tarjeta-regalo` / `#gift-card` (section stub optional) | `es.ts`, `en.ts`, `hashes.ts`, `faq.ts`, `FAQ.astro`, `index.ts` gift pass-through only |
| 2 | GiftSection + GiftModal + PageScripts gift path + HomePage mount | PR 2 | `npx astro check` + `npm run build` | Manual smoke: CTA→modal, ritual duration hide + WA minutes, price parity, WA+thank-you, dual-dialog lock, booking/TidyCal untouched | `GiftSection.astro`, `GiftModal.astro`, `PageScripts.astro` gift helpers, `HomePage.astro` mounts |

Peel bases (if feature-branch-chain): PR1 ← feature/tracker; PR2 ← PR1 branch. If stacked-to-main: PR1 → main, then PR2 → main.

Threat matrix: N/A (no RED threat tasks).

**Hard constraint (all phases):** Do **not** modify `BookingModal.astro`, `resolveTidycalUrl`, or the booking form submit → TidyCal confirm path. Gift stays a parallel channel.

## Phase 1: Foundation / Data + FAQ wiring (PR1)

- [x] 1.1 Add `"gift"` to `FaqAnswerPart` action union in `src/data/site/faq.ts`.
- [x] 1.2 Add bidirectional hash pair `"tarjeta-regalo": "gift-card"` in `src/data/site/hashes.ts`.
- [x] 1.3 Update `src/data/site/es.ts`: `sectionIds.gift = "tarjeta-regalo"`; insert nav `{ href: "#tarjeta-regalo", label: "REGALA" }` immediately after reviews and before Contact; add `gift` (`heading`, `body`, `cta`, `whatsappTemplate` per locked proposal); add `ui.giftModal` labels; append both locked gift FAQ items (first answer uses `action: "gift"`, label `sección tarjeta regalo`).
- [x] 1.4 Mirror shape in `src/data/site/en.ts`: `sectionIds.gift = "gift-card"`; nav `GIFT CARD` / `#gift-card`; EN draft section/modal/WA/FAQ strings (giver/receiver = full “Who is …” forms).
- [x] 1.5 Ensure `src/data/site/index.ts` exposes `dict.gift` on `SiteBundle` (pass-through if not already auto-spread).
- [x] 1.6 In `src/components/FAQ.astro`, add explicit `part.action === "gift"` → `<a href={`#${sectionIds.gift}`}>` **before** contact fallback (packages-style; no auto-open modal).
- [x] 1.7 Verify: `npx astro check` clean for PR1 slice. Manual: ES/EN nav labels+order; FAQ gift link hrefs; locale switcher remaps gift hashes. Header overflow check deferred to Phase 4 (change `Header.astro` only if broken).

## Phase 2: GiftSection + GiftModal (PR2 start)

- [x] 2.1 Create `src/components/GiftSection.astro`: root `id={site.sectionIds.gift}`; SectionHeading + locked body; decorative inline SVG gift-card mock (`aria-hidden="true"`; Tailwind + `currentColor` / brand tokens; no asset file); primary CTA with `data-open-gift` and locked CTA copy.
- [x] 2.2 Create `src/components/GiftModal.astro`: distinct `#giftModal` dialog; reuse `.booking-modal` / `.booking-field-group` / `.booking-price-card` glass classes; fields all `required` — treatment `giftTreatment` (`bookingOptions`), duration `giftDuration` + group `giftDurationGroup`, giver `giftFrom`, receiver `giftTo`, price `<output id="giftPriceEstimate">`; close via `[data-close-gift]` + locked `closeAria`; **do not** import or extend BookingModal.
- [x] 2.3 Mount in `src/components/HomePage.astro`: GiftSection between Reviews and Contact; GiftModal beside BookingModal (before/after PageScripts as needed).

## Phase 3: PageScripts gift path + dual-dialog lock (PR2)

- [x] 3.1 In `src/components/PageScripts.astro`, bridge `gift.whatsappTemplate` (+ gift UI strings if needed) via existing `define:vars` / JSON pattern; resolve `#giftModal` and gift field nodes. **Do not** change booking submit / `resolveTidycalUrl` / TidyCal open.
- [x] 3.2 Extend `syncBodyLock` to `isNavOpen() || Boolean(bookingDialog?.open) || Boolean(giftDialog?.open)`. Opening gift closes booking (and vice versa) before `showModal()`. Listen gift `close` + backdrop + `[data-close-gift]` mirroring booking; native Escape only (no page `inert` for gift; document Escape handler stays nav/theme/lang only).
- [x] 3.3 Implement `syncGiftFieldVisibility` / `updateGiftPriceEstimate` duplicating booking map logic against shared `treatmentMap` / `ritualMap` (prefer duplicate over extracting booking helpers this change). Rituals: hide duration group; keep hidden option populated with ritual minutes. Price format `${n} €` same as booking.
- [x] 3.4 Wire `[data-open-gift]` → open gift modal; form submit: HTML required validation; build WA body from locale template; `{duration}` always concrete minutes (`${ritual.duration} ${minutesSuffix}` or massage selection); `window.open(wa.me/…?text=…, "_blank", "noopener,noreferrer")`; close gift + `syncBodyLock`; `location.assign(thankYouPath)` (`/gracias` | `/en/thank-you`). No TidyCal URL on gift submit.
- [x] 3.5 Prefer no new allow-list entries in `src/styles/global.css`; only add a tiny named hook if glass reuse is insufficient.

## Phase 4: Verification

- [x] 4.1 Run `npx astro check` — clean.
- [x] 4.2 Run `npm run build` — homepage ES/EN emit without errors.
- [ ] 4.3 Manual smoke ES (`/`) + EN (`/en/`):
  - DOM order Reviews → Gift → Contact; ids `tarjeta-regalo` / `gift-card`; nav REGALA / GIFT CARD; hash pair locale switch.
  - Locked section copy; inline SVG placeholder; CTA opens GiftModal only (BookingModal closed; no TidyCal).
  - Required fields block empty submit; massage price matches booking; ritual hides duration + fixed price; WA `{duration}` = concrete minutes (not empty / not bare marker).
  - Valid submit: curated WA tab → modal closes → thank-you route; BookingModal open/close/Escape/body-lock still work after gift close; mutual exclusion (opening one closes the other).
  - Two FAQ gift items; first answer gift link → gift section hash (not contact); FAQ does not auto-open modal.
  - Header desktop + drawer with +1 nav item — fix `Header.astro` only if overflow breaks.
- [ ] 4.4 Confirm BookingModal / TidyCal path untouched (diff review: no edits to booking confirm / `resolveTidycalUrl` behavior).

## Success Criteria (from proposal)

- [ ] Gift section between Testimonios and Contact; ids `tarjeta-regalo` / `gift-card`; nav REGALA / GIFT CARD; hashes map works.
- [ ] Locked ES section copy + EN drafts render; CTA opens GiftModal; placeholder image present (inline SVG).
- [ ] All modal fields required; price matches booking maps; rituals hide/fix duration like booking; WA ritual duration = concrete minutes.
- [ ] Submit opens curated WA, closes modal, navigates to locale thank-you; BookingModal/TidyCal unchanged.
- [ ] Two FAQ items (ES locked + EN); gift FAQ answer link targets gift section via `action: "gift"`.
- [ ] `npx astro check` clean after apply.
