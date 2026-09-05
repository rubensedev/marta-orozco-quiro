```yaml
schema: gentle-ai.verify-result/v1
change: optimize-hero-lcp
status: pass
summary: >
  Portrait SVG→WebP Astro Image pipeline applied. Optional Phase 6 LH superseded by
  fix-critical-path Netlify moqtest Perf 87 / LCP 3.9s (C2 bg sole high). Ready to archive;
  hero-lcp main specs already updated via fix-critical-path archive (C2).
requirements_total: 0
requirements_passed: 0
scenarios_total: 0
scenarios_passed: 0
tasks_complete: true
blocking_failures: []
warnings:
  - Phase 6 optional LH marked complete by supersession; authoritative CWV is fix-critical-path verify
  - Do not re-sync portrait-sole-high over main hero-lcp C2
evidence:
  - apply commits: 1abd288 lineage + 7c2ffba C2 refinements
  - C gate: portrait variants ≤~53KB
  - superseding verify: openspec/changes/archive/2026-09-05-fix-critical-path/verify-report.md
```

# Verify Report: optimize-hero-lcp

**Verdict**: PASS (superseded CWV by fix-critical-path)  
**Date**: 2026-09-05

## Final state

- SVG portrait removed; WebP via Astro Image from `src/assets`
- Later `fix-critical-path` set bg as sole `fetchpriority="high"` (C2) and verified Perf 87 on moqtest
- Optional tasks 6.1/6.2 closed as superseded

## Archive caution

Main `openspec/specs/hero-lcp` already reflects C2 from `fix-critical-path` archive. Archiving this change MUST NOT overwrite main with the older portrait-sole-high delta.
