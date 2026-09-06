## Exploration: add-creative-404

### Current State

Static Astro 7.2 site (default `output: 'static'`, no Netlify adapter) with ES default + EN `/en/` i18n. Deployed via `netlify.toml` → `dist`. No `404.astro` today; unknown routes fall through to host default.

Thank-you flow is the visual reference: `ThankYouPage.astro` (glass card, logo, brand primary + WhatsApp secondary) over a full-viewport canvas dot-grid with pointer ripple (`data-thank-you-root` / `data-thank-you-relax`). Routes: `/gracias`, `/en/thank-you`. Canvas logic is ~160 lines inline in that component; existing shared-script pattern is `src/scripts/horizontal-carousel.ts` imported from component `<script>`.

Massages live on homepage sections (`sectionIds.massages` → `#masajes` / `#massages`), not separate routes. Locked CTAs: `/#masajes` (ES), `/en#massages` (EN).

**Astro + Netlify 404 convention for this project**

- Add `src/pages/404.astro` → builds `dist/404.html`.
- Netlify auto-serves `/404.html` with HTTP 404 while keeping the browser URL as the missing path.
- No `netlify.toml` 404 redirect entry required for the default case.
- Single static HTML file only — request path is **not** known at build time.

**Locale strategy (critical)**

| Approach | Pros | Cons | Effort |
|----------|------|------|--------|
| A. Single `404.astro` + client locale from pathname (`/en…` → EN, else ES) | Matches Netlify reality; one artifact; mirrors thank-you Layout props | Needs anti-FOUC (inline pick or dual markup); static meta is one locale unless dual-head trick | Low–Med |
| B. `404.astro` + `en/404.astro` | Familiar per-locale pages | Netlify still serves **root** `404.html` for `/en/*` misses; EN page unused for real 404s | Low (but wrong for host) |
| C. SSR/edge locale | Perfect Accept-Language | Out of stack (static, no adapter) | High |

**Recommendation: A.** Detect locale from preserved pathname (`startsWith('/en')`). Use `skipLocaleRedirect` on Layout — boot redirect in `Layout.astro` would otherwise replace missing URLs with `/` or `/en/` and hide the 404. Prefer `noindex` (unlike thank-you). Optional: also honor `localStorage` locale when path has no `/en` prefix (open question).

### Affected Areas

- `src/pages/404.astro` — new static 404 entry → `404.html`
- `src/components/NotFoundPage.astro` (or similar) — glass UI: logo, visible 404, copy, massages CTA, WhatsApp (no home, no chips)
- `src/components/ThankYouPage.astro` — remove inline canvas; consume shared module
- `src/scripts/relax-flow.ts` (new) — extract init from thank-you; generic `data-relax-flow-*` hooks; multi-instance safe
- `src/data/site/es.ts`, `src/data/site/en.ts` (+ types via `getSite`) — `ui.notFound` strings (title, message, CTA labels, meta)
- `src/layouts/Layout.astro` — `skipLocaleRedirect`, `includeJsonLd={false}`, robots/meta for 404; do **not** add 404 paths to the hard-coded thank-you URL allowlist unless needed
- `openspec/specs/site-i18n/spec.md` (later delta) — 404 locale behavior
- Possibly `netlify.toml` — only if verifying 404 status needs an explicit rule (default usually enough)

### Approaches

#### 1. Routing / page shell

1. **Single `404.astro` + shared `NotFoundPage` with client locale** — Recommended.
   - Pros: Correct on Netlify; one build artifact; pathname already encodes EN when under `/en/…`
   - Cons: Must avoid FOUC and locale-redirect clash
   - Effort: Low–Medium

2. **Per-locale 404 routes only** — Not recommended for this host.
   - Pros: Cleaner Astro i18n file layout
   - Cons: Does not control Netlify’s single `404.html` behavior
   - Effort: Low (incomplete)

#### 2. Shared canvas extraction

1. **`src/scripts/relax-flow.ts` + thin markup in both pages** — Recommended (matches carousel pattern).
   - Pros: Testable-ish module boundary; thank-you + 404 share one init; rename attrs to neutral `data-relax-flow-root` / `data-relax-flow-canvas`
   - Cons: Small thank-you refactor in same change
   - Effort: Low–Medium

2. **Astro-only component with duplicated `<script>`** — Avoid.
   - Pros: Faster first paste
   - Cons: Two copies again
   - Effort: Low (debt)

3. **Canvas as separate island framework** — Overkill.
   - Effort: High

#### 3. Creative UX (within locked constraints)

Locked: bilingual; primary CTA → massages anchors; WhatsApp like thank-you; visible “404”; **no** home link; **no** quick-nav chips; thank-you visual language.

1. **Thank-you twin + 404 mark** — Recommended.
   - Same glass card / logo / dual buttons (primary = massages, secondary = WhatsApp). Visible “404” as serif display above or as the `h1`, soft supporting line under.
   - Pros: Instant brand continuity; smallest design risk
   - Cons: Less “surprise” than a more experimental layout
   - Effort: Low

2. **Large watermark 404 behind glass card** — Optional polish.
   - Pros: Strong “lost” metaphor matching copy
   - Cons: Contrast/a11y care in light+dark; more CSS tuning
   - Effort: Medium

3. **Extra playful motion beyond shared canvas** — Defer.
   - Pros: More “creative”
   - Cons: Scope creep; reduced-motion already handled in canvas
   - Effort: Medium+

### Copy recommendations

**EN (improved from seed)**

- Headline (if separate from “404”): `Looking for a massage?`
- Body (recommended): `Don't get lost in the vastness — find the perfect one for you below.`
- Alt body (closer to seed): `Were you looking for a massage? Don't get lost in the vastness. Find the perfect one for you below.`
- Primary CTA: `Explore massages`
- WhatsApp: reuse thank-you `whatsappLabel` (`Message on WhatsApp`) unless a shorter `WhatsApp` is preferred
- Meta title: `Page not found | Marta Orozco Massage`
- Meta description: `This page doesn't exist. Explore massages or message Marta on WhatsApp.`

**ES (draft from EN)**

- Headline: `¿Buscabas un masaje?`
- Body (recommended): `No te pierdas en la inmensidad: encuentra el que mejor te va abajo.`
- Alt body: `¿Buscabas un masaje? No te pierdas en la inmensidad. Encuentra el ideal para ti abajo.`
- Primary CTA: `Ver masajes`
- WhatsApp: reuse `Escribir por WhatsApp`
- Meta title: `Página no encontrada | Marta Orozco Quiromasaje`
- Meta description: `Esta página no existe. Explora los masajes o escribe a Marta por WhatsApp.`

Tone notes: keep em dash / colon calm (site voice); avoid “click here”; CTA implies the action.

### Recommendation

Ship **one static `src/pages/404.astro`** that renders a thank-you-twin `NotFoundPage` with locale chosen from pathname (`/en` prefix → EN), `skipLocaleRedirect`, `noindex`, massages primary CTA + WhatsApp secondary, visible “404”. **Extract** canvas to `src/scripts/relax-flow.ts` and retarget thank-you attrs to shared hooks in the same change so both pages stay identical visually.

### Risks

- **Locale redirect clash**: Layout boot script redirects non-matching preferred locale to `/` or `/en/` — would swallow 404 unless `skipLocaleRedirect` (or equivalent exemption).
- **Single `404.html`**: Per-locale Astro pages alone do not give Netlify bilingual 404s.
- **FOUC**: Wrong locale flash if content is swapped after paint — use inline early script or dual markup + `hidden`.
- **SEO**: 404 should be `noindex`; confirm robots meta override in Layout.
- **Review budget**: Canvas extract + new page + i18n strings may approach ~400-line PR budget — propose may need one PR or a thin extract-first slice.
- **Hash CTA**: `/#masajes` vs `/en#massages` must use `sectionIds` / existing hash map; trailing-slash consistency with site (`/en/` vs `/en`).
- **a11y**: Decorative canvas already `aria-hidden`; visible “404” must remain in accessible text (not canvas-only).

### Ready for Proposal

Yes — product decisions are locked. Orchestrator should run **sdd-propose** next. Remaining items below are technical/copy polish for propose/design, not blockers to start proposal.

### Open technical questions (post-lock)

- Prefer pathname-only locale, or pathname + `localStorage` when the missing path has no `/en` prefix?
- Primary CTA href shape: `/#masajes` vs `/#masajes` with trailing slash; EN `/en#massages` vs `/en/#massages` (match homepage canonical).
- Is visible “404” the `h1`, or a separate mark above a soft title (`Page not found` / `Página no encontrada`)?
- Confirm `noindex, nofollow` for 404 (recommended).
- Same WhatsApp inquiry text as thank-you (`meta.whatsappInquiry`), or a 404-specific prefill?
- Bundle canvas extract + 404 in one PR vs extract-first for review budget?
