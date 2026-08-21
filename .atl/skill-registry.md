# Skill Registry

Generated for `marta-orozco-quiro` (SDD init refresh, 2026-08-21).

## Project conventions

| File | Path | Notes |
|------|------|-------|
| README | `README.md` | Stack, scripts, structure |
| OpenSpec config | `openspec/config.yaml` | Hybrid persistence, styling rules, `strict_tdd: false` |

## Skills index

Skip `sdd-*`, `_shared`, and `skill-registry` from execution indexes (orchestrator loads SDD phases separately).

| name | triggers | path | scope |
|------|----------|------|-------|
| modern-web-guidance | HTML/CSS, clientside JS, UI layout, scroll/motion, CWV, Tailwind in components | `C:/Users/ruben/.cursor/plugins/cache/cursor-public/modern-web-guidance/1dee00c2ae94d2e0c26d4a0c9fecb87c52bd82f9/skills/modern-web-guidance/SKILL.md` | user/plugin |
| chrome-extensions | Chrome extension, Manifest V3, content script, service worker | `C:/Users/ruben/.cursor/plugins/cache/cursor-public/modern-web-guidance/1dee00c2ae94d2e0c26d4a0c9fecb87c52bd82f9/skills/chrome-extensions/SKILL.md` | user/plugin |
| branch-pr | pull request, PR creation, reviewable PR | `C:/Users/ruben/.cursor/skills/branch-pr/SKILL.md` | user |
| work-unit-commits | commit splitting, work units, chained PRs with tests/docs | `C:/Users/ruben/.cursor/skills/work-unit-commits/SKILL.md` | user |
| chained-pr | PRs over 400 lines, stacked PRs, review slices | `C:/Users/ruben/.cursor/skills/chained-pr/SKILL.md` | user |
| cognitive-doc-design | guides, READMEs, RFCs, onboarding docs | `C:/Users/ruben/.cursor/skills/cognitive-doc-design/SKILL.md` | user |
| comment-writer | PR feedback, issue replies, Slack/GitHub comments | `C:/Users/ruben/.cursor/skills/comment-writer/SKILL.md` | user |
| issue-creation | GitHub issues, bug reports, feature requests | `C:/Users/ruben/.cursor/skills/issue-creation/SKILL.md` | user |
| systemic-issue-triage | triage, backlog flood, root-class issues | `C:/Users/ruben/.cursor/skills/systemic-issue-triage/SKILL.md` | user |
| skill-creator | new skills, agent instructions | `C:/Users/ruben/.cursor/skills/skill-creator/SKILL.md` | user |
| skill-improver | audit/upgrade skills | `C:/Users/ruben/.cursor/skills/skill-improver/SKILL.md` | user |
| rdd-defect-workflow | RDD, receipt-driven development, review defects | `C:/Users/ruben/.cursor/skills/rdd-defect-workflow/SKILL.md` | user |
| judgment-day | dual review, adversarial review, juzgar | `C:/Users/ruben/.cursor/skills/judgment-day/SKILL.md` | user |
| go-testing | Go tests, teatest, golden files | `C:/Users/ruben/.cursor/skills/go-testing/SKILL.md` | user |
| gentle-ai-bench | bench journeys, driven mode | `C:/Users/ruben/.cursor/skills/gentle-ai-bench/SKILL.md` | user |

## Current project notes

- Stack: Astro 7 + Tailwind CSS 4 (`@tailwindcss/vite`), TypeScript, Spanish single-page landing.
- Styling: Tailwind utilities in `.astro` templates; leftover named CSS only via allow-list in `src/styles/global.css` (e.g. massage carousel). No Sass. Dark mode via `html.dark`.
- Content/nav source: `src/data/site.ts` (`navItems`, section copy).
- Massage carousel: `Massages.astro` + `.massage-carousel*` in `global.css` — finite scroll (nav disables at ends); not infinite today.
- Persistence: hybrid (`openspec/` + Engram `memory_project: marta-orozco-quiro`).
- Strict TDD: disabled (no unit/integration/E2E runner). Optional typecheck: `npx astro check`.
- Active feature change: `openspec/changes/add-client-reviews/`.
