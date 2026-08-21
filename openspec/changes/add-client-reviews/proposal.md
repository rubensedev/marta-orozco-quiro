# Proposal: Add Client Reviews Section

## Intent

Social-proof section before Contact for visitors with booking doubts (`#testimonios`), matching existing carousel language.

## Scope

### In Scope

- **¿Tienes dudas?** + locked intro; cards: 5 yellow stars, italic quote, bold name, treatment subtitle.
- ≥8 invented Spanish mocks in `site.ts` (drafts: `exploration.md`).
- Infinite reviews carousel (manual + drag; no autoplay); massage stays finite via shared `infinite` param.
- Nav **TESTIMONIOS** → `#testimonios`; after Rituals/Bonos, before Contact; no Reservar CTA.

### Out of Scope

CMS/Google APIs; massage infinite; autoplay/marquee; `SectionHeading` redesign; consent flows; real quotes (mocks intentional v1).

## Locked decisions

| Topic | Decision |
|-------|----------|
| Placement / nav | After Rituals → before Contact; `TESTIMONIOS` / `#testimonios` |
| Card / carousel | Treatment subtitle; reviews infinite; massages finite; shared reuse |
| Autoplay / stars / CTA | None / always 5 yellow / text-only |

**Intro:** Desde 2021 he acompañado a más de 1.500 personas en su camino hacia el bienestar. Estas voces cuentan cómo se sintieron después de la sesión — por si te ayuda a dar el paso.

Question round: **closed** (locked — do not reopen).

## Capabilities

### New Capabilities

- `client-reviews`: content/model, cards, infinite carousel, `#testimonios` nav, massage finite invariant.

### Modified Capabilities

- None

## Approach

**A.** Data-first + parameterized shared carousel (exploration Approach 1).

1. `reviewsContent` + `reviews[]` in `src/data/site.ts`.
2. New `Reviews.astro` (+ optional `src/scripts/horizontal-carousel.ts`).
3. Shared track/nav/drag; `infinite: true` = clone + seamless `scrollLeft` jump; massage `false` keeps end disable.
4. Nav before Contact; mount Rituals → Reviews → Contact; Tailwind cards; leftover CSS only for carousel; FA + amber stars.

## Affected Areas

| Area | Impact |
|------|--------|
| `src/data/site.ts` | `navItems`, reviews data |
| `src/components/Reviews.astro` | New |
| `src/pages/index.astro` | Mount order |
| `src/styles/global.css` / `Massages.astro` | Shared/infinite if extracted |
| `src/components/Header.astro` | Unchanged |

## Risks

| Risk | L | Mitigation |
|------|---|------------|
| Massage ends regress | Med | `infinite` flag + check |
| Loop jump visible | Med | Exact set-width jump |
| Mock distrust / PR size | Med | Intentional v1; chain if >400 lines |

## Rollback Plan

Remove section/nav/data; revert shared carousel; restore `index.astro` (or revert feature branch).

## Dependencies

Massage carousel CSS/JS; `navItems` → Header; treatment/ritual titles.

## Success Criteria

- [ ] `#testimonios` after Rituals, before Contact; locked title/body.
- [ ] ≥8 mocks; 5 yellow stars + quote + name + treatment subtitle.
- [ ] Reviews loop; no autoplay; massage finite; nav works; no Reservar.
- [ ] `npx astro check` clean after apply.

## Approval

**Ready for user approval.** Next: `sdd-spec` + `sdd-design` (parallel).
