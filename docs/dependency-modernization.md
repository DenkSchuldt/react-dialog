# Dependency modernization (unreleased)

Versions were checked against the npm registry's stable `latest` tags on
2026-10-11. Direct dependencies are exact-pinned and one npm v3 lockfile covers
the library and demo workspace. No Bootstrap, prerelease packages, forced audit
fixes, npm release or Pages deployment are part of this change.

## Updated and new dependencies

| Package | Previous declaration | New declaration |
| --- | --- | --- |
| `@eslint/js` | New | library: 10.0.1 |
| `@playwright/test` | New | library: 1.64.0 |
| `@storybook/addon-docs` | New | library: 10.6.1 |
| `@storybook/addon-links` | library: ^6.2.2 | library: 10.6.1 |
| `@storybook/react-vite` | New | library: 10.6.1 |
| `@testing-library/jest-dom` | demo: ^5.11.4 | library: 7.0.1 |
| `@testing-library/react` | library: ^11.2.5; demo: ^11.1.0 | library: 16.3.3 |
| `@testing-library/user-event` | demo: ^12.1.10 | library: 14.6.7 |
| `@types/node` | New | library: 26.6.5 |
| `@types/react` | New | library: 19.3.0 |
| `@types/react-dom` | New | library: 19.3.0 |
| `@vitejs/plugin-react` | New | library: 6.1.2 |
| `eslint` | New | library: 10.12.0 |
| `eslint-plugin-react-hooks` | New | library: 7.1.1 |
| `globals` | New | library: 17.13.0 |
| `jsdom` | New | library: 30.1.2 |
| `prop-types` | library: 15.7.2 | library: 15.8.1 |
| `react` | library: 17.0.1; demo: ^17.0.2 | library: 19.3.0; demo: 19.3.0 |
| `react-dom` | library: 17.0.1; demo: ^17.0.2 | library: 19.3.0; demo: 19.3.0 |
| `react-draggable` | library: 4.4.3 | library: 4.7.2 |
| `react-syntax-highlighter` | New | demo: 16.1.2 |
| `sass` | library: ^1.32.8 | library: 1.105.1 |
| `storybook` | New | library: 10.6.1 |
| `typescript` | New | library: 7.0.2 |
| `vite` | New | library: 8.3.4 |
| `vite-plugin-css-injected-by-js` | New | library: 5.0.2 |
| `vitest` | New | library: 5.0.3 |

## Removed/replaced dependencies

The previous project had no committed lockfile, so old entries below are
manifest ranges rather than claimed installed versions.

| Package | Previous declaration | Replacement/reason |
| --- | --- | --- |
| `@babel/cli` | library: ^7.13.10 | Vite with its current React plugin replaces the old build stack. |
| `@babel/core` | library: ^7.13.13 | Vite with its current React plugin replaces the old build stack. |
| `@babel/preset-env` | library: ^7.13.12 | Vite with its current React plugin replaces the old build stack. |
| `@babel/preset-react` | library: ^7.13.13 | Vite with its current React plugin replaces the old build stack. |
| `@denkschuldt/react-dialog` | demo: ^1.0.4 | Demo aliases this checkout source rather than testing the old published package. |
| `@rollup/plugin-babel` | library: ^5.3.0 | Vite with its current React plugin replaces the old build stack. |
| `@rollup/plugin-commonjs` | library: ^18.0.0 | Vite with its current React plugin replaces the old build stack. |
| `@rollup/plugin-node-resolve` | library: ^11.2.1 | Vite with its current React plugin replaces the old build stack. |
| `@rollup/plugin-url` | library: ^6.0.0 | Vite with its current React plugin replaces the old build stack. |
| `@storybook/addon-actions` | library: ^6.2.2 | Storybook 10 React/Vite, docs and built-in controls/actions replace legacy addons. |
| `@storybook/addon-essentials` | library: ^6.2.2 | Storybook 10 React/Vite, docs and built-in controls/actions replace legacy addons. |
| `@storybook/preset-scss` | library: ^1.0.3 | Storybook 10 React/Vite, docs and built-in controls/actions replace legacy addons. |
| `@storybook/react` | library: ^6.2.2 | Storybook 10 React/Vite, docs and built-in controls/actions replace legacy addons. |
| `babel-core` | library: ^6.26.3 | Vite with its current React plugin replaces the old build stack. |
| `babel-jest` | library: ^26.6.3 | Vitest and current Testing Library replace Jest 26. |
| `babel-loader` | library: ^7.1.5 | Vite with its current React plugin replaces the old build stack. |
| `babel-runtime` | library: ^6.26.0 | Vite with its current React plugin replaces the old build stack. |
| `css-loader` | library: ^5.2.0 | Vite with its current React plugin replaces the old build stack. |
| `gh-pages` | demo: ^3.1.0 | Latest gh-pages still reaches unpatched braces; deployment remains separate from build/test. |
| `jest` | library: ^26.6.0 | Vitest and current Testing Library replace Jest 26. |
| `node-sass` | library: 4.14.1 | Dart Sass replaces the unsupported native Node Sass runtime. |
| `react-code-blocks` | demo: 0.0.8 | Direct light react-syntax-highlighter 16.1.2 avoids an outdated vulnerable Prism dependency. |
| `react-scripts` | demo: 4.0.3 | Vite replaces the retired Create React App toolchain. |
| `rollup` | library: ^2.43.1 | Vite with its current React plugin replaces the old build stack. |
| `rollup-plugin-sass` | library: ^1.2.2 | Vite with its current React plugin replaces the old build stack. |
| `sass-loader` | library: ^10.1.1 | Vite with its current React plugin replaces the old build stack. |
| `style-loader` | library: ^2.0.0 | Vite with its current React plugin replaces the old build stack. |
| `web-vitals` | demo: ^1.0.1 | Unused CRA reporting hook removed; no analytics was configured. |

## Compatibility and packaging

- React/React DOM 19.3.0 are used for development and demo. Consumer peers cover
  React 16.14, 17, 18 and 19; the lower bound moves from 16.8 to 16.14 for the
  automatic JSX runtime. This boundary and new package exports require release
  review before publishing; package version 1.0.4 has deliberately not changed.
- The default import, props, default labels, CSS class names, injected styling,
  button callbacks and 90 ms close delay are retained. No CSS import is needed.
- The library ships ESM, CJS, `.d.ts` and `.d.cts` declarations. Native Node ESM
  uses a small CJS bridge because React 16/17 do not expose an extensionless
  `react/jsx-runtime` export; browser bundlers get the native ESM build.
- Use the public package import. Undocumented deep imports are not exported.
- The demo uses `createRoot` and StrictMode. It is a private npm workspace.
- Development requires Node >=22.13 and npm >=11; `.nvmrc` selects Node 24 LTS.

## Verification

```sh
npm ci
npm run check
npm test --workspace examples
npm run test:package -- 16.14.0 17.0.2 18.3.1 19.3.0
npx playwright install chromium
npm run test:e2e
npm audit
```

The regression suite covers defaults, dimensions, real drag events in
StrictMode, body/close drag exclusions, callbacks, disabling actions, repeated
close clicks, changing Escape settings/callbacks, timer cleanup and independent
dialogs. Demo tests cover repeated open/close, actions, expandable examples,
syntax highlighting and clipboard failure.

Package smoke tests install the generated tarball in fresh temporary consumers,
exercise CommonJS/ESM server rendering, check each export/declaration file and
compile both `.mts` and `.cts` consumers with matching React type majors. Each
consumer also mounts, drags, closes with Escape and unmounts in JSDOM. A separate
DOM smoke test checks automatic CSS
injection. Browser tests exercise the production demo on desktop Chromium and
mobile touch emulation. CI runs checks on Node 22 and 24 and has read-only
repository permission; there are no publish/deploy steps.

## Security decisions

The initial latest-version audit still found two obsolete dependency chains:

- `gh-pages -> globby -> fast-glob -> micromatch -> braces`, affected by
  [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
  There is no patched braces version. The unused deployment helper and its
  scripts are removed rather than downgrading or suppressing the advisory.
- `react-code-blocks -> react-syntax-highlighter 15 -> refractor -> prismjs`,
  affected by [GHSA-x7hr-w5r2-h6wg](https://github.com/advisories/GHSA-x7hr-w5r2-h6wg).
  The demo now uses the maintained highlighter directly with current Prism.

After replacing those paths, `npm audit` reported **0 vulnerabilities** on
2026-10-11. This is a dependency advisory scan, not a security guarantee.

## Upstream references

- [React 19 migration guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [Vite getting started](https://vite.dev/guide/)
- [Storybook React/Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite)
- [Syntax highlighter project](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
