```yaml
schema: gentle-ai.verify-result/v1
evidence_revision: sha256:0d783d7ac22f2b0062cb7e73ca1a6f2a25f990d55a678d5605fc3580adc91b41
verdict: pass_with_warnings
blockers: 0
critical_findings: 0
requirements: 8/8
scenarios: 19/19
test_command: bash -lc 'test -f dist/index.html && test -f dist/en/index.html && rg -q "lang=\"es\"" dist/index.html && rg -q "lang=\"en\"" dist/en/index.html && rg -q "hreflang=\"es\"" dist/index.html && rg -q "hreflang=\"en\"" dist/index.html && rg -q "hreflang=\"x-default\"" dist/index.html && rg -q "id=\"sobre-mi\"" dist/index.html && rg -q "id=\"about\"" dist/en/index.html && rg -q "id=\"packages\"" dist/en/index.html && rg -q "massage therapist" dist/en/index.html && rg -q "session packs|multi-session" dist/en/index.html && rg -q "Deep tissue|deep tissue" dist/en/index.html && rg -q "Craniofacial" dist/en/index.html && rg -q "Quiromasajista" dist/index.html && rg -q "Bonos" dist/index.html && rg -q "Descontracturante" dist/index.html && rg -q "data-treatment=" dist/index.html && rg -q "data-treatment=" dist/en/index.html && rg -q "marta-orozco-locale" dist/index.html && rg -q "data-lang-menu" dist/index.html && echo SMOKE_OK'
test_exit_code: 0
test_output_hash: sha256:6bf54304794dbfec583c1803a48b575e8ebbcae31cb0c67f49a47ab49c312635
build_command: npm run build
build_exit_code: 0
build_output_hash: sha256:609a099caefad1f4ea16fc0bbd189d1f30484c13a3671d5d93e98846def2bae1
```

## Verification Report

**Change**: add-i18n-es-en
**Version**: N/A (change specs)
**Mode**: Standard

### Completeness
| Metric | Value |
|--------|-------|
| Tasks total | 22 |
| Tasks complete | 22 |
| Tasks incomplete | 0 |

### Build & Tests Execution
**Build**: ✅ Passed
```text
npm run build → exit 0; emitted /index.html and /en/index.html (2 pages)
```

**Tests**: ✅ 1 passed / ❌ 0 failed / ⚠️ 0 skipped
```text
Project has no unit runner (openspec/config.yaml testing.available=false; design: manual + build smoke).
Dist smoke asserted lang, hreflang, section ids, glossary, Spanish markers, data-treatment, locale boot key, lang menu → SMOKE_OK
```

**Coverage**: ➖ Not available / threshold: N/A → ➖ Not available

### Spec Compliance Matrix
| Requirement | Scenario | Test | Result |
|-------------|----------|------|--------|
| Locale routing | Spanish root | `npm run build` + dist `/` | ✅ COMPLIANT |
| Locale routing | English prefix | `npm run build` + dist `/en/` | ✅ COMPLIANT |
| Locale content API | Shared ids | dist `data-treatment=` + shared ids in es/en | ✅ COMPLIANT |
| Locale content API | EN glossary copy | dist `/en/` glossary smoke | ✅ COMPLIANT |
| Document language/meta/alternates | Locale document chrome | dist `lang=es` / `lang=en` | ✅ COMPLIANT |
| Document language/meta/alternates | Alternates present | dist hreflang es/en/x-default | ✅ COMPLIANT |
| Preferred-language detection | Detect to Spanish | Layout boot + dist `marta-orozco-locale` script | ✅ COMPLIANT |
| Preferred-language detection | Detect to English | Layout boot Spain-lang else→en | ✅ COMPLIANT |
| Preferred-language detection | Stored preference wins | boot reads localStorage before langs | ✅ COMPLIANT |
| Preferred-language detection | No redirect loop | boot early-return when match | ✅ COMPLIANT |
| English section anchors | EN nav targets | dist `#about`/`#massages`/`#packages`/`#contact` | ✅ COMPLIANT |
| Locale WhatsApp messages | EN WhatsApp | en.ts `Hello Marta!` + English bookingValue | ✅ COMPLIANT |
| Locale WhatsApp messages | ES WhatsApp | es.ts `Hola Marta!` Spanish templates | ✅ COMPLIANT |
| Spanish copy preservation | ES unchanged | develop site.ts needles ⊆ es.ts | ✅ COMPLIANT |
| Language switcher control | Desktop chrome | Header `fa-language` + ES/EN + chevron + menu | ✅ COMPLIANT |
| Language switcher control | Drawer chrome | duplicate drawer lang control | ✅ COMPLIANT |
| Language switcher control | ES→EN with hash | Header mapHash + `location.assign` | ✅ COMPLIANT |
| Language switcher control | EN→ES with hash | hashes.ts bidirectional + Header | ✅ COMPLIANT |
| Language switcher control | No client-only swap | navigates locale URL paths | ✅ COMPLIANT |

**Compliance summary**: 19/19 scenarios compliant (manual/build smoke allowed by project config)

### Correctness (Static Evidence)
| Requirement | Status | Notes |
|------------|--------|-------|
| Locale routing | ✅ Implemented | Astro i18n; `/` + `/en/` |
| Locale content API | ✅ Implemented | `getSite` + shared ids |
| Document chrome + alternates | ✅ Implemented | Layout lang/meta/hreflang |
| Preferred-language detection | ✅ Implemented | Inline boot beside theme |
| English section anchors | ✅ Implemented | EN sectionIds + nav |
| Locale WhatsApp | ✅ Implemented | Locale `ui.whatsappBooking` |
| Spanish copy preservation | ✅ Implemented | Key develop strings present in es.ts |
| Language switcher | ✅ Implemented | Desktop+drawer; storage+navigate+hash |

### Coherence (Design)
| Decision | Followed? | Notes |
|----------|-----------|-------|
| Astro built-in i18n | ✅ Yes | No extra library |
| getSite modules | ✅ Yes | shared/es/en/hashes/index |
| HomePage shell | ✅ Yes | Thin locale pages |
| SITE_URL_PLACEHOLDER | ✅ Yes | Absolute placeholder as designed |
| Id-keyed client maps | ✅ Yes | `data-treatment` / openBookingModal by id |
| Theme-like switcher | ✅ Yes | icon + ES/EN + chevron |
| Detect skip bots/match | ✅ Yes | UA skip + early return |

### Issues Found
**CRITICAL**: None
**WARNING**:
- `astro.config` `site` remains `https://SITE_URL_PLACEHOLDER` — replace with real canonical origin before production (open question; does not block i18n behavior).
**SUGGESTION**:
- Optional live-browser pass for boot redirect matrix and switcher+hash navigation (verify used dist + source evidence per project manual-smoke policy).

### Verdict
PASS WITH WARNINGS
All 22 tasks complete; build green; `/` and `/en/` emit; specs/design met under manual+build smoke; prod site URL still placeholder.
