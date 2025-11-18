# About JUSTIFI
<!-- Badges -->
[![Build Status](https://github.com/ORNL-AMO/JUSTIFI/actions/workflows/main.yml/badge.svg)](https://github.com/ORNL-AMO/JUSTIFI/actions)
[![Latest Release](https://img.shields.io/github/v/release/ORNL-AMO/JUSTIFI)](https://github.com/ORNL-AMO/JUSTIFI/releases)
[![Issues](https://img.shields.io/github/issues/ORNL-AMO/JUSTIFI)](https://github.com/ORNL-AMO/JUSTIFI/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/ORNL-AMO/JUSTIFI)](https://github.com/ORNL-AMO/JUSTIFI/pulls)
[![Contributors](https://img.shields.io/github/contributors/ORNL-AMO/JUSTIFI)](https://github.com/ORNL-AMO/JUSTIFI/graphs/contributors)
[![Last Commit](https://img.shields.io/github/last-commit/ORNL-AMO/JUSTIFI)](https://github.com/ORNL-AMO/JUSTIFI/commits/main)


JUSTIFI is a tool that is a member of **Oak Ridge National Laboratory's Industrial Resources** suite of applications. The application was developed in collaboration with the **National Renewable Energy Laboratory (NREL)** around the study of **Non-Energy Benefits (NEBs)**. JUSTIFI allows users to identify the Key Performance Metrics (KPM) for a manufacturing facility and quantify the impacts of NEBs from implementation of energy efficiency opportunities.

JUSTIFI, like it's sibling applications [MEASUR](https://github.com/ORNL-AMO/MEASUR) and [VERIFI](https://github.com/ORNL-AMO/VERIFI), is developed as a web application but is also packaged and distributed as an installable desktop application.
 
The latest web version of the application can be found at [https://justifi.ornl.gov](https://justifi.ornl.gov)

Installable versions of the application can be found under the [releases](https://github.com/ORNL-AMO/JUSTIFI/releases) section of this repository.

Alternatively, downloads and additional information about ORNL's suite of tools can be found at [ORNL's Industrial Resources](https://industrialresources.ornl.gov/) site.


### 📋 Project Board

Track our progress and planned work on the [JUSTIFI GitHub Project Board](https://github.com/orgs/ORNL-AMO/projects/9/views/17).


# Non-Energy Benefits Research
NREL lead the research effort around the study and quantification of NEBs. For more information visit the [Non-energy Benefits Knowledge Library](https://www.nrel.gov/manufacturing/non-energy-benefits).


# Details For Developers

This project is built with the **Angular** framework (TypeScript) and uses **Electron** for cross-platform desktop builds.

> **Thinking of contributing?** Please review our [Contributing Guidelines](CONTRIBUTING.md) first!

---

## 🚀 Getting Started

- **Node.js:** See [`package.json`](./package.json) for the supported version. Download from [nodejs.org](https://nodejs.org/en/download).
- **Angular CLI:** Project generated with [Angular CLI](https://github.com/angular/angular-cli) v16.2.8 (regularly updated).

### Install & Run

1. Install dependencies:
    ```bash
    npm install
    ```
2. Install Angular CLI (for tests):
    ```bash
    npm install -g @angular/cli
    ```
    - Or install locally: `npm install @angular/cli` and run with `npm run-script ng`
3. Start the web dev server:
    ```bash
    npm run start
    ```
    - Visit [http://localhost:4200/](http://localhost:4200/) (auto-reloads on changes)

---

### 🖥️ Electron Development

- Prefer web development unless adding Electron-specific features.
- For live Electron builds:
    ```bash
    npm run build-watch
    ```
- In a second terminal, start Electron:
    ```bash
    npm run electron
    ```
    - Kill and restart Electron after changes.

---

## 🏗️ Build

- Build artifacts: `/dist` directory
- Electron build:
    ```bash
    npm run build
    ```
- Production web build:
    ```bash
    npm run build-prod
    ```
- Production Electron build:
    ```bash
    npm run build-prod-electron
    ```

---

## 📦 Native Installers

- Create Electron installers:
    ```bash
    npm run dist
    ```
- Installers are output to `./output/`

---

## 🧪 Running Unit Tests

- To run unit tests (requires Chrome):
    ```bash
    ng test
    # or
    npm run test
    ```

- For headless testing (no browser UI):
    ```bash
    ng test --browsers=ChromeHeadless
    # or
    npm run test-ci
    ```
- See [Karma Config](https://karma-runner.github.io/6.4/config/configuration-file.html) for browser targeting.

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.