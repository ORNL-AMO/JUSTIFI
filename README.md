# JUSTIFI
<!-- Badges -->
[![Build Status](https://github.com/ORNL-AMO/JUSTIFI/actions/workflows/main.yml/badge.svg)](https://github.com/ORNL-AMO/JUSTIFI/actions)
[![License: MIT](https://img.shields.io/github/license/ORNL-AMO/JUSTIFI)](./LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/ORNL-AMO/JUSTIFI)](https://github.com/ORNL-AMO/JUSTIFI/releases)
[![Issues](https://img.shields.io/github/issues/ORNL-AMO/JUSTIFI)](https://github.com/ORNL-AMO/JUSTIFI/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/ORNL-AMO/JUSTIFI)](https://github.com/ORNL-AMO/JUSTIFI/pulls)
[![Contributors](https://img.shields.io/github/contributors/ORNL-AMO/JUSTIFI)](https://github.com/ORNL-AMO/JUSTIFI/graphs/contributors)
[![Last Commit](https://img.shields.io/github/last-commit/ORNL-AMO/JUSTIFI)](https://github.com/ORNL-AMO/JUSTIFI/commits/main)


 JUSTIFI is a tool that is a member of Oak Ridge National Laboratory's Industrial Resources suite of applications. The application was developed in collaboration with the National Renewable Energy Laboratory (NREL) around the study of Non-Energy Benefits (NEBs). JUSTIFI allows users to identify the Key Performance Metrics (KPM) for a manufacturing facility and quantify the impacts of NEBs from implementation of energy efficiency opportunities.

JUSTIFI, like it's sister applications [MEASUR](https://github.com/ORNL-AMO/MEASUR) and [VERIFI](https://github.com/ORNL-AMO/VERIFI), is developed as a web application but is also packaged and distributed as an installable desktop application.
 
The latest web version of the application can be found at [https://justifi.ornl.gov](https://justifi.ornl.gov)

Installable versions of the application can be found under the [releases](https://github.com/ORNL-AMO/JUSTIFI/releases) section of this repository.

Alternatively, downloads and additional information about ORNL's suite of tools can be found at [ORNL's Industrial Resources](https://industrialresources.ornl.gov/) site.


# Non-energy Benefits Research
NREL lead the research effort around the study and quantification of NEBs. For more information visit the [Non-energy Benefits Knowledge Library](https://www.nrel.gov/manufacturing/non-energy-benefits)


# For Developers
This tool is written in the Angular framework (TypeScript) and uses Electron for cross-platform desktop builds.

If you plan to contribute code changes to this repository, please review the [contributing guidelines](CONTRIBUTING.md) first.

## Getting Started

- We are using NodeJS [nodejs.org](https://nodejs.org/en/download). See [`package.json`](./package.json) for currently supported version.

- To install all required packages: `npm install`

- To install the Angular CLI which is required for tests: `npm install -g @angular/cli`

    - Note: If you don't want to install Angular CLI globally, you can install it locally using `npm install @angular/cli` and then run it using `npm run-script ng`

- When developing for web, run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


### Electron Development
- It is recommended to develop using the web version of the application unless you want to add an Electron specific feature.

- When developing in the Electron window, use `npm run build-watch` and a re-build will trigger on save of changes.

- To start the Electron app (kill and restart app after rebuild on save): `npm run electron`


## Build

- Built artifacts will be stored in the `/dist` directory.

- General build for Electron: `npm run build`

- Production Web Build: `npm run build-prod`

- Production Electron Build: `npm run build-prod-electron`

## Native Installers

- `npm run dist` will create Electron installers for your operating system.

- Installer will be created in an `./output/` directory.


## Running unit tests

- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Karma unit tests use Google Chrome as a default browser. This will need to be installed on your machine for the tests to run using `ng test` or `npm run test`.

Otherwise, you can run the tests with a headless version of chrome using `ng test --browsers=ChromeHeadless` or `npm run test-ci`.

Check the [Karma Config](https://karma-runner.github.io/6.4/config/configuration-file.html) documentation on how to target other browsers using a config file.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.8. and is typically updated to latest versions of angular as often is reasonable.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.