---
name: justifi-reports-exports
description: Work on JUSTIFI reports, report calculations, custom report options, backup/export flows, Excel template parsing, or PowerPoint/Excel output.
---

# JUSTIFI Reports And Exports

Use this skill for reports, report calculations, custom report options, backup/export flows, Excel template parsing, and generated output.

## Read First

- `AGENTS.md`
- `docs/architecture.md`
- `docs/data-model.md`
- `docs/persistence.md`
- `src/app/shared/reports/`
- relevant services in `src/app/shared/shared-services/`
- backup modal components if backup/export behavior is involved

## Working Guidance

- Preserve saved report option behavior unless the task explicitly changes it.
- Keep calculations in focused calculation helpers or report services rather than templates.
- Check model relationships before filtering or aggregating report data.
- Treat Excel/PowerPoint output and backup/import format changes as user-facing.
- Avoid unrelated styling, persistence, or data model changes.

## Verification

- Add or update specs for calculations, option filtering, or export data shape.
- Run focused report/export specs first.
- Consider `npm run test-ci` before handoff when shared calculations or broad report behavior are affected.
- Include manual artifact QA notes when generated files cannot be fully asserted in tests.
