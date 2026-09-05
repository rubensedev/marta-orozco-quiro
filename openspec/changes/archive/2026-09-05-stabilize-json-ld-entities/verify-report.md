```yaml
schema: gentle-ai.verify-result/v1
evidence_revision: sha256:2d04f28f617a4efa05604badc9b957787b067674b915cc426223be0946651a81
verdict: pass_with_warnings
blockers: 0
critical_findings: 0
requirements: 4/4
scenarios: 4/4
test_command: node -e "dist ES+EN JSON-LD smoke (stable IDs + hasMap + NAP; SMOKE_OK)"
test_exit_code: 0
test_output_hash: sha256:992182a04ca818f3f3c7d3040c01257b2fe387425a881ec2eefe1dfeb4f6ec06
build_command: npm run build
build_exit_code: 0
build_output_hash: sha256:6721cf6823c73b12f840bfd4938b27eaca9f12ad160516b16f5cef7dd53dbc45
```

## Verification Report

**Change**: stabilize-json-ld-entities
**Version**: N/A (delta ADDED seo-json-ld)
**Mode**: Standard
**Commit**: cb873f3
**Branch**: feat/improved-seo
**Issue**: #8

### Completeness
| Metric | Value |
|--------|-------|
| Tasks total | 16 |
| Tasks complete | 15 |
| Tasks incomplete | 1 (5.5 manual Rich Results / Schema.org — accepted residual) |

### Build & Tests Execution
**Build**: ✅ Passed
```text
npm run build → exit 0
astro static build: /index.html + /en/index.html; sitemap written
build_output_hash: sha256:6721cf6823c73b12f840bfd4938b27eaca9f12ad160516b16f5cef7dd53dbc45
```

**Tests**: ✅ 1 passed (dist JSON-LD smoke) / ❌ 0 failed / ⚠️ external Rich Results not runnable
```text
node dist ES+EN JSON-LD smoke → exit 0; SMOKE_OK
es PASS + en PASS for: /#business, /#person, /#website, #webpage, #service-*, #faq,
place_id:ChIJE7KlJmBtEg0Rn-RGXchxER0, hasMap, NAP telephone/street, goo.gl sameAs,
provider @id refs, locale webpage ids; absent /en/#business
test_output_hash: sha256:992182a04ca818f3f3c7d3040c01257b2fe387425a881ec2eefe1dfeb4f6ec06
```

**Coverage**: ➖ Not available (no unit coverage runner; strict_tdd: false)

### Spec Compliance Matrix
| Requirement | Scenario | Test | Result |
|-------------|----------|------|--------|
| Stable business and person entity IDs | ES and EN share business @id | `npm run build` + node dist smoke | ✅ COMPLIANT |
| WebSite and WebPage nodes | Graph includes site and page | `npm run build` + node dist smoke | ✅ COMPLIANT |
| Stable service IDs and business provider refs | Services reference business | `npm run build` + node dist smoke | ✅ COMPLIANT |
| Existing types remain valid; NAP unchanged | NAP and FAQ preserved | dist NAP/sameAs + FAQPage/HealthAndBeautyBusiness structure smoke (design Manual Rich Results = accepted residual; not invented PASS) | ✅ COMPLIANT |

**Compliance summary**: 4/4 scenarios compliant (external Rich Results layer residual/manual per design; local covering smoke passed)

### Correctness (Static Evidence)
| Requirement | Status | Notes |
|------------|--------|-------|
| Stable business and person entity IDs | ✅ Implemented | `businessId`/`personId` via `new URL("/#…", siteOrigin)`; ES+EN share origin IDs |
| WebSite and WebPage nodes | ✅ Implemented | WebSite origin `#website`; WebPage `${canonicalPageUrl}#webpage`; BCP-47 es-ES/en-GB |
| Stable service IDs and provider refs | ✅ Implemented | `#service-{id}` + `provider: { "@id": businessId }`; no Service url |
| Existing types remain valid; NAP unchanged | ✅ Implemented | NAP from sharedMeta/businessInfo; goo.gl sameAs retained; FAQPage present; Place ID hasMap additive |

### Coherence (Design)
| Decision | Followed? | Notes |
|----------|-----------|-------|
| Origin-rooted business/person/website IDs | ✅ Yes | Matches locked IDs |
| getRelativeLocaleUrl canonical | ✅ Yes | Same as Layout |
| WebSite bilingual inLanguage | ✅ Yes | `["es-ES","en-GB"]` |
| Service omit url; provider @id | ✅ Yes | |
| FAQ isPartOf webpage | ✅ Yes | |
| SeoJsonLd-only; Layout/config untouched | ✅ Yes | commit touches SeoJsonLd + openspec only; site still netlify.app |
| NAP freeze + Place ID hasMap | ✅ Yes | User override documented |

### Issues Found
**CRITICAL**: None
**WARNING**:
- Task 5.5 remains unchecked: Google Rich Results Test + Schema.org validator not runnable here (branch HTML not publicly fetchable for Google; inventing external PASS forbidden). Accepted residual per design Testing Strategy (Manual) and task wording. Local smoke satisfies implementable acceptance (NAP/sameAs match; FAQ + business types present with stable graph).
**SUGGESTION**: After Netlify preview/prod deploy of cb873f3, run Rich Results Test on `/` and `/en/` and check off 5.5.

### Verdict
PASS WITH WARNINGS
4/4 requirements and 4/4 scenarios covered by build+dist smoke; task 5.5 external Rich Results accepted residual WARNING; no CRITICAL blockers; ready for sdd-archive.
