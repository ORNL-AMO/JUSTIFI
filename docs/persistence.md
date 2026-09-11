# JUSTIFI Persistence

JUSTIFI persists local user data with `ngx-indexed-db`. Persistence is a high-risk area because schema, migration, backup, import, and report behavior all depend on stable stored records.

## IndexedDB Configuration

`src/app/indexed-db/_idbConfig.ts` owns the database name, version, and object stores.

Current database:

- name: `NEB_Tool`
- version: `3`

Current stores:

- `user`
- `company`
- `facility`
- `energyOpportunity`
- `assessment`
- `contact`
- `nonEnergyBenefit`
- `onSiteVisit`
- `keyPerformanceIndicator`
- `processEquipment`
- `energyEquipment`
- `keyPerformanceMetricImpact`
- `report`
- `analyticsData`

Do not add stores, rename stores, or change the version unless the task explicitly includes a migration plan.

## Service Pattern

Each main store has a matching service under `src/app/indexed-db/`. These services typically expose:

- an in-memory reactive value for the current store contents
- `getAll`/lookup behavior
- add, update, and delete operations through observables
- setter methods that reload store state after mutations

When editing persistence behavior, follow the closest matching service rather than introducing a new storage abstraction.

## Cascading Changes

`DbChangesService` coordinates multi-entity operations such as deleting a company, facility, visit, or assessment. These operations remove or update related contacts, assessments, equipment, opportunities, NEBs, KPI/KPM impacts, and reports.

Any change to delete or relationship behavior should include tests or manual QA notes covering the affected cascade.

## Data Migrations And Repairs

`UpdateDbEntriesService` performs data repair and migration-like updates after user data loads. It handles behaviors such as KPI-to-facility migration, locale defaults, renamed KPI/KPM options, missing relationship arrays, and recalculated utility values.

Migration-style changes should:

- be idempotent
- preserve existing user data
- set or reuse an explicit completion flag when needed
- update affected services after writes
- include coverage for old and current data shapes

## Backup And Import

Backup/import flows must remain compatible with current user data and version checks.

Important files include:

- `src/app/shared/shared-services/backup-data.service.ts`
- `src/app/core-components/backup-modal/`
- `src/app/shared/shared-services/parse-excel-template.service.ts`
- `src/assets/template-files/JUSTIFI_project_template.xlsx`

Backup files are checked for JUSTIFI origin and version compatibility before import. Import can add to current user data or overwrite current user data.

## Agent Notes

- Treat persistence changes as high risk even when the TypeScript edit looks small.
- Prefer additive migration repair over destructive cleanup.
- Never rely on numeric IndexedDB IDs for cross-entity relationships.
- Include migration risk in PR descriptions.
- For docs-only changes, do not touch persistence code.
