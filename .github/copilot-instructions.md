# Copilot Instructions For JUSTIFI

Use these repository-specific instructions when suggesting or editing code in JUSTIFI.

## Start Here

- Read `AGENTS.md` for the short project orientation.
- Use `README.md`, `CONTRIBUTING.md`, and `CODING_STYLE.md` as canonical contributor guidance.
- Use `docs/` for architecture, data model, persistence, testing, release, glossary, personas, and agent task prompts.
- For pull request reviews, apply `REVIEW.md` and any matching `.github/instructions/**/*.instructions.md` guidance.

## Angular Guidance

- The app uses Angular 21.2.1 but currently relies on NgModules and `standalone: false`.
- Prefer Angular 21+ style for new isolated work: standalone components when they fit, `inject()` for new dependency injection, and signals/computed for local component state when they simplify code.
- Preserve existing NgModule structure unless the task explicitly asks for standalone migration.
- Follow nearby component, form, routing, and service patterns before inventing new ones.
- Keep templates simple; move complex logic to TypeScript.
- Prefer class/style bindings over `ngClass`/`ngStyle` for new code.
- Keep `.spec.ts` tests colocated with changed TypeScript files.
- For visible UI changes, review workflow clarity, labels, validation states, layout fit, accessibility basics, and consistency with existing JUSTIFI UI patterns.

## Domain And Persistence Safety

- Preserve JUSTIFI terminology: Multiple Benefits, NEBs, KPIs, KPMs, on-site visits, assessments, energy opportunities, reports, companies, and facilities.
- Treat `src/app/models/`, `src/app/indexed-db/`, backup/import, and report calculations as high risk.
- Do not change IndexedDB schema, version, store names, backup format, or migration behavior unless explicitly requested.
- Preserve GUID-based relationships. Do not use numeric IndexedDB IDs for cross-entity identity.

## Docs And Tests

- Update docs when changing workflows, commands, data contracts, release behavior, or durable conventions.
- For code changes, add/update focused tests and run the closest relevant spec or targeted verification first.
- Do not request broad test/build runs for small isolated edits. CI/CD runs the full suite when a PR is opened.
- Ask for `npm run test-ci` only when the change is broad, high risk, shared, persistence/migration-related, report/calculation-related, release-sensitive, or ready for final PR confidence.
- For documentation-only changes, review links and file references; app builds are not normally required.
- Treat Electron as installable packaging only unless the PR explicitly touches Electron, installers, updater behavior, signing, native packaging, package scripts, or desktop-only behavior.

## Code Review Focus

- Prioritize correctness, maintainability, user-data safety, and JUSTIFI workflow consistency.
- Review changed files in context; avoid speculative comments outside the diff unless needed to explain a concrete risk.
- Prefer actionable comments tied to specific code and severity.
- Do not ask for Electron builds, full test suites, or packaging checks unless the changed area justifies them.

## PR Expectations

Suggested PR notes should include:

- issue link
- user-facing change
- tests run
- docs updated
- persistence/report/release risk
- screenshots or manual QA notes for visible UI changes
