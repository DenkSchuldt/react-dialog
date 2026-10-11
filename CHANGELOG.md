# CHANGELOG

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
The date format used is DD/MM/YYYY.


## [Unreleased]
### Changed
* Update library development, demo and Storybook to React/React DOM 19.3.0.
* Support React 16.14 through 19 with an automatic JSX runtime; React 16.8–16.13
  and undocumented deep package imports are no longer supported by this branch.
* Replace Create React App, legacy Rollup/Babel/Jest and Node Sass with Vite,
  Vitest and Dart Sass; migrate Storybook to 10.6.1 with tracked configuration.
* Use one npm workspace/lockfile; require Node.js 22.13+ and npm 11+ for development.
* Replace the demo's old code-block wrapper with a current syntax highlighter;
  remove the vulnerable gh-pages deployment helper. No automatic publishing.
### Added
* ESM/CommonJS exports, bundled TypeScript declarations and SSR/package checks.
* Unit, StrictMode, desktop/mobile browser regression tests and read-only CI.
### Fixed
* Preserve function defaults under React 19 and drag with an explicit DOM ref.
* Keep Escape options/callbacks fresh; cancel close timers on unmount and
  coalesce repeated close requests during the animation delay.
* Make demo controls keyboard-accessible and handle clipboard failure visibly.
* Document the existing outside-close default correctly as true.

## [1.0.4] - 30/05/2021
### Fixed
* Fixing draggable on mobile

## [1.0.3] - 04/04/2021
### Fixed
* Removing overriding styles from body

## [1.0.2] - 29/03/2021
## [1.0.1] - 29/03/2021
### Fixed
* Accessibility: Close with keyboard (Esc), and showing button outlines.

## [1.0.0] - 28/03/2021
### Added
* Seeing the light. First release of react-dialog. ✨
