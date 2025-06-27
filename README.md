# JUSTIFI
<!-- Add CI / Download badges, once we have them -->

A user friendly, graphical, open-source application (Web/Mac/Windows) of the multiple benefits framework for non-energy benefits, incorporating additional aspects to make the tool effective for use in the United States.

The latest version of the application can be found at [https://justifi.ornl.gov](https://justifi.ornl.gov)

<!-- Link to downloads, once we have them -->

# For Developers
This tool is written in the Angular javascript framework and uses Electron for platform-specific builds.

If you plan to contribute your code changes to this repository, please review the [contributing guidelines](CONTRIBUTING.md) first.

## Getting Started

- We are using NodeJS v 20.9 LTS [nodejs.org](https://nodejs.org/en/download)

- To install all required packages: `npm install`

- To install the Angular CLI which is required for tests, `npm install -g @angular/cli`

    - Note: If you don't want to install angular cli globally, you can install it locally using `npm install @angular/cli` and then run it using `npm run-script ng`

- When developing for web run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

- When developing in electron window use `npm run build-watch` and a re-build will trigger on save of changes

- To start the electron app (kill and restart app after rebuild on save): `npm run electron`


## Build

- Built artifacts will be stored in the `/dist` directory.

- General build for electron `npm run build`

- Production Web Build `npm run build-prod`

- Production Electron Build `npm run build-prod-electron`

## Native Installers

- `npm run dist` will create electron installers for your operating system

- Installer will be created in an `./output/` directory 


## Running unit tests

- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Karma unit tests use Google Chrome as a default browser. This will need to be installed on your machine for the tests to run using `ng test` or `npm run test`.

Otherwise, you can run the tests with a headless version of chrome using `ng test --browsers=ChromeHeadless` or `npm run test-ci`.

Check the [Karma Config](https://karma-runner.github.io/6.4/config/configuration-file.html) documentation on how to target other browsers using a config file.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.8.

Released under software record NREL/SWR-24-08.
