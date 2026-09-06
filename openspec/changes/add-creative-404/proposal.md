# Proposal: Creative 404

## Intent

Unknown routes currently hit the host default page. Ship a branded bilingual 404 that matches the thank-you relax-flow glass UI and steers visitors to massages (primary) or WhatsApp inquiry (secondary).

## Scope

### In Scope
- Single `src/pages/404.astro` → `dist/404.html` (Netlify default 404)
- `NotFoundPage` thank-you twin: logo, decorative “404” mark, soft `h1`, body, massages CTA, WhatsApp — no home link, no quick-nav chips
- Extract canvas to `src/scripts/relax-flow.ts`; retarget ThankYouPage to shared `data-relax-flow-*` hooks
- `ui.notFound` ES/EN copy + meta; Layout `skipLocaleRedirect`, `includeJsonLd={false}`, robots `noindex`
- Primary CTA: `/#masajes` (ES), `/en#massages` (EN); WA prefill = same `meta.whatsappInquiry` as thank-you

### Out of Scope
- SSR/edge Accept-Language; per-locale Astro `en/404.astro` as the served host 404
- Extra motion beyond shared relax-flow; home or chip nav on 404
- Changing thank-you routes/copy beyond shared-module extract

## Capabilities

### New Capabilities
- `creative-404`: Static Netlify 404 experience — bilingual thank-you-twin UI, visible 404 mark, massages + WhatsApp CTAs, noindex

### Modified Capabilities
- `site-i18n`: 404 locale resolution + `ui.notFound` strings; 404 shell must skip preferred-locale boot redirect

## Approach

**Routing:** One static `404.astro` + `NotFoundPage`. Locale from preserved pathname: `/en…` → EN; else ES. **Also** honor `marta-orozco-locale` localStorage only when pathname has no `/en` prefix (preferred EN → EN UI). Anti-FOUC via early inline pick or dual markup + `hidden`. Always `skipLocaleRedirect`.

**Structure:** Large “404” as decorative/status mark (not the sole accessible name). Soft massage phrase is `h1` (EN: “Looking for a massage?” / ES: “¿Buscabas un masaje?”). Body: EN “Don't get lost in the vastness — find the perfect one for you below.” / ES “No te pierdas en la inmensidad: encuentra el que mejor te va abajo.” CTAs: Explore massages / Ver masajes; reuse thank-you WhatsApp labels.

**Meta:** `noindex` (prefer `noindex, nofollow`); no JSON-LD. Layout needs a robots override (today hardcoded `index, follow`).

**Shared module:** Mirror `horizontal-carousel.ts` — extract thank-you canvas into `relax-flow.ts`, multi-instance safe.

**Shipping:** Prefer **one PR** on `feat/add-creative-404` ← `feat/improved-seo` if authored diff stays under ~400 lines. If extract + page + i18n threatens budget, peel extract as a tiny PR1 then 404 UI as PR2 (`ask-on-risk`).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/404.astro` | New | Static 404 entry |
| `src/components/NotFoundPage.astro` | New | Glass UI + CTAs |
| `src/scripts/relax-flow.ts` | New | Shared canvas init |
| `src/components/ThankYouPage.astro` | Modified | Consume shared module |
| `src/data/site/es.ts`, `en.ts` | Modified | `ui.notFound` |
| `src/layouts/Layout.astro` | Modified | Robots override; 404 uses skipLocaleRedirect / no JSON-LD |
| `openspec/specs/site-i18n` | Modified | 404 locale + copy requirements |
| `openspec/specs/creative-404` | New | 404 product/behavior spec |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Locale boot redirects swallow 404 | High | `skipLocaleRedirect` on 404 shell |
| FOUC wrong locale | Med | Inline early locale pick / dual markup |
| Review >400 lines | Med | Single PR if lean; else extract-first slice |
| a11y: “404” only decorative | Low | Soft phrase as real `h1` |

## Rollback Plan

Delete `404.astro` / `NotFoundPage` / `ui.notFound`; restore ThankYouPage inline canvas (or keep shared module if harmless); revert Layout robots prop. Redeploy.

## Dependencies

- Netlify serves `/404.html` for unknown paths (no `netlify.toml` rule required by default)
- Branch: `feat/add-creative-404` from `feat/improved-seo`

## Success Criteria

- [ ] Unknown path returns HTTP 404 with branded page; URL preserved
- [ ] `/en…` miss → EN UI; non-`/en` miss → ES unless stored preferred locale is EN
- [ ] Primary → massages anchors; WhatsApp = inquiry prefill; no home/chips; “404” visible
- [ ] Thank-you + 404 share `relax-flow.ts`; `npx astro check` clean; robots noindex on 404

## Open Questions

- (none)
