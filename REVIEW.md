# JUSTIFI Code Review Guide

Use this guide for GitHub Copilot code review and human review of JUSTIFI pull requests.

## Review Priorities

Prioritize findings in this order:

- correctness bugs and regressions
- user-data safety, especially IndexedDB, backup/import, migrations, and cascading deletes
- report/export calculation accuracy
- workflow clarity and UI/UX quality for visible changes
- maintainability and consistency with existing Angular patterns
- release, service worker, or Electron packaging impact when those areas are actually touched

Prefer actionable review comments tied to changed lines or directly affected behavior. Avoid speculative requests outside the PR scope unless they explain a concrete risk.

## Focused Verification

Agents should not ask for broad local test/build runs by default. JUSTIFI uses CI/CD to run the full system when a PR is opened.

For ordinary small edits, expect one or more focused checks:

- nearest relevant `.spec.ts`
- targeted service, pipe, form, or calculation spec
- manual workflow note for a visible UI path
- screenshot or local visual check for layout changes
- Markdown/YAML/link review for docs-only changes

Request `npm run test-ci` only when the change is broad, shared, persistence/migration-related, report/calculation-related, release-sensitive, or ready for final PR confidence and the command is practical.

## Electron Scope

Treat Electron as an installable-wrapper/package target. Do not request Electron builds or native packaging checks for ordinary Angular application changes.

Review Electron only when the PR explicitly touches:

- `main.js`
- `preload.js`
- `src/app/electron/`
- Electron updater behavior
- native installer config
- signing or entitlements
- package scripts or `package.json` `build` configuration
- desktop-only behavior

## UI/UX Review

For visible UI changes, check:

- labels and button text are clear and domain-specific
- the next action is obvious in the workflow
- validation, empty, loading, saved, and error states are handled
- text fits on mobile and desktop without overlap
- controls follow nearby JUSTIFI patterns
- keyboard, screen reader, semantic HTML, and color contrast basics are preserved
- screenshots or manual notes are included when useful

## High-Risk Areas

Review these areas with extra care:

- `src/app/indexed-db/_idbConfig.ts`
- `DbChangesService`
- `UpdateDbEntriesService`
- `src/app/models/`
- backup/import/export services and modals
- `src/app/shared/reports/`
- report calculations
- service worker config
- Electron packaging and release workflows

## Expected PR Notes

The PR should state:

- issue link and scope
- user-facing impact
- focused tests or checks run
- docs updated
- UI/UX notes for visible changes
- persistence, report/export, release, or Electron risk
- residual risk or follow-up
