# JUSTIFI Release And Packaging

JUSTIFI ships as a web app and as native Electron installers. The Electron layer is primarily an installable wrapper around the Angular app, not a separate feature surface for most changes.

## Package Scripts

Key scripts from `package.json`:

- `npm run start`: local Angular dev server with no HMR.
- `npm run build`: Angular web build with `--base-href /`.
- `npm run build-electron`: Angular Electron development build with `--base-href .`.
- `npm run build-prod`: production web build with `--base-href /`.
- `npm run build-prod-electron`: production Angular build with `--base-href .`.
- `npm run build-watch`: watch build for Electron development.
- `npm run electron`: starts Electron against the built app.
- `npm run dist`: runs `electron-builder`.
- `npm run test-ci`: headless test command for CI-style verification.

For ordinary Angular app changes, do not run Electron builds or native packaging. Use these commands only when the issue or changed files involve Electron, installers, updater behavior, signing, native packaging, package scripts, or desktop-only behavior.

## Electron Packaging

Electron configuration lives in `package.json` under `build`.

Important settings:

- app ID: `gov.ornl.justifi`
- product name: `JUSTIFI`
- output directory: `./output/`
- Windows target: NSIS
- Linux targets: AppImage and tar.gz
- macOS targets: DMG and ZIP with hardened runtime and signing-related config

Electron runtime behavior is in `main.js`, including update checks through `electron-updater`.

## GitHub Workflows

Workflow files live under `.github/workflows/`.

- `main.yml` calls web and desktop release workflows on pushes to `develop` and `master`.
- `release_web.yml` builds and deploys the web app for `develop` and `master`.
- `release_desktop.yml` builds desktop release artifacts on `master`.
- Utility workflows handle project and mirror automation.

The web release workflow uses root base href builds so clean Angular URLs can load assets correctly after a direct
navigation or refresh. Develop web deployments replace the production `robots.txt` with `src/robots.dev.txt` to block
crawlers from indexing the staging deployment.

Note: `CONTRIBUTING.md` describes `main` and `develop`, while current workflows use `develop` and `master`. This document records current repository behavior; it does not change branch policy.

## Release Risks

Be careful with:

- `package.json` version, scripts, dependencies, and `build` config
- `main.js` updater behavior
- `entitlements.mac.inherit.plist`
- GitHub Actions workflows
- base href differences between web and Electron builds
- service worker production config in `ngsw-config.json`

## Agent Notes

- Do not change release automation as part of ordinary feature work.
- Ignore Electron verification for ordinary Angular, docs, form, dashboard, and report edits unless Electron is explicitly in scope.
- Include release impact in PR notes if touching scripts, Electron, service worker, workflows, icons, installer config, or versioning.
- Native packaging can be slow and platform-sensitive; use targeted review unless the task explicitly requires installer verification.
