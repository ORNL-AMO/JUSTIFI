---
name: code-review
description: Review JUSTIFI pull requests with focused-test expectations, user-data safety checks, UI/UX review, and Electron-as-packaging scope.
---

# JUSTIFI Code Review

Use this skill for GitHub Copilot code review of JUSTIFI pull requests.

## Read First

- `REVIEW.md`
- `AGENTS.md`
- `.github/copilot-instructions.md`
- changed files and nearby tests
- relevant docs under `docs/`

## Review Focus

- Prioritize correctness, user-data safety, report/export accuracy, UI/UX clarity, and maintainability.
- Treat IndexedDB, migrations, backup/import, cascading deletes, and report calculations as high risk.
- Expect focused tests or targeted verification, not blanket full-suite runs for small edits.
- Ignore Electron unless the PR explicitly touches Electron, installers, updater behavior, native packaging, signing, package scripts, or desktop-only behavior.
- For visible UI changes, check labels, workflow clarity, validation and state handling, layout fit, accessibility basics, and consistency with JUSTIFI patterns.

## Output

Leave actionable, scoped review comments. Ask for `npm run test-ci`, Electron builds, or packaging checks only when the changed area justifies them.
