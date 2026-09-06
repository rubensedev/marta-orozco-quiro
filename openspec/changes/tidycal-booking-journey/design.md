# Design: TidyCal Booking Journey

## Technical Approach

Attach `tidycalUrl` on shared durations/rituals (source = `state.yaml` `url_map`). Slim modal keeps treatment + duration + single-session price; confirm resolves HTTPS URL and `window.open(..., "noopener,noreferrer")`. Bonos leave the modal (WA packages only). Ship `/gracias` + `/en/thank-you` calm pages; Phase 6 polishes logo, dark BG, and pointer relax-flow. Maps to booking-journey + site-i18n specs.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|----------|---------|--------|-----------|
| URL storage | Central JS map vs `tidycalUrl` on shared data | `tidycalUrl` on durations + rituals in `shared.ts` | Same build path as prices; typed; fail-closed if missing |
| Confirm open | Same-tab vs new tab vs embed | New tab `noopener,noreferrer` | Locked; landing stays open |
| Purchase type | Keep in modal vs remove | Remove; bonos → WA | Locked; Rituals already has WA packages CTA |
| Price | Drop vs keep single-session | Keep unit price; drop bono savings UI | Locked `keep_price_estimate` |
| Untargeted Book | Profile listing vs modal | Modal + default treatment | Locked; no TidyCal listing deep-link |
| Thank-you routing | One page vs ES+EN | `/gracias` + `/en/thank-you` | Locked bilingual handoff |
| Post-confirm navigation | Stay / second thank-you tab / current→handoff | Current tab → handoff after TidyCal open | Honest start-of-journey; no paid redirect; no tab spam |
| TidyCal redirect_url | Paid feature | Out of scope | Site-owned handoff replaces it |
| Layout redirect | Keep auto-locale bounce | Disable on thank-you | Boot script would steal handoff page |
| Thank-you brand | Text “MARTA OROZCO” vs logo | `/assets/images/logo.svg` + Header invert/brightness on glass | Brand mark matches site; contrast on glass card |
| Thank-you dark BG | Keep `--color-brand-bg` gradient vs theme tokens | Use `--color-brand-bg-dark` / dark mixes (body already does) | `--color-brand-bg` stays peach; causes bright dark-mode handoff |
| Relax-flow dots | CSS-only static vs canvas/rAF pointer waves | Lightweight canvas or DOM dots + pointer ripple via `requestAnimationFrame`; no libs | Calm sea feel; touch/pointer; `prefers-reduced-motion` → static/subtle |

## Data Flow

```
Book CTA → openBookingModal(id?, {duration?})
       → modal: treatment + duration + price
Confirm → resolveTidycalUrl(id, durationMin)
       → null? disable/error (fail-closed)
       → HTTPS? window.open(url, "_blank", "noopener,noreferrer")
       → close modal → location.assign(/gracias | /en/thank-you)
Bonos CTA → wa.me + whatsappBonosInquiry (no modal)
Note: TidyCal paid redirect_url is out of scope; handoff is site-owned.
```

### Resolver (fail-closed)

```
ritual id → ritual.tidycalUrl
massage (id, min) → duration.tidycalUrl
missing / non-https → null (no open, no profile guess)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/data/site/shared.ts` | Modify | Add `tidycalUrl` per duration + ritual from `url_map` |
| `src/data/site/index.ts` | Modify | Types include `tidycalUrl`; pass through build |
| `src/data/site/es.ts` / `en.ts` | Modify | Modal/FAQ/meta/MobileBar/WA copy; drop unused `whatsappBooking` PII fields; add `thankYou` + questions WA copy |
| `src/components/BookingModal.astro` | Modify | Remove PII + purchase-type; TidyCal CTA (not WA) |
| `src/components/PageScripts.astro` | Modify | Resolve/open TidyCal; drop WA submit + purchase logic; ignore `data-bono` |
| `src/components/Rituals.astro` | Modify | Bono discount buttons → WA packages (not modal) |
| `src/components/MobileBar.astro` | Modify | WA label = questions, not “book” |
| `src/components/FAQ.astro` | Modify | Booking answer → site/TidyCal |
| `src/layouts/Layout.astro` | Modify | Optional path + skip locale-redirect for thank-you |
| `src/components/ThankYouPage.astro` | Create → Modify (PR5) | Calm brand-first; logo brand mark; dark-safe BG; pointer-driven relax-flow dots (page-local rAF script); respect reduced motion |
| `src/pages/gracias.astro` | Create | ES thank-you |
| `src/pages/en/thank-you.astro` | Create | EN thank-you |
| `src/styles/global.css` | Modify | Only if TidyCal CTA / thank-you needs named class (prefer utilities) |

### Thank-you polish (Phase 6 / PR5)

```
ThankYouPage
  ├── logo.svg (site-logo: brightness-0 invert on glass, same asset as Header)
  ├── BG gradient: brand-bg + dark mixes with --color-brand-bg-dark (not peach-only)
  └── relax layer: dots + pointer ripple via rAF; reduced-motion → static/subtle
```

Keep script page-local in `ThankYouPage.astro` (thank-you routes do not mount `PageScripts`). No heavy animation libraries.

## Interfaces / Contracts

```ts
durations: { min: number; price: number; tidycalUrl: string }[]
Ritual: { /* existing */ tidycalUrl: string }
resolveTidycalUrl(id: string, durationMin?: number): string | null
```

No TidyCal `redirect_url` (paid). Handoff is triggered by the site confirm handler.

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | N/A (no runner) | — |
| Check | Types + Astro | `npx astro check` |
| Smoke | All `url_map` pairs + rituals; fail-closed; bonos WA; routes | Manual ES/EN |
| Smoke (PR5) | Logo on glass; dark handoff not bright; pointer waves; reduced-motion | Manual light/dark + reduce |

## Threat Matrix

N/A — no shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary. Thank-you routes are normal Astro pages (not adversarial path/exec routing).

## Migration / Rollout

1. Deploy thank-you pages.
2. Ship modal/data/copy.
3. Operator sets TidyCal `redirect_url` per type.
4. Rollback: revert code; clear or leave redirects (harmless to thank-you).

Chained PRs: WU1–4 shipped (#15–#18). Phase 6 / PR5 stacks on `feat/tidycal-booking-channel`.

## Open Questions

- [ ] (none blocking) — EN-labeled duplicate TidyCal types optional later; v1 uses ES redirect primary for shared types.
- [ ] (none blocking) — Canvas vs lightweight DOM dots for relax-flow: implementer picks whichever stays tiny and rAF-bound.
