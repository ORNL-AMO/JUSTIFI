---
applyTo: "**/*"
---

# JUSTIFI Copilot Code Review Instructions

When performing GitHub Copilot code review for JUSTIFI, apply `REVIEW.md`, `AGENTS.md`, `CODING_STYLE.md`, and relevant files in `docs/`.

Review for concrete risks first: correctness, user-data safety, persistence/migration behavior, report/export accuracy, UI/UX clarity, and maintainability.

Use focused verification expectations. Do not ask authors to run the full suite or Electron builds for small isolated edits. CI/CD handles the full PR sweep. Request `npm run test-ci` only for broad, shared, persistence/migration, report/calculation, release-sensitive, or final-confidence changes.

Treat Electron as an installable-wrapper/package target. Ignore Electron checks unless the PR explicitly touches Electron, installers, updater behavior, native packaging, signing, package scripts, or desktop-only behavior.

For visible UI changes, review labels, workflow clarity, validation and empty/loading/error states, layout fit, accessibility basics, and consistency with existing JUSTIFI UI patterns.

Keep comments actionable and scoped to the diff. Prefer fewer high-signal comments over broad style advice.
