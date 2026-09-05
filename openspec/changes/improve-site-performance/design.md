# Design: Improve Site Performance

## Technical Approach

Kill remaining CWV floor after `fix-critical-path`: self-host **Noto Sans** + **Noto Serif** via fontsource (drop GFonts/FA CDN; **no family swap**), replace ~20 FA glyphs with local SVG icons, fix AboutStats/Footer image attrs. Maps capability `site-perf-assets` + MODIFIED `site-header` hamburger.

**User lock (2026-09-05):** Keep Noto as used now. Reject B1 (Niramit + Plus Jakarta). Do **not** manually download from Google Fonts into `public/` — use npm `@fontsource/*` packages; Vite/Astro emit `.woff2` into `dist/`.

## Architecture Decisions

| Decision | Options | Tradeoff | Choice |
|----------|---------|----------|--------|
| Font family | B1 Niramit+Jakarta / B2 Sans-only / B2+ keep both Noto | B1 = visual brand change (rejected); Sans-only changes headings | **B2+: Noto Sans + Noto Serif** (match live tokens) |
| Font shipping | Manual Google zip → `public/fonts` / fontsource / `@astrojs/font` | Manual = busywork; B3 churn | **`@fontsource/noto-sans` + `@fontsource/noto-serif`** (latin CSS per weight) |
| Weights | Mirror CDN 300–700 / subset | Site uses light/normal/medium/semibold; no `font-bold` | **300, 400, 500, 600** both families; **drop 700** |
| Token map | Remap to new faces / keep Noto names | Remap unnecessary if keeping Noto | **Unchanged:** `--font-sans`→Noto Sans; `--font-serif`→Noto Serif |
| Critical preload | None / one / two | First viewport uses Serif headings + Sans body | **Preload Noto Serif 400 + Noto Sans 400** woff2 |
| Icon system | per-file SVG / lucide / FA subset | Lucide out (A3); FA subset out (A2) | **`src/components/icons/`** — `Icon.astro` + one SVG path module per glyph |
| Dynamic FA (PageScripts) | className swap / dual SVG + `hidden` | className needs FA CSS | **Dual/triple SVG siblings + `hidden`**; theme via `data-theme-icon={pref}` show/hide |
| Brand marks | FA brands / simple path SVGs | License + size | Simple recognizable paths (WhatsApp/IG/Google); no FA kit |

## Icon inventory (20)

| id | Current FA | Used in |
|----|------------|---------|
| `bars` / `xmark` | fa-bars / fa-xmark | Header hamburger; PageScripts toggle |
| `sun` / `moon` / `circle-half-stroke` | theme | Header options + PageScripts theme button |
| `language` | fa-language | Header locale |
| `chevron-down` / `chevron-left` / `chevron-right` | chevrons | Header, MobileBar, Contact, Massages, Reviews |
| `check` | fa-check | Header menus |
| `tag` | fa-tag | Rituals, PageScripts savings HTML |
| `whatsapp` / `instagram` / `google` | brands | Contact, Rituals, Reviews, BookingModal |
| `clock` / `location-dot` | clock / pin | Contact |
| `arrow-right` | fa-arrow-right | Massages CTA |
| `star` | fa-star | Reviews |
| `spa` / `feather-pointed` | ritual icons | `shared.ts` → Rituals |

## Data flow

```
npm @fontsource/noto-* ──import CSS──→ Layout.astro / build → dist/*.woff2
global.css tokens (unchanged) → font-sans / font-serif utilities
Icon.astro(name, class) ← components / Rituals(icon id from shared)
PageScripts ──toggle hidden on SVG nodes──→ hamburger + theme (no FA class strings)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `package.json` / lock | Modify | Add `@fontsource/noto-sans`, `@fontsource/noto-serif` |
| `src/layouts/Layout.astro` | Modify | Drop GFonts preconnect/CSS + FA CDN; import fontsource CSS for weights 300–600; `<link rel="preload" as="font">` for Noto Sans 400 + Noto Serif 400 woff2 |
| `src/styles/global.css` | Keep tokens | No family remap required |
| `src/components/icons/*.astro` + `Icon.astro` | Create | 20 glyphs + thin wrapper (`name`, `class`, `aria-hidden`) |
| `Header.astro` | Modify | SVG icons; themeOptions `icon` → icon id; dual hamburger SVGs |
| `PageScripts.astro` | Modify | Remove FA class maps; `hidden` toggles; savings HTML uses `<svg>` or Icon markup string |
| `MobileBar`, `Contact`, `Reviews`, `Massages`, `Rituals`, `BookingModal` | Modify | `<i class="fa-…">` → `<Icon name="…" />` |
| `src/data/site/shared.ts` + `index.ts` | Modify | `iconClass` → `icon: "spa" \| "feather-pointed"` |
| `AboutStats.astro` | Modify | C1: `widths={[400,640,960]}`, `sizes` ≈ section width (`min(1120px, calc(100vw - 2rem))`), keep lazy |
| `Footer.astro` | Modify | C2: `width="300" height="56"` (h-14 scale of header 214×40) |
| `openspec/.../specs/site-header/spec.md` | Modify | Hamburger FA → inline SVG (still not CSS bars) |

## Interfaces / Contracts

```ts
// Icon.astro props
type IconName =
  | "bars" | "xmark" | "sun" | "moon" | "circle-half-stroke"
  | "language" | "chevron-down" | "chevron-left" | "chevron-right"
  | "check" | "tag" | "whatsapp" | "instagram" | "google"
  | "clock" | "location-dot" | "arrow-right" | "star"
  | "spa" | "feather-pointed";

// shared rituals
icon: "spa" | "feather-pointed"; // replaces iconClass string
```

PageScripts: query `[data-mobile-menu-icon-bars]` / `[data-mobile-menu-icon-x]` (or parent `[data-mobile-menu-icon]` children); theme icons `[data-theme-icon="light|dark|system"]` siblings — toggle `hidden`, never rewrite `className` to FA.

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | N/A | No test runner |
| Integration | Build + check | `npm run check`; `npm run build`; grep dist — no `fonts.googleapis`, `cdnjs`, `font-awesome`; Noto woff2 present |
| E2E / CWV | Preview or Netlify | Mobile LH vs 87 / 1.9 / 3.9 / 0; cite render-blocking delta; **never** `astro dev` |
| Visual | Smoke | Headings still Serif; body Sans; `font-light` stats still light |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No data migration. Chained PRs if authored diff >~400 lines:

1. **PR1 — Icons**: icon components + all FA call sites + PageScripts + `shared.ts` + Layout FA link removal + site-header delta  
2. **PR2 — Fonts + images**: fontsource Noto deps, Layout GFonts→self-host/preload, AboutStats C1, Footer C2  

Single PR OK only if forecast stays Low/Medium under budget.

## Open Questions

- [ ] Exact woff2 preload paths after install (resolve from `node_modules/@fontsource/noto-*/files/` or built hashed URLs)
- [ ] Whether latin-ext is required beyond latin for Spanish accents (start latin; widen if FOIT/fallback appears)
