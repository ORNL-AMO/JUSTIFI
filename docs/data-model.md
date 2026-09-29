# JUSTIFI Data Model

JUSTIFI stores user data in IndexedDB using interfaces in `src/app/models/`. Most persisted records extend `IdbEntry`, which provides the common database `id`, stable `guid`, `createdDate`, and `modifiedDate`. Many concrete models add `userId` themselves; inspect the specific interface before assuming ownership fields.

## Core Entities

- User (`IdbUser`): root owner for local portfolio data and user preferences such as locale and migration flags.
- Company (`IdbCompany`): top-level organization being assessed.
- Facility (`IdbFacility`): manufacturing site within a company.
- On-site visit (`IdbOnSiteVisit`): visit workflow that groups one or more assessments for a facility.
- Assessment (`IdbAssessment`): specific assessment of energy use, utility savings, equipment, opportunities, and NEBs.
- Contact (`IdbContact`): stakeholder/contact linked to companies, facilities, assessments, equipment, KPIs, or NEBs.
- Energy equipment (`IdbEnergyEquipment`): facility-level energy system inventory.
- Process equipment (`IdbProcessEquipment`): facility-level end-use or process inventory.
- Energy opportunity (`IdbEnergyOpportunity`): energy efficiency opportunity linked to a company, facility, and usually an assessment.
- Non-energy benefit (`IdbNonEnergyBenefit`): NEB associated with an assessment, facility, company, and often an energy opportunity.
- Key performance indicator (`IdbKeyPerformanceIndicator`): KPI category and associated KPM definitions for a facility.
- Key performance metric impact (`IdbKeyPerformanceMetricImpact`): impact of a NEB or opportunity on a KPM.
- Report (`IdbReport`): saved custom report configuration and included report options.
- Analytics data (`analyticsData` store): local analytics metadata such as client ID and modified date.

## Relationship Pattern

JUSTIFI uses GUID fields for cross-entity relationships. Do not assume numeric IndexedDB `id` values are stable across imports or backups.

Common relationship anchors:

- Where present, `userId` ties records to the active user; it is declared on concrete models rather than `IdbEntry`.
- `companyId` ties most records to a company GUID.
- `facilityId` ties facility-scoped records to a facility GUID.
- `assessmentId` ties opportunity, NEB, KPM impact, and report options to an assessment GUID.
- Arrays such as `assessmentIds`, `energyEquipmentIds`, `processEquipmentIds`, and `energyOpportunityIds` represent many-to-many links.

## Workflow Model

The setup wizard creates and edits the same persisted entities used by portfolio dashboards:

- Pre-visit setup prepares company, facility, contacts, KPIs/KPMs, equipment, questions, and pre-assessments.
- Data collection creates and edits assessments, energy opportunities, and NEBs.
- Data evaluation reviews follow-up items, assessment reports, visit reports, executive summaries, and custom reports.
- Portfolio dashboards allow users to revisit the same companies, facilities, assessments, reports, stakeholders, and inventory records.

## Option Constants

Domain option lists live under `src/app/shared/constants/`. They should be treated as user-facing data because labels, values, and option keys flow into forms, reports, backup files, and calculations.

Important option areas include:

- KPI and KPM definitions
- NEB options
- assessment types
- locale and currency choices
- utility and unit options

## Report Options

`IdbReport` stores selected report sections in inline arrays of `ReportOption` objects. The `ReportOptionType` union currently covers assessment, energy opportunity, non-energy benefit, and KPM impact options. These options are part of the persisted `report` store record, not separate IndexedDB stores or services.

When changing reports, preserve the relationship between saved report options and the entities they reference.

## Agent Notes

- Inspect the relevant model interface before changing a form, service, report, or IndexedDB service.
- Preserve GUID relationships during imports, exports, deletions, and migrations.
- Update `docs/domain-glossary.md` when adding or renaming domain terms.
- Changes to model shape require persistence and backup/import review.
