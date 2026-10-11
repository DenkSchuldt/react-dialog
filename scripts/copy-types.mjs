import { copyFile, writeFile } from 'node:fs/promises';

const declaration = new URL('../src/index.d.ts', import.meta.url);
await copyFile(declaration, new URL('../dist/index.d.ts', import.meta.url));
await copyFile(declaration, new URL('../dist/index.d.cts', import.meta.url));

// React 16/17 do not export extensionless jsx-runtime for native Node ESM.
// Reuse the CJS build there, while bundlers retain the native ESM entry point.
await writeFile(new URL('../dist/index.node.js', import.meta.url),
  "import dialog from './index.cjs';\nexport default dialog.default;\n");
