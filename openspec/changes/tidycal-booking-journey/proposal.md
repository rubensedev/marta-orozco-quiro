# Proposal: TidyCal Booking Journey

## Intent

Replace WhatsApp booking confirmation with per-(treatment, duration) / ritual TidyCal deep links. Slim modal (price trust) → exact type in a new tab. WhatsApp = questions + bonos inquiry only. Add bilingual thank-you pages for redirects.

## Scope

### In Scope
- Slim modal: treatment + duration + price; drop name/email/date/purchase-type
- CTA “Confirm via TidyCal” → resolve URL → new tab (`noopener`)
- Locked URL map (state.yaml); default treatment on untargeted Book
- Bonos → WhatsApp packages ask only
- Massage pricing-card Book: package selected (`bono5`/`bono10`) → same WhatsApp packages inquiry; `single` → modal/TidyCal
- Rewrite FAQ/meta/modal “book via WhatsApp”; relabel MobileBar WA vs Book
- Thank-you: `/gracias`, `/en/thank-you` (calm confirm + optional WA + home)
- Thank-you polish: logo brand mark (not text), dark-mode-safe BG, relax-flow pointer ripple on dots
- Document TidyCal `redirect_url` operator step

### Out of Scope
- iframe/embed; `/reservar`; TidyCal bono types; analytics
- Changing site-header drawer→modal open contract

## Capabilities

### New Capabilities
- `booking-journey`: Modal → TidyCal resolve → new tab; channel split; thank-you; fail-closed

### Modified Capabilities
- `site-i18n`: FAQ/meta/modal no longer claim WA booking; WA bodies = questions/packages only

## Approach

Hybrid E via A: `tidycalUrl` on shared durations/rituals; JS resolves `(id, duration)` or ritual → HTTPS; `window.open` new tab. Price stays. Thank-you complements new-tab UX.

Base `https://tidycal.com/martaorozcoquiro/{slug}` — massage durations; rituals `ritualcuerpoligero-80`, `ritualdesconexiontotal-80`; `masaje-craneofacial-30` (+ descontracturante-80).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `BookingModal.astro` | Modified | Slim fields; TidyCal CTA |
| `PageScripts.astro` | Modified | URL resolve; drop WA submit; pricing-card Book branches package→WA / single→modal |
| `shared.ts`, `index.ts` | Modified | Per-duration/ritual URLs |
| `es.ts`, `en.ts` | Modified | Modal/FAQ/meta/channel copy |
| `Rituals`/`MobileBar`/`FAQ` | Modified | Bonos WA; WA vs Book |
| CTA surfaces | Modified | Copy; pricing-card Book package-aware; single still opens modal |
| `/gracias`, `/en/thank-you` | New | Post-book confirmation |
| `ThankYouPage.astro` | Modify (PR5) | Logo, dark BG, relax-flow |
| `global.css` | Modify | CTA branding if needed |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Slug drift | Med | Central map; smoke; fail-closed |
| Missing redirect_url | Med | Dependencies/Success; verify deploy |
| >400-line review | Med | Chain PRs (`ask-on-risk`) |
| Popup blockers | Low | User-gesture open; `<a>` fallback |

## Rollback Plan

Revert modal/scripts/data/copy/thank-you to WA booking confirm. Clear or leave TidyCal `redirect_url`.

## Dependencies

- Locked TidyCal types exist (descontracturante-80 confirmed)
- Operator `redirect_url`: `https://martaorozcoquiro.netlify.app/gracias` (ES) / `.../en/thank-you` (EN)
- Deploy thank-you routes before redirects

## Success Criteria

- [ ] Confirm opens correct TidyCal URL in new tab for all mapped sessions/rituals
- [ ] No PII/purchase-type on confirm; price shown; untargeted Book → default treatment
- [ ] Bonos = WA packages only; pricing-card package Book → WA inquiry (not modal/TidyCal); FAQ/meta not “book via WhatsApp”
- [ ] Thank-you calm branded; redirect_url documented/verified
- [ ] Thank-you polish: logo, dark BG not bright, relax-flow + reduced-motion
- [ ] `npx astro check` + smoke ES/EN
