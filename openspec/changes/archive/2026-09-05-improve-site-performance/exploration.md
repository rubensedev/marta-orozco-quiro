## Exploration: improve-site-performance

**Change**: `improve-site-performance`  
**Engram**: project `ruben` · topic_key `sdd/improve-site-performance/explore`  
**Relationship**: **Follows / depends on** `fix-critical-path` (applied + pushed; moqtest mobile Perf **87** / FCP **1.9s** / LCP **3.9s** / TBT **0**). This change is the deferred fonts/icons work previously named `optimize-fonts-icons` in that proposal’s Out of Scope.  
**Baseline (authoritative remaining floor, moqtest ~2026-09-05T09:22Z)**: Render-blocking ~**890ms** (GFonts + FA CDN + layout CSS); FA unused CSS ~**98%** (~18 KiB); FA woff2 font-display ~**285 KB**; About-stats Image delivery ~**37 KiB** waste; footer logo unsized; favicon.svg ~**42–70 KB** secondary.

### Current State

- **`fix-critical-path` recovered CWV** (hero bg sole `high` + srcset; portrait `auto` + 240/320/480; deferred carousels; header logo sized). **FA + Google Fonts left untouched** by design.
- **`Layout.astro` still loads**:
  - Google Fonts CSS: Noto Sans + **Noto Serif** weights **300–700** (`display=swap`) + preconnects
  - Font Awesome **6.4.0** `all.min.css` from cdnjs
- **`global.css` `@theme`**: `--font-sans: "Noto Sans"`; `--font-serif: "Noto Serif"`. Headings/`font-serif` used widely (Hero, SectionHeading, About, Massages, Rituals, PricingCard, AboutStats, BookingModal). User history: **no serif**; preferred **Niramit + Plus Jakarta**.
- **`package.json`**: Astro 7 + Tailwind 4 + sitemap + check only. **No** `fontsource`, `@fontsource-*`, `@astrojs/font`, lucide, unplugin-icons.
- **FA usage**: **20 unique glyphs** across solid/brands/regular (`bars`, `xmark`, `sun`, `moon`, `circle-half-stroke`, `language`, chevrons, `check`, `tag`, `whatsapp`, `instagram`, `google`, `clock`, `location-dot`, `arrow-right`, `star`, `spa`, `feather-pointed`). Touch points: Header, MobileBar, Contact, Reviews, Massages, Rituals, BookingModal, PageScripts (className swaps + innerHTML), `shared.ts` `iconClass`.
- **`site-header` spec**: hamburger **MUST** use Font Awesome — SVG replace needs **MODIFIED** delta (icon SVG, not CSS bars).
- **AboutStats**: decorative `Image` of full `hero.webp` (~50 KB master) **without** `widths`/`sizes` — LH ~52 KB served for ~348×281 display (~37 KiB delivery waste). `loading="lazy"` already.
- **Footer logo**: `/assets/images/logo.svg` with `h-14 w-auto` — **no** `width`/`height` (header already has 214×40 from fix-critical-path).
- **Favicon**: `public/favicon.svg` ~70 KB on disk — secondary; not first-viewport CWV.
- **Hero LCP C2**: done — **out of re-litigation**.

### Affected Areas

- `src/layouts/Layout.astro` — remove GFonts + FA CDN; add self-hosted font CSS / preloads
- `src/styles/global.css` — remap `--font-sans` / `--font-serif` tokens (serif → display sans)
- `src/components/Header.astro`, `PageScripts.astro` — hamburger/theme icon class swaps → SVG or data attributes
- `MobileBar.astro`, `Contact.astro`, `Reviews.astro`, `Massages.astro`, `Rituals.astro`, `BookingModal.astro` — FA `<i>` → SVG components
- `src/data/site/shared.ts` (+ type in `index.ts`) — ritual `iconClass` → icon id / component key
- `src/components/AboutStats.astro` — responsive `widths`/`sizes` (mirror Hero pattern)
- `src/components/Footer.astro` — logo intrinsic `width`/`height`
- `openspec/specs/site-header/spec.md` — MODIFIED hamburger FA requirement
- `package.json` — likely `@fontsource-variable/*` or static fontsource packages
- Optional later: `public/favicon.svg` compress/simplify

### Approaches

#### A. Icons — kill / subset Font Awesome

1. **A1 Inline / Astro SVG icon set (~20 glyphs)** — Drop CDN CSS + FA fonts entirely.
   - Pros: Removes largest remaining block + ~285 KB font-display; kills ~98% unused FA CSS; tree-shaken.
   - Cons: Touches many files; PageScripts must swap SVG/`innerHTML` or toggle `hidden` on two icons; brands need accurate SVGs; **site-header MODIFIED**.
   - Effort: Medium

2. **A2 Self-host subset FA CSS + used woff2 only** — Keep class API.
   - Pros: Smaller diff surface; `iconClass` / `className` swaps stay.
   - Cons: Still webfont FOIT/FOUT; multi-style files; weaker win than kill.
   - Effort: Low–Medium

3. **A3 lucide / unplugin-icons** — New system.
   - Pros: DX / per-import tree-shake.
   - Cons: New dep; brands incomplete vs FA; overkill for 20 icons.
   - Effort: Medium–High

#### B. Text fonts — self-host + subset (prior art still valid)

1. **B1 fontsource self-host; Niramit (display) + Plus Jakarta (body); map `--font-serif` → Niramit** — Drop GFonts + Serif load; subset weights (~400/500/600); `font-display: swap`; preload 1–2 critical woff2.
   - Pros: Matches user “no serif” + prior font choice; kills GFonts RTT/CSS block.
   - Cons: Visible brand shift vs live Noto; fallback metrics / CLS if poorly matched.
   - Effort: Medium

2. **B2 Self-host Noto Sans only; drop Serif; remap `font-serif` → Sans** — Minimal family change.
   - Pros: Faster path; less visual surprise.
   - Cons: Ignores Niramit/Jakarta preference.
   - Effort: Low

3. **B3 `@astrojs/font` experimental** — Not in deps; API churn.
   - Effort: Medium (uncertainty High) — avoid unless researched later.

#### C. Image / CLS leftovers (small, high confidence)

1. **C1 AboutStats responsive Image** — Add `widths`/`sizes` (and modest quality) so mobile gets ~display-fit bytes, not full hero master.
   - Pros: Direct LH “image delivery” hit; pattern already proven on Hero.
   - Cons: None material.
   - Effort: Low

2. **C2 Footer logo width/height** — Match header intrinsic attrs (scale for `h-14`).
   - Pros: Clears unsized-image audit; trivial.
   - Effort: Low

3. **C3 Favicon SVG slim** — Optional / secondary.
   - Effort: Low (defer unless easy)

#### D. Verify protocol

- LH only on **`astro build` + `astro preview`** or Netlify (`moqtest` / prod). Never gate on `astro dev`.
- Compare vs current floor: Perf 87 / FCP 1.9 / LCP 3.9 / TBT 0; expect FCP/render-block drop from fonts/icons.

### Recommendation

**Prioritized package for this change (single capability theme: remaining CWV floor):**

1. **Icons A1** — Replace FA with ~20 SVGs; remove cdnjs; MODIFY `site-header` FA → SVG icon requirement; update PageScripts theme + menu toggles + savings HTML.
2. **Fonts B2+ (user lock 2026-09-05)** — Self-host **Noto Sans + Noto Serif** via `@fontsource/noto-sans` + `@fontsource/noto-serif` (npm; **no** manual Google zip → `public/`); keep tokens unchanged; drop GFonts; weights **300/400/500/600** (drop unused 700); preload Sans 400 + Serif 400; `font-display: swap`.
3. **C1 AboutStats** — `widths`/`sizes` on decorative hero reuse.
4. **C2 Footer logo** — `width`/`height`.
5. **D** — Preview/prod LH verify; record FCP/LCP/TBT + render-blocking delta.

**Rejected / defer:** B1 Niramit+Jakarta (user rejected); A2/A3; Sans-only drop-Serif; C3 favicon; hero LCP rework; SEO HTML trim; redesign.

**Out of scope:** Re-litigating hero LCP C2; major layout/copy redesign; compress plugin as primary goal; manual Google Fonts download into project folder.

**PR budget:** FA+fonts touch many files — forecast may approach **400-line** budget → propose may recommend 2 chained units (icons | fonts+images) if diff grows.

### Risks

- **site-header FA MUST** — SVG replace blocked without MODIFIED delta.
- **PageScripts className/innerHTML** — hamburger + theme + savings must move off FA class strings together.
- **Accent / subset coverage** — latin (+ latin-ext if needed) for Spanish glyphs.
- **Brand SVG accuracy** — WhatsApp / IG / Google marks must be recognizable and license-safe (simple brand paths).
- **Review size** — multi-file icon migration may need chained PRs.
- **Dev LH noise** — verify must stay on preview/prod.

### Ready for Proposal

**Yes** — locked to **B2+** (keep Noto Sans + Serif, fontsource self-host) after user override; **A1** over A2; include C1+C2; depends on completed `fix-critical-path`. Planning artifacts updated 2026-09-05.
