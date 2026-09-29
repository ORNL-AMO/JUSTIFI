---
name: justifi-docs
description: Update JUSTIFI contributor docs, architecture docs, glossary, agent guidance, Copilot instructions, issue templates, PR templates, or repository-local skills.
---

# JUSTIFI Docs

Use this skill for contributor documentation, architecture docs, glossary updates, agent guidance, Copilot instructions, templates, and repo-local Codex skills.

## Read First

- `AGENTS.md`
- `README.md`
- `CONTRIBUTING.md`
- `CODING_STYLE.md`
- relevant files under `docs/`
- relevant files under `.github/`

## Working Guidance

- Keep existing human-facing docs canonical where appropriate.
- Link to canonical sources instead of duplicating large sections.
- Keep agent guidance concise, actionable, and specific to JUSTIFI.
- Update `docs/domain-glossary.md` when durable terminology changes.
- Update `docs/agent-task-prompts.md` when recurring prompt patterns change.
- For skills, keep `SKILL.md` short and self-contained unless a real recurring workflow needs supporting resources.

## Verification

- Review Markdown/YAML structure and relative links.
- Confirm acceptance criteria map to concrete files.
- Code tests are not normally required for docs-only changes.
