import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

// Test what npm consumers actually install, including dependency declarations,
// both export conditions, server rendering and automatic CSS injection.
const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const versions = process.argv.slice(2);
if (!versions.length) versions.push(manifest.devDependencies.react);
const temporary = await mkdtemp(join(tmpdir(), 'react-dialog-package-'));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const runNpm = (args, cwd = root) => execFileSync(npm, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });

try {
  const packResult = JSON.parse(runNpm(['pack', '--ignore-scripts', '--json', '--pack-destination', temporary]));
  // npm 11 returns an array; npm 12 keys results by package name.
  const packed = Array.isArray(packResult) ? packResult[0] : packResult[manifest.name];
  assert(packed?.filename, 'npm pack must return the library tarball');
  for (const file of ['dist/index.js', 'dist/index.cjs', 'dist/index.node.js', 'dist/index.d.ts', 'dist/index.d.cts']) {
    assert(packed.files.some(({ path }) => path === file), `Missing ${file} in tarball`);
  }
  assert(!packed.files.some(({ path }) => /^(src|examples|tests|node_modules)\//.test(path)), 'Unexpected development files in tarball');

  for (const version of versions) {
    const consumer = await mkdtemp(join(temporary, 'consumer-'));
    await writeFile(join(consumer, 'package.json'), JSON.stringify({ name: 'package-smoke', version: '1.0.0', private: true, type: 'module' }));
    runNpm(['install', '--ignore-scripts', '--no-package-lock', '--no-audit', '--no-fund', join(temporary, packed.filename), `react@${version}`, `react-dom@${version}`, `@types/react@${version.split('.')[0]}`], consumer);
    // Use the installed tarball's conditional declarations, not source types.
    await writeFile(join(consumer, 'consumer.mts'), "import Dialog from '@denkschuldt/react-dialog';\nDialog({ onCloseClick() {} });\n");
    await writeFile(join(consumer, 'consumer.cts'), "import Dialog from '@denkschuldt/react-dialog';\nDialog({ onCloseClick() {} });\n");
    execFileSync(process.execPath, [join(root, 'node_modules/typescript/bin/tsc'), '--noEmit', '--strict', '--module', 'Node16', '--moduleResolution', 'Node16', '--types', 'react', 'consumer.mts', 'consumer.cts'], { cwd: consumer, stdio: 'inherit' });
    const check = `
      import assert from 'node:assert/strict';
      import { createRequire } from 'node:module';
      import React from 'react';
      const require = createRequire(import.meta.url);
      const { renderToString } = require('react-dom/server');
      const Dialog = process.env.PACKAGE_FORMAT === 'cjs'
        ? require('@denkschuldt/react-dialog').default
        : (await import('@denkschuldt/react-dialog')).default;
      assert.equal(typeof Dialog, 'function');
      const html = renderToString(React.createElement(Dialog, {
        title: 'Package smoke', onCloseClick() {}, onCancelClick() {}, onConfirmClick() {}
      }, 'Package body'));
      for (const text of ['Package smoke', 'Package body', 'CANCEL', 'OK', 'dnk-draggable']) assert(html.includes(text), text);
      console.log('Package ' + process.env.PACKAGE_FORMAT + ' / React ' + React.version + ': server rendering passed');
    `;
    const clientCheck = `
      import assert from 'node:assert/strict';
      import { createRequire } from 'node:module';
      import { JSDOM } from ${JSON.stringify(import.meta.resolve('jsdom'))};
      const dom = new JSDOM('<!doctype html><html><head></head><body><div id="root"></div></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
      globalThis.window = dom.window;
      globalThis.document = dom.window.document;
      globalThis.HTMLElement = dom.window.HTMLElement;
      globalThis.Node = dom.window.Node;
      globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
      globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);
      Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true });
      const require = createRequire(import.meta.url);
      const React = require('react');
      const ReactDOM = require('react-dom');
      const Dialog = (await import('@denkschuldt/react-dialog')).default;
      const container = document.getElementById('root');
      const flush = ReactDOM.flushSync || ((callback) => callback());
      let closes = 0;
      const element = React.createElement(React.StrictMode, null, React.createElement(Dialog, {
        title: 'Client smoke', closeOnEscPress: true, onCloseClick() { closes += 1; }
      }, 'Content'));
      const modernRoot = Number(React.version.split('.')[0]) >= 18 ? require('react-dom/client').createRoot(container) : null;
      flush(() => modernRoot ? modernRoot.render(element) : ReactDOM.render(element, container));
      await new Promise(resolve => setTimeout(resolve, 20));
      const header = document.querySelector('.dnk-dialog-header');
      assert(header, 'Dialog must mount');
      flush(() => header.dispatchEvent(new window.MouseEvent('mousedown', { bubbles: true, button: 0, clientX: 10, clientY: 20 })));
      flush(() => document.dispatchEvent(new window.MouseEvent('mousemove', { bubbles: true, clientX: 50, clientY: 80 })));
      flush(() => document.dispatchEvent(new window.MouseEvent('mouseup', { bubbles: true })));
      assert.equal(document.querySelector('.dnk-dialog-content-wrapper').style.transform, 'translate(40px,60px)');
      document.dispatchEvent(new window.KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
      document.querySelector('.dnk-dialog-close').click();
      await new Promise(resolve => setTimeout(resolve, 120));
      assert.equal(closes, 1, 'Repeated in-flight closes must coalesce');
      flush(() => modernRoot ? modernRoot.unmount() : ReactDOM.unmountComponentAtNode(container));
      document.dispatchEvent(new window.KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
      await new Promise(resolve => setTimeout(resolve, 120));
      assert.equal(closes, 1, 'Unmount must remove listeners');
      dom.window.close();
      console.log('Package client / React ' + React.version + ': StrictMode mount, drag, Escape and cleanup passed');
      // Old React schedulers retain a MessageChannel in Node after JSDOM closes.
      process.exit(0);
    `;
    execFileSync(process.execPath, ['--input-type=module', '-e', clientCheck], { cwd: consumer, env: { ...process.env, NODE_ENV: 'production' }, stdio: 'inherit' });
    for (const format of ['esm', 'cjs']) {
      execFileSync(process.execPath, ['--input-type=module', '-e', check], { cwd: consumer, env: { ...process.env, PACKAGE_FORMAT: format }, stdio: 'inherit' });
    }
  }

  const cssCheck = `
    import assert from 'node:assert/strict';
    import { JSDOM } from ${JSON.stringify(import.meta.resolve('jsdom'))};
    const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>');
    globalThis.document = dom.window.document;
    await import(${JSON.stringify(new URL('../dist/index.js', import.meta.url).href)});
    assert(document.head.textContent.includes('.dnk-dialog'), 'Dialog CSS must inject automatically');
    assert(document.head.textContent.includes('.dnk-btn'), 'Button CSS must inject automatically');
    assert(document.head.textContent.includes('@keyframes'), 'Animations must be included');
    dom.window.close();
    console.log('Automatic CSS injection passed');
  `;
  execFileSync(process.execPath, ['--input-type=module', '-e', cssCheck], { cwd: root, stdio: 'inherit' });
} finally {
  await rm(temporary, { recursive: true, force: true });
}
