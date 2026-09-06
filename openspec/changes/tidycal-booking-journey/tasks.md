# Tasks: TidyCal Booking Journey

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 450–700 (+PR5 ~80–150; +PR6 ~20–60) |
| 400-line budget risk | High (whole change); **Low** for PR6 alone |
| Chained PRs recommended | Yes |
| Suggested split | PR1 data → PR2 thank-you → PR3 modal → PR4 channel → PR5 thank-you polish → PR6 modal copy+select UX |
| Delivery strategy | ask-on-risk |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | `tidycalUrl` on shared durations/rituals + types | PR 1 | `npx astro check` | N/A — data only | Revert `shared.ts` + `index.ts` |
| 2 | Bilingual handoff thank-you + skip locale redirect | PR 2 | `npx astro check` | Open `/gracias`, `/en/thank-you` | Remove thank-you pages + Layout skip |
| 3 | Slim modal + open calendar URL + navigate handoff | PR 3 | `npx astro check` | Confirm: new tab + current→handoff; fail-closed | Revert `BookingModal.astro` + `PageScripts.astro` |
| 4 | Channel copy + bonos WA + pricing-card package CTA | PR 4 (#18) | `npx astro check` | Smoke FAQ/MobileBar/Rituals WA; pricing-card package→WA / single→modal | Revert es/en + Rituals/MobileBar/FAQ + PageScripts branch |
| 5 | Thank-you polish: logo, dark BG, relax-flow | PR 5 | `npx astro check` | Light/dark handoff; pointer waves; reduced-motion | Revert `ThankYouPage.astro` (+ any PR5 CSS) |
| 6 | Modal vendor-free copy + select chevron air | PR 6 | `npx astro check` | Modal ES/EN: no “TidyCal”; selects clear chevron | Revert modal keys + select styles |

## Phase 1: Data foundation

- [x] 1.1 Add `tidycalUrl` on each massage duration in `src/data/site/shared.ts` from `state.yaml` `url_map` (incl. descontracturante-80, craneofacial-30)
- [x] 1.2 Add `tidycalUrl` on rituals in `src/data/site/shared.ts` (`ritualcuerpoligero-80`, `ritualdesconexiontotal-80`)
- [x] 1.3 Extend duration/ritual types and pass-through in `src/data/site/index.ts`

## Phase 2: Thank-you pages

- [x] 2.1 Add `thankYou` copy keys in `src/data/site/es.ts` and `src/data/site/en.ts` (handoff gratitude; calendar-in-other-tab; home + WA)
- [x] 2.2 Create `src/components/ThankYouPage.astro` (calm brand-first; home + WA)
- [x] 2.3 Create `src/pages/gracias.astro` and `src/pages/en/thank-you.astro`
- [x] 2.4 Update `src/layouts/Layout.astro` to skip auto-locale redirect on thank-you paths

## Phase 3: Modal + TidyCal confirm

- [x] 3.1 Slim `src/components/BookingModal.astro`: drop PII + purchase-type; keep treatment/duration/price; TidyCal CTA
- [x] 3.2 In `src/components/PageScripts.astro` implement `resolveTidycalUrl` (fail-closed HTTPS); on confirm: `window.open` noopener → close modal → `location.assign` locale handoff; drop WA submit + purchase/`data-bono` logic
- [x] 3.3 Prefer existing `btn-brand` in `src/styles/global.css`; add named class only if required

## Phase 4: Channel split + i18n

- [x] 4.1 Update modal/FAQ/meta/MobileBar/WA copy in `src/data/site/es.ts` and `src/data/site/en.ts`; remove unused `whatsappBooking` PII fields; EN WA fully English
- [x] 4.2 Point bono discount CTAs in `src/components/Rituals.astro` to WA packages inquiry (not modal)
- [x] 4.3 Relabel WA vs Book in `src/components/MobileBar.astro` (WA = questions)
- [x] 4.4 Rewrite booking answer in `src/components/FAQ.astro` to site/TidyCal (not WA)
- [x] 4.5 Wire massage `[data-pricing-card]` Book/Reservar: if selected purchase type is package (`bono5`/`bono10`, sessions > 1) open WhatsApp with the same packages inquiry as Rituals (`meta.whatsappBonosInquiry` / `bonosWhatsappHref`); if `single`, keep current open-modal + duration → TidyCal path. MUST NOT open modal or TidyCal for packages. Lands on PR #18 (`feat/tidycal-booking-channel`). Spec/design already covered — no separate 4.6.

## Phase 5: Verify

- [x] 5.1 Run `npx astro check`
- [ ] 5.2 Smoke ES/EN: all `url_map` pairs + rituals; fail-closed; untargeted Book → default; confirm → calendar new tab + current handoff; pricing-card package→WA / single→modal; no embed; Phase 7: modal copy vendor-free + select chevron air

## Phase 6: Thank-you polish (PR5)

- [x] 6.1 Replace thank-you “MARTA OROZCO” text with site logo (`/assets/images/logo.svg`); match Header invert/brightness for glass contrast; keep brand-first hierarchy
- [x] 6.2 Fix dark-mode handoff background: stop using light-only `--color-brand-bg` gradient; use `--color-brand-bg-dark` / dark mixes so the page is not bright in dark theme
- [x] 6.3 Add relax-flow BG: pointer-driven calm-sea ripple/wave displacement on the dot field (rAF, no heavy libs; touch/pointer); `prefers-reduced-motion` → static or very subtle
- [x] 6.4 Run `npx astro check`; smoke light/dark + reduced-motion on `/gracias` and `/en/thank-you`

## Phase 7: Modal copy + select UX (PR6)

- [x] 7.1 Update `ui.modal.intro` / `ui.modal.submit` in `src/data/site/es.ts` and `en.ts` — remove “TidyCal”; ES intro ≈ “Selecciona tu tratamiento y duración. Confirma para abrir el calendario y reservar tu sesión.”; EN intro ≈ “Select your treatment and duration. Confirm to open the calendar and book your session.”; submit ES “Confirmar reserva” / EN “Confirm booking” (keep calendar icon in markup)
- [x] 7.2 Add trailing air before native select chevron on `#modalTreatment` and `#modalDuration` in `BookingModal.astro` (extra `pr-*` and/or custom appearance); preserve glass styling; touch `global.css` only if utilities are insufficient
- [x] 7.3 Run `npx astro check`; smoke modal ES/EN — no vendor name in intro/submit; long option labels clear the chevron

**Branch**: `feat/tidycal-modal-copy-ux`  
**Base tip**: `feat/tidycal-thankyou-polish` (PR #20); fallback `feat/tidycal-booking-channel`  
**PR base (when apply opens)**: `feat/tidycal-thankyou-polish`  
**Stack target**: `feat/improved-seo` (never develop)  
**Do not open PR in docs-only planning commit** — apply opens after implementation.
