## Exploration: add-i18n-es-en

### Current State
Spanish-only Astro 7.2 SPA landing. No `i18n` in `astro.config.mjs`. All copy lives in `src/data/site.ts` (meta, nav, hero/about/massages/rituals/contact, treatments, rituals, bono tiers, booking options). Single page `src/pages/index.astro` composes Header → sections → Footer/MobileBar/BookingModal/PageScripts under `Layout` (`html lang` from `siteMeta.lang = "es"`).

Hardcoded Spanish also sits outside `site.ts`:
- `Header.astro` — theme labels (Claro/Oscuro/Dispositivo), aria-labels, “RESERVAR AHORA”
- `BookingModal.astro` — full form chrome + placeholders
- `PageScripts.astro` — pricing pills (“Duración”, “Tipo de compra”, “Ahorras…”, “€ / sesión”), “minutos”, menu aria-labels, WhatsApp `bookingMessage()` template
- `Massages.astro` — “Reservar {title}”, carousel aria-labels; client script rebuilds CTA text
- `PricingCard.astro` / `Rituals.astro` / `MobileBar.astro` / `Footer.astro` — Reservar CTAs, copyright

Client JS keys treatments/rituals by **Spanish `bookingValue` strings** (`treatmentMap` / `ritualMap`, `data-treatment`). Theme preference uses `localStorage` (locale-independent); language must be **URL navigation**, not client swap.

### Affected Areas
- `astro.config.mjs` — add `i18n: { defaultLocale: "es", locales: ["es","en"], routing: { prefixDefaultLocale: false } }`
- `src/pages/index.astro` + new `src/pages/en/index.astro` — thin locale entrypoints (ES `/`, EN `/en/`)
- `src/data/site.ts` (+ likely `getSite(locale)` or `src/data/i18n/{es,en}.ts`) — dual strings; shared ids/prices/images
- `src/layouts/Layout.astro` — `Astro.currentLocale`, `lang`, title/description from locale site
- `src/components/Header.astro` — language control beside theme; `getRelativeLocaleUrl` + hash
- `BookingModal.astro`, `PageScripts.astro`, `Massages.astro`, `PricingCard.astro`, `Rituals.astro`, `MobileBar.astro`, `Footer.astro`, `Contact.astro` — consume locale strings; WhatsApp templates locale-aware
- Optional: `site` in Astro config if absolute `hreflang` / `getAbsoluteLocaleUrl` desired (not set today)

### Approaches
1. **Astro built-in i18n + `getSite(locale)` (recommended)** — Config routing; shared page shell; one data API merging shared structure + locale strings; Header navigates with `getRelativeLocaleUrl` + hash; pass `ui` + localized treatments into `PageScripts` via `define:vars`.
   - Pros: Matches locked stack; single content API; fits SPA size; SSR/`lang` correct per URL
   - Cons: Touch many components; PageScripts string surface is large; dual EN copy volume
   - Effort: Medium–High

2. **Astro i18n + `src/data/i18n/{es,en}.ts`** — Same routing; split locale modules + thin `shared.ts` for ids/prices/images.
   - Pros: Clear file split; easy side-by-side EN review
   - Cons: More files/imports; risk of drift without shared types
   - Effort: Medium–High

3. **Client dictionary swap (out of scope)** — One URL, swap strings in JS.
   - Pros: No route duplication
   - Cons: Wrong `lang`/SEO; conflicts with locked navigate-between-locales rule
   - Effort: Medium (rejected)

4. **Extra i18n library (out of scope)** — e.g. paraglide / i18next.
   - Pros: Tooling for larger apps
   - Cons: Unnecessary for one landing; locked out
   - Effort: High (rejected)

### Recommendation
Use **Approach 1**: Astro i18n with `defaultLocale: "es"`, `locales: ["es","en"]`, `prefixDefaultLocale: false`; `getSite(locale)` (or equivalent) keeping **stable `id`s** for JS maps while display/`bookingValue` strings are per-locale; language switcher in Header next to theme via `getRelativeLocaleUrl` + preserve `location.hash` when possible; Layout sets `html lang` + meta from active locale; move all hardcoded ES UI into locale data; EN-GB faithful translation only; WhatsApp inquiry + booking message templates from locale data.

Prefer **stable Spanish section hashes** (`#masajes`, etc.) on both locales so language switch + hash works without a hash map — confirm with user.

Key implementation notes:
- Thin `src/pages/en/index.astro` mirroring root page (shared `HomePage.astro` optional to avoid duplication).
- Refactor maps in `PageScripts` / Massages to key by `treatment.id` / `ritual.id`, not Spanish `bookingValue`.
- Inject UI copy bag into client scripts (`minutos`, pricing labels, booking message fields, “Reservar …” prefix).
- Do not change Spanish wording.

### Risks
- **400-line review budget**: dual content + Header/PageScripts/Massages likely High; expect chained PRs or `size:exception`
- **bookingValue coupling**: if EN display strings change without id-based maps, booking modal / pricing / WhatsApp break
- **Hash mismatch**: translated EN anchors would break preserve-hash unless a hash map exists
- **No `site` config**: absolute alternate URLs / hreflang incomplete unless added
- **No test runner**: verify via `astro build` + manual `/` and `/en/` smoke (theme, modal, WhatsApp, switcher+hash)
- **EN terminology**: “Quiromasajista”, “Bonos”, treatment names need explicit EN-GB choices

### Ready for Proposal
**No** — answer clarifying questions below first, then run `sdd-propose`.

### Clarifying questions (blocking)
1. **Content module shape**: confirm `getSite(locale)` in/near `site.ts`, or split `src/data/i18n/{es,en}.ts` + shared?
2. **Section IDs / hashes**: keep Spanish ids (`#sobre-mi`, `#masajes`, `#bonos`, `#contacto`) on both locales (recommended for hash preserve), or translate EN anchors?
3. **WhatsApp product names**: on `/en/`, should treatment/ritual names in the prefilled message be **English**, or stay **Spanish** (easier for Marta) while chrome/labels are EN?
4. **EN-GB glossary** (pick one each): Quiromasajista → Massage therapist / Manual therapist / keep “Quiromasajista”? Bonos → Vouchers / Packages / Multi-session deals? Descontracturante → Deep tissue / Decontracting / Sports/tension relief? Cráneo Facial → Craniofacial / Face & scalp?
5. **Language switcher UI**: compact `ES | EN` text control next to theme (desktop + drawer), or icon/menu? Any flag imagery?
6. **SEO**: add `site` + `hreflang`/`rel=alternate` now, or defer?
7. **Delivery**: accept likely High 400-line risk as one PR (`size:exception`) or plan chained PRs (routing+shell → content EN → client UI strings)?
