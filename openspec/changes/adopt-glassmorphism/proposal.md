# Proposal: Adopt Glassmorphism

## Intent

Unify the landing page under a serene frosted-glass visual system. Today glass is partial and inconsistent (header on scroll, carousel cards, MobileBar). Visitors should feel calm continuity across chrome, cards, and controls without sacrificing readability or primary CTA contrast.

## Scope

### In Scope
- `@theme` glass tokens (blur, surface, border, shadow) for light + dark
- Subtle ambient body gradient for glass legibility
- Three tiers: **chrome** (header, drawer, MobileBar, menus), **panel** (cards, modal), **control** (secondary btn, pills, nav, inputs)
- Apply to: Header, MobileBar, drawer, theme/lang menus, PricingCard, About, Contact, Rituals, massage main panel, carousel cards/nav, BookingModal, `btn-secondary`
- Progressive enhancement: opaque fallback when `backdrop-filter` unsupported
- `forced-colors` / focus-visible preserved

### Out of Scope
- Glass on primary `btn-brand` (stay solid sage)
- Hero overlay, photos, map filters, footer chrome
- New dependencies; copy/i18n/JS contract changes
- Redesign of layout or section structure

## Capabilities

### New Capabilities
- `glass-design-system`: tokens, tiers, surface rules, fallbacks, and which UI surfaces MUST use each tier

### Modified Capabilities
- `astro-tailwind-styling`: extend `@theme` and leftover allow-list for glass widget recipes (existing carousel/btn/theme classes updated, not expanded for layout)

## Approach

**Approach A** from exploration: glass tokens in `@theme` + Tailwind utilities in `.astro`; allow-list updates only for multi-state widgets (`btn-secondary`, carousel cards, theme btn, modal hooks). Subtle frost (12–16px blur). Solid sage primary CTAs. Ambient body gradient.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/styles/global.css` | Modified | Glass tokens; unify allow-list glass recipes |
| `src/layouts/Layout.astro` | Modified | Ambient body background |
| `src/components/Header.astro` | Modified | Chrome + drawer + dropdown glass |
| `src/components/MobileBar.astro` | Modified | Chrome tier alignment |
| `src/components/Hero.astro` | Modified | Secondary CTA glass |
| `src/components/PricingCard.astro` | Modified | Panel tier |
| `src/components/About.astro` | Modified | Panel tier |
| `src/components/Massages.astro` | Modified | Main panel utilities |
| `src/components/Rituals.astro` | Modified | Panel tier |
| `src/components/Contact.astro` | Modified | Info card panel |
| `src/components/BookingModal.astro` | Modified | Modal panel + inputs |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Contrast regression on glass panels | Med | QA light/dark; keep CTAs solid |
| Blur stack perf (header + drawer) | Med | Cap blur layers; no full-page blur |
| Safari fixed/blur quirks | Med | Retest drawer stacking |
| Allow-list creep | Low | Tokens + utilities first |

## Rollback Plan

Revert branch `feat/adopt-glassmorphism`. No data migration. Restore prior `global.css` and component utility classes.

## Dependencies

- Tailwind CSS 4 `@theme`; existing `html.dark` variant
- `backdrop-filter` (Baseline); semi-opaque fallback required

## Success Criteria

- [ ] All in-scope surfaces use consistent glass tiers in light and dark
- [ ] Primary CTAs remain solid sage with readable contrast
- [ ] Body ambient gradient visible; glass panels read as frosted, not flat grey
- [ ] No new JS dependencies; `data-*`/ARIA unchanged
- [ ] Visual QA at mobile / md / lg; scrolled header; open drawer + modal; reduced motion
