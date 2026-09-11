---
name: justifi-indexeddb-data
description: Work on JUSTIFI IndexedDB services, persisted models, migrations, backup/import behavior, or data relationship changes with migration safety.
---

# JUSTIFI IndexedDB Data

Use this skill for persisted data, IndexedDB services, migration/repair behavior, backup/import, or model relationship work.

## Read First

- `AGENTS.md`
- `docs/persistence.md`
- `docs/data-model.md`
- `docs/domain-glossary.md`
- `src/app/models/`
- `src/app/indexed-db/`

## Working Guidance

- Treat data changes as high risk.
- Preserve GUID-based relationships. Do not use numeric IndexedDB IDs for cross-entity identity.
- Do not change `dbConfig` stores, database version, backup shape, or migration behavior without an explicit migration plan.
- Make repair or migration logic idempotent and compatible with old and current data shapes.
- Review `DbChangesService` for cascading delete or relationship cleanup effects.
- Review `UpdateDbEntriesService` for migration flags and data repair patterns.

## Verification

- Add focused service tests for changed persistence behavior.
- Cover old and current data shapes for migration/repair changes.
- Run focused persistence tests first.
- Consider `npm run test-ci` before handoff for migration or broad persistence risk.
- Summarize affected stores, migration risk, backup/import impact, and residual risk.
