# AI Personas

Use these lightweight personas to focus agent work and review. They are roles, not separate authorities; the implementer remains responsible for final judgment.

## Angular Feature Implementer

Use for Angular UI, forms, routing, component, pipe, and service work.

Inspect first:

- `src/app/routing/`
- the closest feature folder
- shared forms/services used by that feature
- existing `.spec.ts` files
- `CODING_STYLE.md`

Review questions:

- Does the change follow the local module/component pattern?
- Does it preserve existing NgModule structure unless migration is scoped?
- Are templates simple and user-facing labels consistent?
- Are focused specs updated?

Expected output: scoped implementation notes, tests run, screenshots or manual QA notes for visible changes.

## Domain/Data Model Steward

Use when entities, relationships, option constants, or terminology change.

Inspect first:

- `src/app/models/`
- `src/app/shared/constants/`
- `docs/data-model.md`
- `docs/domain-glossary.md`

Review questions:

- Are GUID relationships preserved?
- Does the change alter persisted shape or only display behavior?
- Do reports, imports, exports, and dashboards still understand the data?
- Does documentation need a glossary or data-model update?

Expected output: relationship impact summary and migration risk notes.

## Persistence And Migration Reviewer

Use for IndexedDB services, schema changes, backup/import, migrations, or cascading deletes.

Inspect first:

- `src/app/indexed-db/_idbConfig.ts`
- `src/app/indexed-db/*idb.service.ts`
- `src/app/indexed-db/db-changes.service.ts`
- `src/app/indexed-db/update-db-entries.service.ts`
- `docs/persistence.md`

Review questions:

- Is the migration idempotent?
- Are old data shapes handled?
- Are backup/import and overwrite/add flows preserved?
- Are tests or manual migration QA notes present?

Expected output: migration safety review, affected stores, verification run, and residual risk.

## QA/Test Engineer

Use for test planning, regression checks, and verification summaries.

Inspect first:

- `docs/testing.md`
- changed files and colocated specs
- relevant workflows in `.github/workflows/`

Review questions:

- What is the smallest meaningful automated check?
- Are edge cases covered by focused specs?
- Does the PR honestly report commands that could not run?

Expected output: test plan, commands run, pass/fail status, and uncovered risks.

## UI/UX Reviewer

Use for visible UI changes, forms, navigation, reports, and dashboard workflows.

Inspect first:

- changed HTML/CSS
- changed component TypeScript that drives states, validation, or navigation
- nearby form patterns
- shared styles under `src/assets/styles/`
- screenshots or local UI when available

Review questions:

- Are labels, affordances, validation messages, empty states, and focus behavior clear?
- Does the workflow make the next action obvious without adding explanatory clutter?
- Does text fit in mobile and desktop layouts?
- Are buttons and icons understandable?
- Are disabled, loading, error, and saved states handled consistently?
- Are keyboard, screen reader, color contrast, and semantic HTML basics preserved?
- Does the workflow preserve user data and unsaved-change protection?

Expected output: UI/UX review notes, screenshots or manual QA coverage for visible changes, and any residual usability/accessibility risk.

## Release/Package Engineer

Use for versioning, Electron, CI, service worker, and installer changes.

Inspect first:

- `package.json`
- `main.js`
- `ngsw-config.json`
- `.github/workflows/`
- `docs/release-and-packaging.md`

Review questions:

- Does the change affect web, Electron, or both?
- Is Electron actually in scope, or is this an ordinary Angular app change where Electron can be ignored?
- Are base href, updater, signing, and artifact outputs preserved?
- Is release impact described in the PR?

Expected output: packaging impact summary and verification recommendation.

## Documentation Curator

Use for docs, templates, agent instructions, glossary, or contributor guidance.

Inspect first:

- `README.md`
- `CONTRIBUTING.md`
- `CODING_STYLE.md`
- `AGENTS.md`
- `docs/`
- `.github/`

Review questions:

- Is the doc accurate to the current repo?
- Does it link to canonical sources instead of duplicating too much?
- Are agent instructions concise and actionable?
- Are issue/PR prompts easy for maintainers to review?

Expected output: docs map, link review, and acceptance-criteria checklist.
