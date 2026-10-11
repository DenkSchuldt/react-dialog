# React dialog examples

Interactive demos and usage documentation for `@denkschuldt/react-dialog`, built with React and Vite. The demo uses the library source from this repository, so local component changes are reflected immediately. Styles are standalone SCSS; Bootstrap is not required.

## Get started

Use Node.js 22.13 or newer and npm 11 or newer. Install dependencies once from the repository root using the shared workspace lockfile:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally <http://localhost:5173/react-dialog/>. The page updates automatically when source files change.

## Test and build

Run these commands from the repository root:

```sh
npm test
npm run build:demo
```

The Vitest suite covers the library and demo, including repeated open/close cycles, cancel/confirm actions, code-example toggles, and clipboard feedback. The production demo is generated in `examples/dist` with the `/react-dialog/` base path used by GitHub Pages.

Preview the production build locally:

```sh
npm run preview --workspace examples
```

## Storybook

```sh
npm run storybook
npm run build-storybook
```

Storybook runs on port 6006. Its static output is written to `storybook-static` at the repository root. Component stories are in `src/components/Dialog.stories.jsx`.

## Publishing

The build outputs (`examples/dist` and `storybook-static`) are ready for a separate manual publishing workflow. Builds, tests, and CI do not publish or deploy anything. Publish only after the destination and deployment have been explicitly approved.
