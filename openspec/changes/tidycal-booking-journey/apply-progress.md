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

## Next
Work unit 4 — channel split + i18n copy (FAQ/MobileBar/Rituals/WA)
