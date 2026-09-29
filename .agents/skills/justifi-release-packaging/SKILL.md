---
name: justifi-release-packaging
description: Work on JUSTIFI versioning, package scripts, Electron shell, service worker, GitHub workflows, installers, signing, or release notes.
---

# JUSTIFI Release Packaging

Use this skill only for release, packaging, Electron, installer, service worker, workflow, or versioning work. Electron is primarily an installable wrapper around the Angular app and is out of scope for ordinary app changes.

## Read First

- `AGENTS.md`
- `docs/release-and-packaging.md`
- `package.json`
- `main.js`
- `ngsw-config.json`
- `.github/workflows/`

## Working Guidance

- Distinguish web behavior from Electron behavior.
- Preserve base href differences between web and Electron builds.
- Treat updater, signing, workflow, installer, and artifact-output changes as high risk.
- Do not run Electron builds or packaging checks unless Electron, installers, updater, signing, native packaging, package scripts, or desktop-only behavior is explicitly in scope.
- Do not rewrite branch policy or workflow triggers unless explicitly requested.
- Document release impact in the PR.

## Verification

- Run the smallest relevant build/test command.
- Note platform-specific checks that cannot run locally.
- Summarize web/Electron impact and residual packaging risk.
