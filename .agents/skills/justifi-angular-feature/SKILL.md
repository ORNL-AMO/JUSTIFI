---
name: justifi-angular-feature
description: Implement or review JUSTIFI Angular UI, routing, forms, services, pipes, and component behavior while preserving existing NgModule patterns unless migration is explicit.
---

# JUSTIFI Angular Feature

Use this skill for Angular UI, routing, form, component, pipe, and feature-service work in JUSTIFI.

## Read First

- `AGENTS.md`
- `CODING_STYLE.md`
- `docs/architecture.md`
- `docs/testing.md`
- the closest feature folder and colocated `.spec.ts` files

## Working Guidance

- Preserve existing NgModule structure and `standalone: false` declarations unless standalone migration is explicitly in scope.
- Use Angular 21+ defaults for new isolated code when they fit: `inject()` for new dependency injection, standalone declarations only when local boundaries remain clear, and signals/computed for local state that does not disrupt existing flows.
- Follow nearby form, routing, component, and service patterns.
- Keep templates simple and move complex logic to TypeScript.
- Preserve JUSTIFI domain terms and existing user-facing workflow language.
- For visible UI changes, check workflow clarity, labels, validation states, empty/loading/error states, layout fit, accessibility basics, and consistency with existing JUSTIFI patterns.
- Avoid persistence, report, backup/import, or release changes unless the task calls for them.
- Ignore Electron builds unless Electron, installers, updater, native packaging, signing, package scripts, or desktop-only behavior is explicitly in scope.

## Verification

- Add or update focused specs beside changed TypeScript files.
- Run the closest focused spec or targeted check first.
- Rely on PR CI/CD for the full suite unless the change is broad or high risk.
- Include screenshot or manual workflow notes for visible UI changes.
