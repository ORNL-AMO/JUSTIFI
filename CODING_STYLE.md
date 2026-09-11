# JUSTIFI Coding Style Guide

This guide captures JUSTIFI conventions plus current Angular 21+ recommendations. Prefer the existing local pattern when editing existing code, and use the newer Angular defaults for new, isolated work when they do not force a broader migration.

## General

- Use TypeScript for application source.
- Follow the official Angular style guide as the baseline: https://angular.dev/style-guide
- Keep changes scoped to the feature area or bug being addressed.
- Prefer clear, boring code over clever abstractions.
- Avoid `any`; use explicit domain interfaces from `src/app/models/` or `unknown` when the value is genuinely uncertain.
- Prefer type inference when the type is obvious from the initializer.

## Formatting

- Indentation: 2 spaces, no tabs.
- Line length: 120 characters max.
- Use single quotes for strings, except in JSON.
- End files with a newline.
- Use semicolons at the end of statements.

## Naming And File Layout

- Classes and interfaces: `PascalCase`.
- Variables, functions, and properties: `camelCase`.
- Exported constants: `UPPER_CASE` only when they are true constants; otherwise use `camelCase`.
- File names: `kebab-case`.
- Unit tests live beside the code under test and end with `.spec.ts`.
- Keep component TypeScript, template, and style files together with matching base names.
- Organize by feature area rather than broad type-only folders. JUSTIFI already follows this pattern with `setup-wizard`, `user-portfolio`, `indexed-db`, and shared feature folders.
- Avoid generic file names such as `helpers.ts`, `utils.ts`, or `common.ts` unless the file is already established and scoped clearly.

## Angular 21+ Defaults

- Prefer standalone components, directives, and pipes for new isolated work.
- Preserve the existing NgModule structure and `standalone: false` declarations unless a standalone migration is explicitly in scope.
- Do not mix a large standalone migration into a feature or bug fix.
- Prefer `inject()` for new dependency injection. Constructor injection is acceptable when editing a class that already uses it and consistency makes the change smaller.
- Use signals and `computed()` for local component state when they simplify the code. Do not convert existing Observable or `BehaviorSubject` flows unless the task calls for it.
- Keep services single-purpose and use `providedIn: 'root'` for singleton services unless a module-scoped provider is intentional.
- Prefer Angular CLI generation when adding components, services, pipes, guards, or modules.

## Components, Templates, And Forms

- Keep components focused on presentation and user interaction.
- Move reusable calculations, form setup, data transformations, and persistence work into services or pure helpers.
- Keep templates simple. If a template expression becomes hard to read, move the logic into TypeScript, often as a property, method, or `computed()`.
- Prefer class and style bindings over `ngClass` and `ngStyle` for new code.
- Name event handlers for the action they perform, such as `saveAssessment()` instead of `onClick()`.
- Use `@Input()` and `@Output()` for component communication in existing non-standalone components.
- Keep user-facing text clear and domain-specific; preserve established JUSTIFI terminology.

## State And Data

- Use the existing IndexedDB service pattern for persisted data.
- Treat `src/app/models/` interfaces, `src/app/indexed-db/_idbConfig.ts`, `DbChangesService`, `UpdateDbEntriesService`, backup/import/export flows, and report calculations as high-risk areas.
- Preserve GUID relationships between companies, facilities, visits, assessments, equipment, energy opportunities, NEBs, KPI/KPM records, contacts, and reports.
- Do not change IndexedDB stores, schema version, backup shape, or migration behavior without an explicit migration plan and tests.

## Imports And Exports

- Use ES module import/export syntax.
- Group imports: Angular first, third-party libraries next, then local imports.
- Avoid long relative import chains when an existing local pattern offers a clearer path.
- Remove unused imports as part of the change.

## Testing

- Components, services, pipes, guards, and utilities should have corresponding `.spec.ts` coverage.
- Use `describe`, `it`, `beforeEach`, and `afterEach` for Jasmine/Karma tests.
- Test names should describe expected behavior.
- For ordinary code changes, run the closest focused spec or targeted verification first.
- Use `npm run test-ci` for broad, shared, persistence/migration, report/calculation, release-sensitive, or final-confidence changes when the environment supports Chrome Headless.
- For focused work, add or update the closest relevant spec rather than relying only on broad tests.

## Documentation

- Update documentation when behavior, workflows, commands, data contracts, or release expectations change.
- Keep README, CONTRIBUTING, this style guide, and files under `docs/` linked instead of duplicating long sections.
- For agent-facing guidance, prefer concise pointers to canonical docs.

## Git And Pull Requests

- Follow `CONTRIBUTING.md` for branches, issues, pull requests, tests, and documentation expectations.
- Keep pull requests focused and small.
- Reference related issues in PRs.
- Include tests run, documentation changes, user impact, and remaining risk in PR descriptions.
