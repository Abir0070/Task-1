# FintecApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Responsiveness and compatibility

The app is responsive with breakpoints at **375px** (small mobile), **768px** (tablet), and **1440px** (desktop). Viewport meta and touch-friendly spacing are set for cross-device compatibility.

## API integration

- **Service:** `src/app/services/compose-message-api.service.ts` – methods for templates, attributes, and submitting composed messages.
- **Docs and cURL:** See [docs/API-INTEGRATION.md](docs/API-INTEGRATION.md) for each method and example commands.

## Responsive screenshots (375px, 768px, 1440px)

- **Manual:** Chrome DevTools device toolbar at 375, 768, 1440.
- **Script:** `npm run screenshots` (requires `puppeteer`: `npm install --save-dev puppeteer`). App must be running. Output: `screenshots/375px.png`, `screenshots/768px.png`, `screenshots/1440px.png`.

See [docs/RESPONSIVE-SCREENSHOTS.md](docs/RESPONSIVE-SCREENSHOTS.md).

## Lighthouse performance report

With the app running (`npm start`):

- `npm run lighthouse` → desktop report → `lighthouse-report.html`
- `npm run lighthouse:mobile` → mobile report → `lighthouse-report-mobile.html`
- `npm run lighthouse:all` → both

See [docs/LIGHTHOUSE-PERFORMANCE.md](docs/LIGHTHOUSE-PERFORMANCE.md).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
