## Exploration: fix-critical-path

**Change**: `fix-critical-path`  
**Engram**: project `ruben` · topic_key `sdd/fix-critical-path/explore`  
**Baseline (authoritative, POST optimize-hero-lcp)**: LH mobile on `astro dev` — Perf **53** | FCP **5.8s** | LCP **9.3s** | TBT **340ms** | CLS **0** | TTI **11.7s**. Prior mobile LCP ~24.6s improved; score still poor. **Dev toolbar/Vite inflate bytes — verify MUST use `astro build` + `astro preview`.**

### Current State

- **`optimize-hero-lcp` apply done** (SVG→Astro Image WebP portrait ~52KB max variant; Massages demoted). Fonts/icons were **explicitly out of scope**.
- **LCP winner flipped**: report attributes LCP to hero **background** `hero.webp` (`div.hero-section … img.absolute`), not portrait. Breakdown: TTFB 33ms, resourceLoadDelay 67ms, **resourceLoadDuration 637ms**, elementRenderDelay 183ms. Master `src/assets/images/hero.webp` ≈50KB; Image has `width={1536}` `height={1024}` but **no `widths`/`sizes`** — mobile still races a full-bleed decode vs fonts.
- **Priority bug vs locked design**: `optimize-hero-lcp` task 3.1 required bg `fetchpriority="auto"`; current `Hero.astro` still has **`fetchpriority="high"` + `loading="eager"`** on bg **and** portrait also `eager`/`high` → two high-priority images. Portrait LH: ~82KB at 640w vs display ~452×896 (~41KB waste).
- **Render-blocking CDN (~450ms)**: Google Fonts CSS — Noto Sans + **Noto Serif** weights 300–700; Font Awesome 6.4.0 `all.min.css` (cdnjs).
- **Font-display chain (~660ms)**: FA solid/brands/regular woff2 (~285KB). Unused-CSS: FA ~98%. Site uses ~20 icons across solid/brands/regular.
- **Text fonts**: `@theme` maps `--font-sans`→Noto Sans, `--font-serif`→Noto Serif. Headings use `font-serif` widely (Hero, SectionHeading, Rituals, etc.). User previously chose **no serif** (Niramit / Plus Jakarta / Questrial) — Serif still loaded. **No** `fontsource`, `@astrojs/font`, lucide, unplugin-icons in `package.json`.
- **JS**: Astro `<script>` modules in Massages/Reviews call `initHorizontalCarousel` at parse — infinite Reviews clones + `getComputedStyle`/`offsetWidth` (LH forced reflow ~115ms). Below-fold but not deferred to idle/visibility.
- **Config**: `astro.config.mjs` — sitemap + i18n + Tailwind vite; no compress/prefetch/image-service overrides (defaults OK).
- **Specs coupling**: `openspec/specs/site-header/spec.md` **requires Font Awesome** for hamburger/X — FA removal needs a **MODIFIED** delta.
- **Dev false positives**: Vite client + Astro dev toolbar (aria-query/axobject ~790KB+) + unminified JS — ignore for CWV gates. Uncompressed HTML savings on localhost also non-prod.

### Affected Areas

- `src/layouts/Layout.astro` — Google Fonts + FA CDN links; head critical path
- `src/styles/global.css` — `--font-sans` / `--font-serif` tokens
- `src/components/Hero.astro` — bg Image priority + responsive widths
- `src/components/HeroPortrait.astro` — sole high vs demote; sizes/widths tune
- `src/components/Header.astro`, `MobileBar.astro`, `Contact.astro`, `Reviews.astro`, `Rituals.astro`, `Massages.astro`, `BookingModal.astro`, `PageScripts.astro` — FA class strings / dynamic `className`
- `src/data/site/shared.ts` — ritual `iconClass` FA strings
- `src/scripts/horizontal-carousel.ts` + Massages/Reviews scripts — init timing / reflow
- `openspec/specs/site-header/spec.md` — FA hamburger requirement
- `public/favicon.svg` (~70KB), logo `img`s (unsized) — secondary

### Approaches

#### A. Icons — eliminate / subset Font Awesome

1. **Inline / component SVG icons (~20 glyphs)** — Replace `<i class="fa-…">` with small Astro SVG components or sprite; drop CDN CSS+fonts.
   - Pros: Removes ~450ms CSS block + ~660ms font chain; tree-shakes unused glyphs; no runtime icon CSS.
   - Cons: Touches many components + PageScripts string HTML; must MODIFY site-header spec; brands (WhatsApp/IG/Google) need accurate SVGs.
   - Effort: Medium

2. **Self-host subset FA CSS + only used woff2** — Keep class API; ship minimal CSS.
   - Pros: Smaller change surface; keeps `iconClass` strings / JS class swaps.
   - Cons: Still webfont FOIT/FOUT; subset tooling; regular+brands+solid still multi-file; weaker than SVG kill.
   - Effort: Low–Medium

3. **lucide / unplugin-icons** — New icon system.
   - Pros: Modern DX, per-icon imports.
   - Cons: New dep + migration; brands incomplete vs FA; overkill for ~20 icons.
   - Effort: Medium–High

#### B. Text fonts — self-host + subset

1. **fontsource (or `@fontsource-variable`) self-host; drop Serif; map `--font-serif` → display sans** — e.g. body Plus Jakarta / Noto Sans subset; display Niramit (or keep one family). `font-display: swap`; preload 1–2 critical woff2.
   - Pros: Kills Google Fonts CSS RTT; aligns with user “no serif”; controllable weights (400/500/600 only).
   - Cons: Need weight/glyph subset choices; visual change if swapping families; update `@theme`.
   - Effort: Medium

2. **Keep Noto Sans only (self-host); delete Noto Serif load; remap `font-serif` → same sans with weight/tracking** — Minimal visual risk.
   - Pros: Fast win on unused Serif + weights; smaller than full brand font swap.
   - Cons: Doesn’t deliver prior Niramit/Jakarta preference; headings lose serif contrast unless restyled.
   - Effort: Low

3. **`@astrojs/font` experimental** — Not in deps; API churn risk.
   - Effort: Medium (uncertainty High)

#### C. LCP image rebalance

1. **Honor portrait-as-LCP (fix task 3.1 regression)** — Bg → `fetchpriority="auto"` (keep eager); portrait sole `high`; add bg `widths`/`sizes` for mobile (~412–828).
   - Pros: Matches hero-lcp spec lock; stops dual-high race; bg master already ~50KB.
   - Cons: If overlay makes portrait “smaller” visually, LH may still pick bg — then optimize bg as winner.
   - Effort: Low

2. **Accept bg as LCP winner** — Sole `high` on bg; portrait `lazy`/`auto` or eager+auto; responsive bg srcset; tighten quality.
   - Pros: Matches current LH element; full-bleed is true visual plane.
   - Cons: Conflicts with `hero-lcp` “portrait sole high” unless that spec is amended/archived first.
   - Effort: Low (+ spec reconcile)

3. **CSS-only bg (`background-image` / image-set)** — Avoid `<img>` LCP competition.
   - Pros: Can pair with portrait LCP.
   - Cons: Worse a11y/alt; harder responsive; fights Astro Image pipeline.
   - Effort: Medium (avoid)

#### D. JS / carousel

1. **Defer carousel init** — `requestIdleCallback` / `IntersectionObserver` until Massages/Reviews near viewport; keep forced reflow only on user scroll/loop.
   - Pros: Cuts early main-thread + reflow before LCP/FCP.
   - Cons: Nav buttons briefly wrong until init; infinite clone delay.
   - Effort: Low–Medium

2. **Rewrite metrics without sync layout thrash** — Cache widths; avoid `getComputedStyle` on hot path.
   - Pros: Smaller TBT if still init early.
   - Cons: Doesn’t remove early script parse; harder correctness for infinite loop.
   - Effort: Medium

#### E. Measurement protocol (non-negotiable process)

- Always LH against **`astro build` + `astro preview`** (or Netlify prod). Disable/ignore Astro dev toolbar.
- Do not gate success on `astro dev` scores (Vite client, unminified, no gzip).
- Record mobile moto G Power; note FCP/LCP/TBT/CLS + LCP element selector.

### Recommendation

**Ship in this change (prioritized package):**

1. **Icons A1** — Replace FA with ~20 inline SVGs; remove cdnjs; MODIFY `site-header` FA requirement → “icon (SVG)”.
2. **Fonts B1 or B2** — Prefer **B1** if user confirms Niramit + Plus Jakarta (no serif); else **B2** (self-host Sans, drop Serif) as fast path. Preload critical woff2; subset weights (drop 300/700 if unused).
3. **LCP C1 first** — Demote bg to `auto` (restore hero-lcp lock); add `widths`/`sizes` on `hero.webp`; keep one `high` winner. If preview LH still picks bg, switch to **C2** and amend hero-lcp delta in same PR or follow-up note.
4. **D1 light** — Idle/IO defer carousel init (Massages + Reviews).
5. **E** — Document verify gate: preview/prod only.

**Defer to later:** favicon/logo sizing, portrait width trim (~640→~480), compress integration, full font redesign beyond tokens, lucide.

**Out of scope:** redesign hero layout/copy; redoing portrait SVG→WebP pipeline.

### Risks

- **site-header FA MUST** blocks pure SVG replace without spec MODIFIED.
- **Dual LCP policy** — `hero-lcp` says portrait sole high; live LH says bg — reconcile explicitly.
- **Font family swap** — visual/brand regression if weights/metrics shift (CLS risk if fallback metrics poor — use `size-adjust` / similar fallbacks).
- **PageScripts** builds FA class strings / innerHTML icons — must update theme + savings HTML together.
- **Dev LH noise** — false confidence if verify skips preview.
- **Review budget** — FA+fonts+Hero touch many files; may approach/exceed 400-line PR budget → consider 2 chained units (fonts+icons | LCP+carousel).

### Ready for Proposal

**Yes** — proceed to `sdd-propose` for `fix-critical-path`. Lock with user: (1) font path B1 vs B2, (2) LCP winner portrait-vs-bg if C1 fails on preview.
