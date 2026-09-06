# Apply Progress: tidycal-booking-journey

## Work unit 1 (PR1) — data foundation
- Completed: 1.1, 1.2, 1.3
- Branch: `feat/tidycal-booking-data`
- Base: `feat/improved-seo`
- Chain: stacked into `feat/improved-seo` (not develop)
- Check: `npx astro check` pass (0 errors)
- Issue: #14
- PR: https://github.com/rubensedev/marta-orozco-quiro/pull/15

## Work unit 2 (PR2) — thank-you handoff pages
- Completed: 2.1, 2.2, 2.3, 2.4
- Branch: `feat/tidycal-booking-thankyou`
- Base: `feat/tidycal-booking-data`
- Check: `npx astro check` pass (0 errors)
- PR: https://github.com/rubensedev/marta-orozco-quiro/pull/16

## Work unit 3 (PR3) — slim modal + TidyCal handoff
- Completed: 3.1, 3.2, 3.3
- Branch: `feat/tidycal-booking-modal`
- Base: `feat/tidycal-booking-thankyou`
- Chain: stacked into `feat/improved-seo` (not develop)
- Check: `npx astro check` pass (0 errors; 4 pre-existing hints)
- Issue: #14 (Related to; no Closes)
- PR: https://github.com/rubensedev/marta-orozco-quiro/pull/17
- Files: `BookingModal.astro`, `PageScripts.astro`, `es.ts`/`en.ts` (modal intro+submit only), tasks/apply-progress
- global.css: untouched (used existing `btn-brand` + `w-full`)

### Work Unit Evidence

| Evidence | Result |
|---|---|
| Focused test command | `npx astro check` → 0 errors |
| Runtime harness | N/A automated — no e2e runner; manual: confirm opens TidyCal `_blank` noopener then current tab → `/gracias` or `/en/thank-you`; fail-closed disables submit |
| Rollback boundary | Revert `BookingModal.astro` + `PageScripts.astro` (+ modal intro/submit strings in es/en) |

### Deviations
- Minimal modal `intro`/`submit` copy updated so CTA is not WhatsApp (full channel copy remains PR4).
- No `global.css` change (task 3.3).

## Work unit 4 (PR4) — channel split + i18n
- Completed: 4.1, 4.2, 4.3, 4.4, **4.5**, 5.1
- Pending: 5.2 (manual smoke)
- Branch: `feat/tidycal-booking-channel`
- Base: `feat/tidycal-booking-modal`
- Chain: stacked → modal → thankyou → data → **feat/improved-seo** (not develop)
- Check: `npx astro check` pass (0 errors) — re-run after 4.5
- Issue: #14 (**Closes #14** on this PR)
- PR: https://github.com/rubensedev/marta-orozco-quiro/pull/18
- Stack status: WU4 **4.5 landed** on PR #18; ready for verify / remaining 5.2 smoke
- Files: `es.ts`, `en.ts`, `faq.ts`, `Rituals.astro`, `FAQ.astro`, `MobileBar` via `ui.reserveAppointment`; **4.5** → `PageScripts.astro` (`bonosWhatsappHref` + pricing-card package branch)

### Work Unit Evidence

| Evidence | Result |
|---|---|
| Focused test command | `npx astro check` → 0 errors |
| Runtime harness | N/A automated — no browser/e2e runner; package Book → `window.open(bonosWhatsappHref)`; single → modal; untargeted Book unchanged |
| Rollback boundary | Revert `PageScripts.astro` package-branch (and prior WU4 copy files if rolling back whole channel split) |

### Task 4.5 notes
- `[data-open-booking]` inside `[data-pricing-card]`: if `selectedBono` tier `sessions > 1` → open same WA packages URL as Rituals (`meta.whatsappBonosInquiry`); do not open modal/TidyCal
- `single` (sessions === 1): existing `openBookingModal(treatmentId, { duration })`
- Untargeted Book (hero/header/no card): unchanged → always modal
- Main Massages panel + PricingCard both use `data-pricing-card` + `data-open-booking`

### Smoke notes (task 5.2 — manual, not run here)
- FAQ booking answer: Book → modal → TidyCal; WA link = questions inquiry
- FAQ packages WA: `whatsappPackages` → bonos inquiry
- MobileBar: WA label QUESTIONS/CONSULTAS; Book = `data-open-booking`
- Rituals bono % CTAs: WA packages (`whatsappBonosInquiry`), not modal
- Contact/Footer WA: `whatsappInquiry` (questions), not booking confirm
- meta.description: site/TidyCal, not WhatsApp booking
- `whatsappBooking` PII block removed (unused)
- **Pricing-card Book + bono5/bono10 → WA packages; + single → modal**

### Deviations
- MobileBar.astro markup unchanged; relabel via `ui.reserveAppointment` (CONSULTAS / QUESTIONS).
- Added `whatsappPackages` FAQ action so packages WA keeps bonos template while booking FAQ WA stays questions.
- 4.5: JS `window.open(..., "_blank", "noopener,noreferrer")` (matches TidyCal confirm; WA anchors elsewhere use `target="_blank"`).

## Work unit 5 (PR5) — thank-you polish
- Completed: 6.1, 6.2, 6.3, 6.4
- Branch: `feat/tidycal-thankyou-polish`
- Base: `feat/tidycal-booking-channel`
- Chain: stacked 5/5 → channel → modal → thankyou → data → **feat/improved-seo** (not develop)
- Check: `npx astro check` pass (0 errors; 4 pre-existing hints)
- Issue: #14 (Related to; do **not** Closes — already on PR #18)
- PR: https://github.com/rubensedev/marta-orozco-quiro/pull/20
- Files: `ThankYouPage.astro` (logo, dark-safe BG, canvas relax-flow), tasks/apply-progress

### Work Unit Evidence

| Evidence | Result |
|---|---|
| Focused test command | `npx astro check` → 0 errors |
| Runtime harness | N/A automated — no e2e runner; manual: light/dark handoff BG; pointer waves; `prefers-reduced-motion` static dots; CTAs clickable above canvas |
| Rollback boundary | Revert `ThankYouPage.astro` (+ tasks/apply-progress docs) |

### Implementation notes
- Logo: `/assets/images/logo.svg` + `footer.logoAlt`; `dark:brightness-0 dark:invert` for glass contrast (light = natural dark mark).
- Dark BG: `dark:` gradient uses `--color-brand-bg-dark` / sage-dark mixes (no peach-only field).
- Relax-flow: page-local canvas + rAF pointer ripple; `pointer-events-none` on canvas; reduced-motion → static paint only.

## Work unit 6 (PR6) — modal copy + select UX
- Completed: 7.1, 7.2, 7.3
- Branch: `feat/tidycal-modal-copy-ux`
- Base tip: `feat/tidycal-thankyou-polish` (PR #20); stack target **`feat/improved-seo`**
- Check: `npx astro check` pass (0 errors; 4 pre-existing hints)
- Issue: #14 (Related to; do **not** Closes)
- Planned files → landed: `es.ts` / `en.ts` (`ui.modal.intro`/`submit`), `BookingModal.astro` (`pl-4 pr-12` on selects)
- Out of scope: FAQ/meta “TidyCal” scrub (deferred optional)
- `global.css`: untouched (Tailwind padding sufficient)

### Work Unit Evidence

| Evidence | Result |
|---|---|
| Focused test command | `npx astro check` → 0 errors |
| Runtime harness | N/A automated — no e2e runner; smoke: modal ES/EN intro/submit have no “TidyCal”; calendar icon kept; selects use `pr-12` |
| Rollback boundary | Revert `es.ts`/`en.ts` modal keys + `BookingModal.astro` select padding |

### Implementation notes
- ES intro: vendor-free calendar wording; submit `Confirmar reserva`
- EN intro: vendor-free calendar wording; submit `Confirm booking`
- Selects: `px-4` → `pl-4 pr-12` on `#modalTreatment` / `#modalDuration`; glass classes unchanged

## Next
**sdd-verify** after PR6 lands / stack ready. Full change (WU1–6) via PRs #15–#18 + #20 + this PR.
