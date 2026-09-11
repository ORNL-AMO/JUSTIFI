# JUSTIFI Testing

JUSTIFI uses Jasmine/Karma through Angular CLI.

## Commands

- `npm run test`: runs Angular tests in watch mode.
- `npm run test-ci`: runs tests once with `ChromeHeadless`.
- `npm run build`: web/Electron-compatible build with relative base href.
- `npm run build-prod`: production web build.
- `npm run build-prod-electron`: production Electron-targeted Angular build.

Use focused verification by default while developing with agents. Run the closest relevant spec, targeted check, or manual workflow first; CI/CD runs the full system when a PR is opened.

Use `npm run test-ci` when the change is broad enough to justify full local coverage, such as shared infrastructure, persistence/migration, report calculations, release-sensitive behavior, or final PR confidence when the command is cheap and relevant.

## When To Add Or Update Specs

Add or update focused specs when changing:

- services
- pipes
- guards
- forms
- report calculations
- IndexedDB behavior
- import/export parsing
- component methods with conditional behavior

Documentation-only changes do not need Angular tests, but links and file references should be reviewed.

## Focused Verification Policy

Prefer the smallest meaningful check:

- For a single service, pipe, guard, or component method, run or update the nearest spec file.
- For a form workflow, test the changed form behavior and add manual notes for validation or navigation flows that are not covered.
- For UI-only changes, use a focused component check, screenshot, or manual workflow note.
- For docs-only changes, review Markdown/YAML structure and links.
- For persistence, migration, shared report calculations, or shared services, run focused specs first and consider `npm run test-ci` before handoff.

Do not run full builds, full test suites, or Electron packaging commands for small isolated edits unless the changed area justifies it.

## Test Location

Keep tests beside the code under test with `.spec.ts` suffix. This is the existing pattern throughout `src/app/`.

## Practical Coverage Guidance

- For a service change, test the public method behavior and important state updates.
- For a pipe change, cover normal, empty, and edge input cases.
- For forms, cover initialization, validation, emitted values, and save/cancel behavior.
- For persistence, cover old and current data shapes when migration or repair logic changes.
- For reports, cover calculations and option filtering with representative model objects.
- For UI-only display changes, use component tests or screenshot/manual QA notes depending on risk.

## Environment Notes

Karma requires Chrome or Chrome Headless. If local execution fails because the environment lacks a browser, record the failure and reason rather than claiming tests passed.

## Agent Notes

- Choose the smallest meaningful test command first.
- Do not default to `npm run test-ci` for every small edit; PR CI/CD provides the full-suite safety net.
- Do not add unrelated test rewrites.
- Keep test data minimal but domain-realistic.
- State exactly which checks ran in the PR.
