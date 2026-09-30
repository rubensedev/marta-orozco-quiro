# split-rituals-bonos

## Objective
Split combined Rituals/Bonos into two peer sections; show both in header with a denser fluid nav.

## Problem
Rituals + Bonos share one `#bonos` block and one nav link; Rituales is missing from the header.

## Scope
- Separate `Rituals.astro` / `Packages.astro`
- `sectionIds.rituals` + nav/footer/hashes (ES+EN)
- Header: both links + fluid density so 6 items fit at `lg`

## Constraints
- Keep existing bonos UI/WA CTAs
- Match peer section pattern (`SectionHeading` + Massages-like shell)
- No commit unless asked

## Tasks
- [x] T1 Data: sectionIds, nav, footer, copy, hashes
- [x] T2 Split components + HomePage order
- [x] T3 Header density + locale hash maps
- [x] T4 Check / smoke build

## Progress
- `npm run check` 0 errors; `npm run build` OK
- Nav: fluid `clamp` gap/type + `flex-1` centered

## Acceptance
- Two top-level sections with distinct ids
- Header + mobile drawer show Rituales/Rituals and Bonos/Packages
- Desktop nav does not overflow at `lg`
