# JUSTIFI Architecture

JUSTIFI is an Angular 21 application packaged for both web and desktop use. The Electron layer is primarily an installable-wrapper/package target that loads the Angular build from `dist/browser`.

## Entry Points

- `src/main.ts` bootstraps Angular.
- `src/app/app.module.ts` wires the root NgModule, shared feature modules, IndexedDB, Plotly, service worker registration, and app-level providers.
- `src/app/routing/app-routing.module.ts` defines top-level routes with clean web URLs, file-protocol hash routing for Electron compatibility, view transitions, and route-level SEO metadata.
- `main.js` creates the Electron `BrowserWindow`, loads `dist/browser/index.html`, wires update events, and handles external links. For ordinary Angular feature work, treat this as packaging infrastructure unless Electron-specific behavior is explicitly in scope.
- `preload.js` is the Electron preload boundary.

## Major Feature Areas

- `src/app/core-components/`: shell-level UI such as navbar, sidebar, welcome/about pages, loading, backup modals, update checks, and toast notifications.
- `src/app/setup-wizard/`: guided workflow for pre-visit setup, data collection, data evaluation, template upload, and wizard side panels.
- `src/app/user-portfolio/`: dashboards for companies, facilities, assessments, visits, reports, stakeholders, settings, and inventory views.
- `src/app/nebs-database/`: searchable NEB reference database UI.
- `src/app/shared/`: reusable forms, report components, pipes, constants, conversions, services, table helpers, and association controls.
- `src/app/indexed-db/`: persistence services and IndexedDB configuration.
- `src/app/models/`: persisted and shared domain interfaces.

## Routing Shape

Top-level routes include home, NEBs database, about, feedback, acknowledgments, setup wizard, and portfolio views.

Setup wizard routes are grouped under the `setup-wizard` parent by visit ID:

- `setup-wizard/pre-visit/:id`
- `setup-wizard/data-collection/:id`
- `setup-wizard/data-evaluation/:id`
- `setup-wizard/upload-template/:id`

Portfolio routes are grouped by entity:

- `portfolio/company/:id`
- `portfolio/facility/:id`
- `portfolio/assessment/:id`

Several forms use `CanDeactivateGuard` to protect unsaved edits.

## Angular Organization

The app currently uses NgModules rather than standalone bootstrapping. New isolated Angular 21+ work can use standalone patterns when it does not force migration of existing modules, but normal feature work should preserve the existing module boundaries.

Important modules include:

- `AppModule`
- `IndexedDbModule`
- `SetupWizardModule`
- `UserPortfolioModule`
- `NebsDatabaseModule`
- shared modules for forms, reports, pipes, badges, tables, and association controls

## Shared Services And Utilities

Shared services under `src/app/shared/shared-services/` handle backup data, local storage data, bootstrapping, locale, Excel template parsing, Excel writing, PowerPoint report generation, protocol question export, and app-wide shared data state.

Shared constants under `src/app/shared/constants/` define domain option sets such as assessment types, KPI/KPM options, NEB options, locale/currency options, and utility choices.

## Reports And Exports

Reports live primarily in `src/app/shared/reports/`. They include assessment reports, on-site visit reports, executive summaries, custom reports, charts, tables, and report calculations.

Export/import related assets and services include:

- `src/assets/template-files/JUSTIFI_project_template.xlsx`
- `ParseExcelTemplateService`
- Excel writer services
- `PowerpointReportGeneratorService`
- backup modal components
- `BackupDataService`

## Web And Desktop Behavior

The same Angular app is built for web and Electron:

- `npm run build` builds a web app with `/` as base href.
- `npm run build-electron` builds with `--base-href .` for Electron-compatible relative paths.
- `npm run build-prod` builds a web production app with `/` as base href.
- `npm run build-prod-electron` builds a production app for Electron with relative base href.
- `npm run dist` packages native installers through `electron-builder`.

The hosted web app uses clean Angular URLs and requires server fallback routing to `index.html`. Electron/file-protocol execution keeps hash routing so local packaged builds can navigate without a web server. See [SEO And Google Search Console](seo-and-search-console.md) for sitemap, crawler metadata, and hosting requirements.

Electron-specific update behavior is in `main.js` and `src/app/electron/`. Web service worker behavior is configured through `ServiceWorkerModule.register()` and `ngsw-config.json`.

Do not build or package Electron for ordinary Angular changes. Use Electron verification only when a task explicitly touches installers, updater behavior, signing, package config, native shell behavior, or desktop-only functionality.

## Agent Notes

- Prefer editing the closest feature folder instead of adding broad shared code.
- Do not change persistence, backup, report, or packaging behavior as a side effect of UI work.
- Add focused specs beside changed TypeScript files.
- Update docs when changing architecture, workflows, commands, release behavior, or data contracts.
