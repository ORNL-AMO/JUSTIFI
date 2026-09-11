# AI Dry Run

This records a documentation-only dry run performed after adding the agent guidance. It validates that the new guidance is usable without changing application behavior.

## Task

Prompt used:

```text
Use the new JUSTIFI agent guidance to scope a small documentation-only maintenance task: verify where an agent should start before changing report/export behavior and identify the likely verification command.
```

## Steps Performed

The dry run followed the same path expected from a development agent:

- Started with `AGENTS.md`.
- Followed links to `docs/architecture.md`, `docs/data-model.md`, and `docs/testing.md`.
- Checked report/export guidance against `src/app/shared/reports/`, shared export services, backup/import components, and `src/assets/template-files/`.
- Confirmed the task was documentation-only and did not require runtime edits.
- Selected docs/link review as the required verification path.
- Reserved `npm run test-ci` for broad or high-risk code changes rather than this documentation-only task.
- Ran documentation-oriented validations for this branch: `git diff --check`, frontmatter parsing for instruction and skill files, and YAML parsing for the agent-task issue template.

## Observed Output

The guidance gave enough context to:

- identify the report/export feature area
- distinguish documentation-only work from runtime behavior changes
- find relevant domain and persistence risks
- select verification based on the actual change type
- prepare PR notes covering scope, docs, tests, and residual risk

The selected verification stayed focused: Markdown/YAML/frontmatter checks for docs and templates, with no Angular test run because no runtime code changed.

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
