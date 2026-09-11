# JUSTIFI Agent Guide

Read this file first when working in JUSTIFI. It is the durable orientation layer for AI-assisted development; keep it concise and link to canonical docs instead of duplicating them.

## Product

JUSTIFI is an Angular/Electron application from ORNL-AMO for identifying, estimating, and reporting Multiple Benefits from manufacturing energy efficiency opportunities. The main user workflows are:

- setting up companies, facilities, contacts, KPIs/KPMs, equipment, and pre-assessments
- collecting on-site assessment data
- evaluating energy opportunities, NEBs, reports, and exports
- managing saved portfolio data through IndexedDB-backed dashboards

Start with [README.md](README.md) for setup and commands, [CONTRIBUTING.md](CONTRIBUTING.md) for branch/PR expectations, and [CODING_STYLE.md](CODING_STYLE.md) for coding conventions.

Contributor workflow quick reference:

- Branch from `develop` for ordinary issue work; use `issue-xxx[-description]`, `fix-xxx[-description]`, or `epic-xxx[-description]` naming from `CONTRIBUTING.md`.
- Most PRs target `develop`; only core maintainers should target release branches.
- Reference the GitHub issue in the branch or PR and keep the PR scoped to that issue.
- Update docs when behavior, commands, data contracts, or durable guidance changes.
- Prefer focused tests or checks while developing; rely on PR CI/CD for full-suite validation unless broad or high-risk changes justify local `npm run test-ci`.

## Architecture Map

- Angular entry points: `src/main.ts`, `src/app/app.module.ts`, and `src/app/routing/`.
- Electron packaging wrapper: `main.js`, `preload.js`, `src/app/electron/`, and `package.json` `build` config.
- Persistence: `src/app/indexed-db/`, `src/app/models/`, and backup/import services.
- Primary workflows: `src/app/setup-wizard/`, `src/app/user-portfolio/`, `src/app/nebs-database/`, and `src/app/shared/`.
- Reports and exports: `src/app/shared/reports/`, Excel/PowerPoint services, and `src/assets/template-files/`.

Use the detailed docs in `docs/` before making edits:

- [Architecture](docs/architecture.md)
- [Data Model](docs/data-model.md)
- [Persistence](docs/persistence.md)
- [Testing](docs/testing.md)
- [Release And Packaging](docs/release-and-packaging.md)
- [Domain Glossary](docs/domain-glossary.md)
- [AI Personas](docs/ai-personas.md)
- [Agent Task Prompts](docs/agent-task-prompts.md)
- [Code Review Guide](REVIEW.md)

## Current Conventions

- The repo uses Angular 21.2.1 with NgModules and many `standalone: false` declarations. Prefer Angular 21+ defaults for new isolated work, but do not migrate existing NgModule structure unless the task explicitly asks for it.
- Use existing feature/module/service patterns before creating new abstractions.
- Keep user-facing language aligned with JUSTIFI domain terms: Multiple Benefits, NEBs, KPIs, KPMs, on-site visits, assessments, energy opportunities, and reports.
- Preserve colocated `.spec.ts` tests and update focused coverage for code changes.
- Prefer focused verification while developing. Run the nearest meaningful spec, targeted check, or manual workflow first; rely on CI/CD for the full system sweep when a PR is opened unless the change is broad or high risk.
- Treat Electron as an installable-wrapper/package target. Ignore Electron builds for ordinary Angular changes unless the issue explicitly mentions Electron, installers, updater, native packaging, signing, or desktop-only behavior.
- For visible UI changes, check workflow clarity, labels, validation states, layout fit, accessibility basics, and consistency with existing JUSTIFI patterns.
- Documentation-only changes normally do not require Angular builds.

## High-Risk Areas

Be especially conservative around:

- IndexedDB schema/version changes in `src/app/indexed-db/_idbConfig.ts`
- migrations and data repair in `UpdateDbEntriesService`
- cascading deletes and relationship cleanup in `DbChangesService`
- backup/import/export behavior
- report calculations and export generation
- Electron packaging, signing, updater behavior, and release workflows
- service worker and production build behavior

Changes in these areas need explicit migration or QA notes and focused tests.

## Verification

Use the smallest verification that gives real confidence:

- closest focused `.spec.ts`, targeted test, or manual workflow for ordinary code changes
- `npm run test-ci` only for broad refactors, shared infrastructure, persistence/migration, report/calculation, release-sensitive changes, or final PR confidence when it is cheap and relevant
- targeted `.spec.ts` updates for services, pipes, forms, and calculations
- screenshots or manual workflow notes for visible UI changes
- docs/link review for documentation-only changes
- release workflow review for packaging changes; Electron builds are only needed for Electron/package-specific work

If a command cannot run in the local environment, record the reason in the PR or handoff.

## PR Handoff

Every agent-authored PR should state:

- issue link and scope
- user-facing change
- files or areas touched
- focused tests or checks run
- docs updated
- persistence, migration, report, packaging, or release risk
- UI/UX impact for visible changes
- residual risk or follow-up
