
# @denkschuldt/react-dialog

> A simple to use and customizable react dialog implementation.

## Installation
```bash
# NPM
$ npm install --save @denkschuldt/react-dialog
```
|Version     | Compatibility|
|------------|--------------|
|Published 1.x | React 16.8+ |
|Unreleased modernization | React 16.14, 17, 18 and 19 |

## Basic usage

<img
  src="./demo.gif"
  alt="Preview"/>

```javascript
import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import Dialog from '@denkschuldt/react-dialog';

const App = () => {
  const [ isVisible, setIsVisible ] = useState(false);
  return (
    <div>
      <button
        type='button'
        onClick={() => setIsVisible(true)}>
        Show dialog
      </button>
      {
        isVisible &&
        <Dialog
          title='Dialog'
          onCancelClick={() => {}}
          onConfirmClick={() => {}}
          onCloseClick={() => setIsVisible(false)}>
          <span>
            This is the body
          </span>
        </Dialog>
      }
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App/>);

```
See more examples at [@DenkSchuldt/react-dialog](https://denkschuldt.github.io/react-dialog)

## Props

| Name              | Type     | Required           | Description                                           | Default |
|-------------------|----------|--------------------|-------------------------------------------------------|---------|
| width             | Number   |                    | Dialog width                                          |         |
| height            | Number   |                    | Dialog height                                         |         |
| title             | String   |                    | Dialog title                                          |         |
| draggable         | Boolean  |                    | Allows dialog drag                                    | true    |
| className         | String   |                    | Component class to override styles                    |         |
| slideIn           | String   |                    | Initial animation: top, bottom, left, right           |         |
| cancelableOutside | Boolean  |                    | Whether the dialogs closes by clicking outside or not | true    |
| closeOnEscPress   | Boolean  |                    | Whether the dialogs closes by pressing escape         | false   |
| hideCloseButton   | Boolean  |                    | Hides the close button                                | false   |
| onCloseClick      | function | :white_check_mark: | Close button click function                           |         |
| cancelText        | String   |                    | Negative button text                                  | 'CANCEL'|
| onCancelClick     | function |                    | Negative button click function                        |         |
| cancelDisabled    | Boolean  |                    | Negative button disabled prop                         | false   |
| confirmText       | String   |                    | Positive button text                                  | 'OK'    |
| onConfirmClick    | function |                    | Positive button click function                        |         |
| confirmDisabled   | Boolean  |                    | Positive button disabled prop                         | false   |


## Styling
Use the className prop to override dialogs classes:
```scss
.your-css-class {
  .dnk-dialog-content {
    /* The dialog card */
    .dnk-dialog-close {
      /* The close button */
    }
    .dnk-dialog-body {
      .dnk-dialog-body-buttons {
        /* The buttons div container */
        button {
          /* cancel button */
          &.dnk-btn-primary {
            /* confirm button */
          }
        }
      }
    }
  }
}
```

## Development

Use Node.js 22.13+ (Node 24 LTS recommended) and npm 11+. The root npm workspace
includes the demo; a single committed lockfile covers both packages.

```sh
npm ci
npm run dev                 # Vite demo at /react-dialog/
npm run storybook           # Component playground on port 6006
npm run check               # Lint, declaration types, unit tests and all builds
npx playwright install chromium
npm run test:e2e            # Production desktop/mobile browser regression tests
npm run test:package -- 16.14.0 17.0.2 18.3.1
```

`npm run build` writes the library to `dist`, `npm run build:demo` writes the
website to `examples/dist`, and `npm run build-storybook` writes the playground
to `storybook-static`. The demo resolves this checkout's source, rather than an
older npm release. CI checks Node 22 and 24 and never publishes or deploys.

### Migration notes (unreleased)

- Development/demo React and React DOM are 19.3.0. The library supports React
  16.14 through 19; React 16.8–16.13 consumers must update for the automatic JSX
  runtime. The `createRoot` example above requires React 18 or newer.
- The public default import and dialog props remain unchanged. ESM and CommonJS
  entry points and TypeScript declarations are included. Import from
  `@denkschuldt/react-dialog`; internal/deep file imports are not public exports.
- CSS still loads automatically when the library is imported in the browser.
  No separate stylesheet import or Bootstrap is required. Both entry points are
  also safe to import during server rendering.
- Function defaults now use JavaScript parameters, and dragging supplies a DOM
  ref instead of React's removed `findDOMNode`. PropTypes remain for older React;
  React 19 consumers can use the bundled TypeScript declarations for checking.
- Close callbacks retain their 90 ms delay. Repeated clicks during that delay
  coalesce, pending callbacks are canceled on unmount, and Escape honors updated
  props. Remove the dialog from your close callback as in the examples above.
- Create React App, Node Sass, the legacy Rollup/Babel/Jest stack and obsolete
  Storybook addons have been replaced by Vite, Dart Sass, Vitest and Storybook 10.
- The old `gh-pages` deploy helper was removed because its latest release has
  an unpatched transitive security advisory. Build outputs remain ready for a
  separately managed deployment; no deployment command runs as part of checks.

See [dependency modernization details](docs/dependency-modernization.md) for
exact version changes, replacements and verification commands. Package version
1.0.4 is unchanged while this work is reviewed; these changes are not a release.

## Contributing
* Fork the project
* Make changes and include tests
* Update README, CHANGELOG with detailed info
* Send me a PR :bowtie:


## License

MIT
