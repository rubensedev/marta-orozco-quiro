# Spec Delta: astro-check-ci

## ADDED Requirements

### Requirement: Clean Astro Type Check

The project MUST provide an npm script `check` that runs `astro check`, and that command MUST exit 0 on a clean tree after this change.

#### Scenario: Local check passes
- **GIVEN** dependencies are installed
- **WHEN** a developer runs `npm run check`
- **THEN** the process exits with code 0
- **AND** no new TypeScript errors are introduced by the AboutStats fix

### Requirement: AboutStats Client Script Is Typed

The client `<script>` in `src/components/AboutStats.astro` MUST type function parameters and DOM/`dataset` access so `astro check` reports no errors for that file. Count-up and reveal behavior MUST remain unchanged.

#### Scenario: Dataset and handlers typed
- **GIVEN** the AboutStats reveal/count script
- **WHEN** `astro check` analyzes the file
- **THEN** there are no `ts(7006)` implicit-`any` errors on script parameters
- **AND** there are no `ts(2339)` errors for `dataset` on `Element`

### Requirement: CI Gates Check and Build

A GitHub Actions workflow MUST run on pull requests targeting `main` and `develop`, install dependencies, run `npm run check`, then `npm run build`, and MUST fail the job if either step fails.

#### Scenario: PR regression gate
- **GIVEN** a pull request targeting `main` or `develop`
- **WHEN** the CI workflow runs
- **THEN** it executes check then build in order
- **AND** a failing check or build marks the workflow as failed

### Requirement: Optional Dist Artifact Smoke (SHOULD)

After a successful CI build, the workflow SHOULD assert that expected post-build artifacts exist (`robots.txt` and sitemap output under `dist/`). Failure of this smoke MUST fail the job if the step is present.

#### Scenario: Sitemap and robots present
- **GIVEN** `npm run build` completed successfully in CI
- **WHEN** the artifact smoke step runs
- **THEN** `dist/robots.txt` exists
- **AND** a sitemap artifact matching `@astrojs/sitemap` output exists under `dist/`
