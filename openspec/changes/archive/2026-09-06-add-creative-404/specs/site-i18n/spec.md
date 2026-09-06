# Delta for Site-i18n

## ADDED Requirements

### Requirement: 404 locale resolution

For the static 404 experience, the active UI locale MUST be resolved client-side from the preserved pathname: paths under `/en` (prefix `/en…`) MUST use English; otherwise Spanish. When the pathname has no `/en` prefix, the system MAY honor an explicit preferred-locale value in `marta-orozco-locale` localStorage (preferred EN → English UI). Anti-FOUC measures SHOULD prevent a wrong-locale flash. Static meta MAY default to one locale when dual-head is impractical.

#### Scenario: English from /en pathname

- GIVEN a missing URL whose pathname starts with `/en`
- WHEN the 404 UI resolves locale
- THEN English copy and CTAs are shown

#### Scenario: Spanish default without /en

- GIVEN a missing URL whose pathname does not start with `/en`
- AND no preferred EN in `marta-orozco-locale`
- WHEN the 404 UI resolves locale
- THEN Spanish copy and CTAs are shown

#### Scenario: Stored EN when path has no /en prefix

- GIVEN a missing URL whose pathname does not start with `/en`
- AND `marta-orozco-locale` prefers English
- WHEN the 404 UI resolves locale
- THEN English copy and CTAs are shown

### Requirement: Not-found UI copy dictionaries

Locale dictionaries MUST expose `ui.notFound` strings for ES and EN covering meta title/description, soft `h1`, body, and primary CTA label. WhatsApp labels on 404 MUST reuse existing thank-you WhatsApp label fields. EN forms MUST follow the locked EN-GB glossary where applicable.

#### Scenario: ES and EN notFound keys present

- GIVEN `es` and `en` site dictionaries
- WHEN `ui.notFound` is inspected
- THEN title, message, primary CTA, and meta fields exist in both locales
- AND values match the locked proposal copy

## MODIFIED Requirements

### Requirement: Preferred-language detection

Boot script MUST map Spain-related langs (`es`, `es-*`, `ca`, `gl`, `eu`)→ES else→EN when no stored preference. Explicit `localStorage` MUST win. MUST NOT redirect if URL already matches. SHOULD avoid crawler-harmful loops. When the document shell opts in with `skipLocaleRedirect`, the boot script MUST NOT perform preferred-locale redirects (so static 404 URLs are not replaced by `/` or `/en/`).

(Previously: Boot redirect always applied on mismatched preferred locale; no skip for 404 shells.)

#### Scenario: Detect to Spanish

- GIVEN no preference; Spain-related lang; mismatched URL
- WHEN boot runs without skipLocaleRedirect
- THEN redirect to Spanish

#### Scenario: Detect to English

- GIVEN no preference; non-Spain lang; mismatched URL
- WHEN boot runs without skipLocaleRedirect
- THEN redirect to `/en/`

#### Scenario: Stored preference wins

- GIVEN explicit stored language
- WHEN boot runs without skipLocaleRedirect
- THEN storage beats browser detection

#### Scenario: No redirect loop

- GIVEN URL already matches resolved locale
- WHEN boot runs
- THEN no redirect

#### Scenario: 404 skips locale redirect

- GIVEN the 404 shell with `skipLocaleRedirect`
- AND a preferred locale that would normally mismatch the preserved URL
- WHEN boot runs
- THEN no preferred-locale redirect occurs
- AND the missing-path URL is preserved
