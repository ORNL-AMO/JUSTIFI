# Agent Task Prompts

Use these prompt patterns to make AI-assisted work easier to scope and review.

## Angular Feature Or Bug

```text
Work on issue #<number>. Read AGENTS.md, CODING_STYLE.md, docs/architecture.md, and the closest feature files first.

Goal:
<expected user-visible behavior>

Scope:
<specific route/component/service area>

Constraints:
- preserve existing NgModule structure unless a standalone migration is explicitly required
- do not change IndexedDB schema or backup/import behavior
- add or update focused specs
- consider labels, validation states, workflow clarity, layout fit, and accessibility basics for visible UI changes

Verification:
- run the closest focused spec or targeted check first
- include manual UI notes or screenshots for visible changes
- rely on PR CI/CD for the full suite unless the change is broad or high risk
```

## Persistence Or Migration

```text
Work on issue #<number>. Read AGENTS.md, docs/persistence.md, docs/data-model.md, and the affected model/services first.

Goal:
<data behavior required>

Scope:
<stores/services/entities affected>

Constraints:
- preserve GUID relationships
- migration/repair logic must be idempotent
- backup/import compatibility must be considered
- document migration risk in the PR

Verification:
- add focused service tests for old and current data shapes
- run the closest focused persistence tests first
- consider npm run test-ci before handoff for migration or broad persistence risk
```

## Reports Or Exports

```text
Work on issue #<number>. Read AGENTS.md, docs/architecture.md, docs/data-model.md, and report/export files first.

Goal:
<report/export outcome>

Scope:
<assessment report, visit report, executive summary, custom report, Excel, PowerPoint, or backup>

Constraints:
- preserve saved report option behavior unless explicitly changing it
- keep calculations covered by focused tests
- avoid unrelated styling or data model changes

Verification:
- add/update specs around calculations or option filtering
- include manual report/export QA notes if the artifact cannot be fully tested
- consider npm run test-ci before handoff when shared calculations are affected
```

## Documentation-Only

```text
Work on issue #<number>. Read AGENTS.md and the docs being changed first.

Goal:
<docs outcome>

Scope:
<docs/templates/instructions affected>

Constraints:
- do not change runtime app behavior
- link to canonical docs instead of duplicating large sections
- keep agent guidance concise and actionable

Verification:
- review links and file references
- confirm every issue acceptance criterion maps to a doc/template/skill change
- do not run Angular tests for documentation-only edits
```

## Release Or Packaging

```text
Work on issue #<number>. Read AGENTS.md, docs/release-and-packaging.md, package.json, main.js, and relevant workflows first.

Goal:
<release or packaging outcome>

Scope:
<web, Electron, installer, updater, workflow, version, or service worker area>

Constraints:
- do not change app behavior outside packaging scope
- document web vs Electron impact
- preserve signing/updater assumptions unless explicitly changing them
- ignore Electron packaging unless Electron, installers, updater, signing, native packaging, package scripts, or desktop-only behavior is explicitly in scope

Verification:
- run the smallest relevant build/test command
- note platform-specific checks that cannot be run locally
```
