# Tasks: TidyCal Booking Journey

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 450–700 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR1 data → PR2 thank-you → PR3 modal/scripts → PR4 channel copy |
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
| 3 | Slim modal + open TidyCal + navigate handoff | PR 3 | `npx astro check` | Confirm: new tab + current→handoff; fail-closed | Revert `BookingModal.astro` + `PageScripts.astro` |
| 4 | Channel copy + bonos WA | PR 4 | `npx astro check` | Smoke FAQ/MobileBar/Rituals WA; no WA booking claim | Revert es/en + Rituals/MobileBar/FAQ |

## Phase 1: Data foundation

- [x] 1.1 Add `tidycalUrl` on each massage duration in `src/data/site/shared.ts` from `state.yaml` `url_map` (incl. descontracturante-80, craneofacial-30)
- [x] 1.2 Add `tidycalUrl` on rituals in `src/data/site/shared.ts` (`ritualcuerpoligero-80`, `ritualdesconexiontotal-80`)
- [x] 1.3 Extend duration/ritual types and pass-through in `src/data/site/index.ts`

## Phase 2: Thank-you pages

- [ ] 2.1 Add `thankYou` copy keys in `src/data/site/es.ts` and `src/data/site/en.ts` (handoff gratitude; calendar-in-other-tab; home + WA)
- [ ] 2.2 Create `src/components/ThankYouPage.astro` (calm brand-first; home + WA)
- [ ] 2.3 Create `src/pages/gracias.astro` and `src/pages/en/thank-you.astro`
- [ ] 2.4 Update `src/layouts/Layout.astro` to skip auto-locale redirect on thank-you paths

## Phase 3: Modal + TidyCal confirm

- [ ] 3.1 Slim `src/components/BookingModal.astro`: drop PII + purchase-type; keep treatment/duration/price; TidyCal CTA
- [ ] 3.2 In `src/components/PageScripts.astro` implement `resolveTidycalUrl` (fail-closed HTTPS); on confirm: `window.open` noopener → close modal → `location.assign` locale handoff; drop WA submit + purchase/`data-bono` logic
- [ ] 3.3 Prefer existing `btn-brand` in `src/styles/global.css`; add named class only if required

## Phase 4: Channel split + i18n

- [ ] 4.1 Update modal/FAQ/meta/MobileBar/WA copy in `src/data/site/es.ts` and `src/data/site/en.ts`; remove unused `whatsappBooking` PII fields; EN WA fully English
- [ ] 4.2 Point bono discount CTAs in `src/components/Rituals.astro` to WA packages inquiry (not modal)
- [ ] 4.3 Relabel WA vs Book in `src/components/MobileBar.astro` (WA = questions)
- [ ] 4.4 Rewrite booking answer in `src/components/FAQ.astro` to site/TidyCal (not WA)

## Phase 5: Verify

- [ ] 5.1 Run `npx astro check`
- [ ] 5.2 Smoke ES/EN: all `url_map` pairs + rituals; fail-closed; untargeted Book → default; confirm → TidyCal new tab + current handoff; no embed
