# Proposal: Add ES/EN i18n

## Intent

Ship a British-English locale (`/en/`) beside Spanish (`/`) so visitors get correct `lang`, SEO alternates, and WhatsApp messages that signal English clients—without extra i18n libraries or changing Spanish copy.

## Scope

### In Scope
- Astro i18n: `defaultLocale: es`, `locales: [es, en]`, `prefixDefaultLocale: false` → `/`, `/en/`
- `getSite(locale)` with shared non-translated fields + typed es/en dictionaries
- Translate all UI/copy on EN; EN section anchors (`#about`, `#massages`, `#packages`, `#contact`, …); nav hrefs match
- WhatsApp on `/en/`: English treatment names + message body
- Header language switcher (translate icon + ES/EN + chevron; theme-like dropdown) desktop + drawer
- `site` in astro.config; `hreflang` / `rel=alternate` (es, en, x-default→es)
- Preferred-language boot script: Spain-related (`es`, `es-*`, `ca`, `gl`, `eu`) → ES; else → EN; honor `localStorage` choice; no loops / crawler-friendly skips
- Single PR on `feat/i18n-es-en` with `exception-ok` (exceeds 400-line budget)

### Out of Scope
- Extra i18n libraries; client-only dictionary swap; changing Spanish wording; locales beyond es/en

## Capabilities

### New Capabilities
- `site-i18n`: routing, `getSite(locale)`, detection/persistence, hreflang/SEO, locale WhatsApp/UI strings, EN-GB glossary

### Modified Capabilities
- `site-header`: language control next to theme (same visual language); dual widgets desktop + drawer

## Approach

Astro built-in i18n + thin `index.astro` / `en/index.astro` (optional shared shell). Refactor `site.ts` to `getSite(locale)`; keep stable treatment/ritual `id`s for client maps (stop keying on Spanish `bookingValue`). Inject UI string bag into `PageScripts` via `define:vars`. Switcher uses `getRelativeLocaleUrl` + **hash map** (ES↔EN anchors). Early inline script (theme-boot pattern) for detect/redirect; switcher writes preference to `localStorage`.

**EN-GB glossary (locked):** brand “Marta Orozco”; Quiromasajista → professional massage therapist (titles) / massage therapist; Bonos → session packs (nav `#packages`); Descontracturante → deep tissue / muscle-release; Cráneo Facial → Craniofacial.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `astro.config.mjs` | Modified | `i18n` + `site` |
| `src/data/site.ts` (+ locale modules as needed) | Modified | `getSite(locale)` |
| `src/pages/index.astro`, `src/pages/en/index.astro` | New/Modified | Locale entrypoints |
| `src/layouts/Layout.astro` | Modified | `lang`, meta, hreflang |
| `Header.astro` | Modified | Language menu |
| `BookingModal`, `PageScripts`, `Massages`, `PricingCard`, `Rituals`, `MobileBar`, `Footer`, `Contact` | Modified | Locale strings / WhatsApp |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| PR ≫ 400 lines | High | Locked `exception-ok` single PR |
| Hash switch breaks | Med | Explicit ES↔EN hash map |
| Maps break on EN labels | High | Key by stable `id` |
| Redirect loops / SEO | Med | Skip if URL matches or preference set |

## Rollback Plan

Revert `feat/i18n-es-en` (or drop `/en/` + restore Spanish-only `site.ts` / Header).

## Dependencies

- Prior header/theme patterns (FA, theme menu, `localStorage` theme boot)
- No test runner — verify via `astro build` + manual `/` and `/en/` smoke

## Success Criteria

- [ ] `/` Spanish, `/en/` British English; `html lang` + meta correct
- [ ] Switcher matches theme UI; persists choice; maps hashes across locales
- [ ] EN WhatsApp fully English; booking/maps work via ids
- [ ] hreflang es/en + x-default→es; detect respects Spain-related langs + storage
- [ ] Spanish wording unchanged

## Locked decisions

All prior explore blocking questions answered by user (content shape, hashes, WhatsApp, glossary, switcher, SEO+detect, single-PR `exception-ok`). No remaining product blockers.
