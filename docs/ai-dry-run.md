# AI Dry Run

This dry run validates that the new agent guidance is usable without changing application behavior.

## Scenario

Prompt used:

```text
Use the new JUSTIFI agent guidance to scope a small documentation-only maintenance task: verify where an agent should start before changing report/export behavior and identify the likely verification command.
```

## Expected Agent Path

An agent should:

- start with `AGENTS.md`
- read `docs/architecture.md`, `docs/data-model.md`, and `docs/testing.md`
- identify `src/app/shared/reports/`, shared export services, backup/import components, and `src/assets/template-files/` as relevant report/export areas
- avoid runtime edits because the task is documentation-only
- choose docs/link review as required verification and reserve `npm run test-ci` for broad or high-risk code changes

## Result

The new guidance provides enough context to:

- identify the report/export feature area
- distinguish documentation-only work from runtime behavior changes
- find relevant domain and persistence risks
- select verification based on the actual change type
- prepare PR notes covering scope, docs, tests, and residual risk

## Gaps Found

No blocking gaps were found during this dry run. Future improvements could add screenshots or diagrams for the report/export workflow if maintainers want a more visual onboarding path.

## Acceptance Check

- Root agent entry point exists: `AGENTS.md`.
- Architecture, data model, persistence, testing, release, glossary, personas, prompts, and dry-run docs exist under `docs/`.
- Copilot instructions exist under `.github/`.
- Code review guidance exists in `REVIEW.md`, `.github/instructions/`, and `.github/skills/code-review/`.
- Repo-local Codex skills exist under `.agents/skills/`.
- UI/UX review guidance exists as a persona and repo-local skill.
- Issue and PR guidance exist under `.github/`.
- Existing human-facing docs remain linked as canonical sources.
