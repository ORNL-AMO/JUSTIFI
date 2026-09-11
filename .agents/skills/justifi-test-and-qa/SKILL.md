---
name: justifi-test-and-qa
description: Choose and summarize JUSTIFI verification for tests, manual QA, docs review, Angular changes, persistence changes, reports, or release-sensitive work.
---

# JUSTIFI Test And QA

Use this skill when planning, adding, running, or summarizing verification for JUSTIFI work.

## Read First

- `AGENTS.md`
- `docs/testing.md`
- changed files and colocated specs
- relevant workflow files if CI behavior matters

## Working Guidance

- Use the smallest verification that gives real confidence.
- Prefer focused specs near changed code.
- Run the closest focused spec, targeted check, or manual workflow first.
- Do not default to `npm run test-ci` for small edits; PR CI/CD provides the full-suite safety net.
- Use `npm run test-ci` when changes are broad, high risk, shared, persistence/migration-related, report/calculation-related, release-sensitive, or ready for final PR confidence.
- For docs-only changes, review links and file references.
- For UI changes, include screenshots or manual workflow notes when automated coverage is not enough.
- Do not request Electron builds for ordinary Angular changes.
- For persistence/report/release changes, call out residual risk explicitly.

## Verification Output

Report:

- commands run
- pass/fail status
- environment blockers
- manual QA performed
- remaining risk
