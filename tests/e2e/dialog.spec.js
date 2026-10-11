import { test, expect, dismissWelcome, openExample } from './fixtures.js';

test.beforeEach(async ({ page }) => {
  await page.goto('./');
});

test('welcome dialog confirms, closes, and reopens repeatedly', async ({ page }) => {
  const dialog = page.locator('.dnk-dialog');
  await expect(page).toHaveTitle('@denkschuldt/react-dialog');
  await expect(dialog.locator('.dnk-dialog-header')).toHaveText('@denkschuldt/react-dialog');
  await expect(dialog.locator('.dnk-dialog-content')).toHaveCSS('border-radius', '10px');
  await expect(dialog.getByRole('button', { name: 'CANCEL', exact: true })).toHaveCount(0);

  // These are intentionally disabled on the welcome example.
  await page.keyboard.press('Escape');
  await page.mouse.click(8, 8);
  await expect(dialog).toHaveCount(1);

  for (let cycle = 0; cycle < 3; cycle += 1) {
    await dialog.getByRole('button', { name: 'Woohoo!', exact: true }).press('Enter');
    await expect(dialog).toHaveCount(0);
    await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
    await expect(dialog).toHaveCount(1);
    await dialog.getByRole('button', { name: 'Close dialog', exact: true }).press('Space');
    await expect(dialog).toHaveCount(0);
    await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
    await expect(dialog.getByRole('button', { name: 'Woohoo!', exact: true })).toBeVisible();
  }
});

test('dragging the header moves the dialog, body interaction does not, and reopen resets it', async ({ page }) => {
  await dismissWelcome(page);
  const dialog = await openExample(page, 1, 'Basic');
  const wrapper = dialog.locator('.dnk-dialog-content-wrapper');
  const before = await wrapper.boundingBox();
  const header = await dialog.locator('.dnk-dialog-header').boundingBox();
  expect(before).not.toBeNull();
  expect(header).not.toBeNull();

  await page.mouse.move(header.x + header.width / 2, header.y + header.height / 2);
  await page.mouse.down();
  await page.mouse.move(header.x + header.width / 2 + 120, header.y + header.height / 2 + 60, { steps: 10 });
  await page.mouse.up();
  const after = await wrapper.boundingBox();
  expect(after.x - before.x).toBeCloseTo(120, 0);
  expect(after.y - before.y).toBeCloseTo(60, 0);

  const body = await dialog.locator('.dnk-dialog-body').boundingBox();
  await page.mouse.move(body.x + 30, body.y + 30);
  await page.mouse.down();
  await page.mouse.move(body.x + 80, body.y + 70, { steps: 5 });
  await page.mouse.up();
  const afterBodyInteraction = await wrapper.boundingBox();
  expect(afterBodyInteraction.x).toBeCloseTo(after.x, 0);
  expect(afterBodyInteraction.y).toBeCloseTo(after.y, 0);
  await expect(dialog).toBeVisible();

  await dialog.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await openExample(page, 1, 'Basic');
  const reopened = await wrapper.boundingBox();
  expect(reopened.x).toBeCloseTo(before.x, 0);
  expect(reopened.y).toBeCloseTo(before.y, 0);
});

test('all example callbacks and outside dismissal work after repeated reopening', async ({ page }) => {
  await dismissWelcome(page);

  for (const action of ['CANCEL', 'OK', 'Close dialog', 'outside', 'OK', 'CANCEL']) {
    const dialog = await openExample(page, 2, 'With buttons');
    await expect(dialog.locator('.dnk-dialog-content')).toHaveCSS('width', '400px');
    await expect(dialog.getByRole('button', { name: 'CANCEL', exact: true })).toBeEnabled();
    await expect(dialog.getByRole('button', { name: 'OK', exact: true })).toBeEnabled();
    await expect(dialog.locator('.dnk-dialog-body')).toContainText('one for cancelations, and one for confirmations.');

    if (action === 'outside') {
      await page.mouse.click(8, 8);
    } else {
      await dialog.getByRole('button', { name: action, exact: true }).click();
    }

    await expect(page.locator('.dnk-dialog')).toHaveCount(0);
  }
});

test('custom styles and both custom example actions survive the production build', async ({ page }) => {
  await dismissWelcome(page);

  for (const action of ['CANCEL', 'OK']) {
    const dialog = await openExample(page, 3, 'Overriding styles');
    await expect(dialog).toHaveClass(/my-custom-styles/);
    await expect(dialog.locator('.dnk-dialog-content')).toHaveCSS('border-radius', '0px');
    await expect(dialog.locator('.dnk-dialog-content')).toHaveCSS('width', '320px');
    await expect(dialog.getByRole('button', { name: 'OK', exact: true })).toHaveCSS('background-color', 'rgb(75, 131, 13)');
    await expect(dialog.locator('.dnk-dialog-body')).toContainText("You can change the styles by overriding the dialog's classes");
    await dialog.getByRole('button', { name: action, exact: true }).click();
    await expect(page.locator('.dnk-dialog')).toHaveCount(0);
  }
});

test('native dialog buttons and example toggles are keyboard accessible', async ({ page }) => {
  const close = page.getByRole('button', { name: 'Close dialog', exact: true });
  await close.focus();
  await expect(close).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Woohoo!', exact: true })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('.dnk-dialog')).toHaveCount(0);

  for (const [number, name] of [[1, 'basic'], [2, 'with buttons'], [3, 'overriding styles']]) {
    const collapse = page.getByRole('button', { name: `Collapse ${name} example`, exact: true });
    await expect(collapse).toHaveAttribute('aria-controls', `example-${number}`);
    await expect(collapse).toHaveAttribute('aria-expanded', 'true');
    await collapse.focus();
    await page.keyboard.press('Enter');
    const expand = page.getByRole('button', { name: `Expand ${name} example`, exact: true });
    await expect(expand).toBeFocused();
    await expect(expand).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator(`#example-${number}`)).toHaveCount(0);
    await page.keyboard.press('Space');
    await expect(collapse).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator(`#example-${number}`)).toBeVisible();
  }
});

test('production usage snippets are dedented and syntax highlighted', async ({ page }) => {
  await dismissWelcome(page);
  const snippets = page.locator('.app-code-block');
  await expect(snippets).toHaveCount(3);

  for (const snippet of await snippets.all()) {
    const code = snippet.locator('code');
    expect(await code.textContent()).toMatch(/^import \{ createRoot \} from 'react-dom\/client';/);
    await expect(code).toContainText('<Dialog');
    expect(await code.locator('span').count()).toBeGreaterThan(10);
    await expect(snippet).toHaveCSS('border-radius', '10px');
    await expect(snippet).toHaveCSS('overflow-x', 'auto');
  }
});

test('copy command writes the real browser clipboard and announces success', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await dismissWelcome(page);
  const copy = page.getByRole('button', { name: 'Copy installation command', exact: true });
  await copy.focus();
  await page.keyboard.press('Enter');

  await expect(page.getByRole('status')).toHaveText('Installation command copied.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('npm install @denkschuldt/react-dialog');
});

test('copy command gives a useful fallback if clipboard access is denied', async ({ page }) => {
  await dismissWelcome(page);
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new DOMException('Clipboard access denied for this test', 'NotAllowedError');
    };
  });
  await page.getByRole('button', { name: 'Copy installation command', exact: true }).click();

  await expect(page.getByRole('status')).toHaveText('Could not copy. Select and copy the command above.');
  await expect(page.locator('.app-installation-code code')).toHaveText('npm install @denkschuldt/react-dialog');
});
