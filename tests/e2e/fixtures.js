import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, run) => {
    const errors = [];
    const recordError = error => errors.push(error.message);
    page.on('pageerror', recordError);

    await run(page);

    page.off('pageerror', recordError);
    expect(errors, 'The production demo must not throw browser errors').toEqual([]);
  },
});

export { expect };

export async function dismissWelcome(page) {
  // The welcome card intentionally pulses. Keyboard activation does not need
  // to wait for its continuously animated bounding box to become stationary.
  await page.getByRole('button', { name: 'Woohoo!', exact: true }).press('Enter');
  await expect(page.locator('.dnk-dialog')).toHaveCount(0);
}

export async function openExample(page, number, title) {
  await page.locator(`#example-${number}`).getByRole('button', { name: 'Show dialog', exact: true }).click();
  const dialog = page.locator('.dnk-dialog');
  await expect(dialog).toHaveCount(1);
  await expect(dialog.locator('.dnk-dialog-header')).toHaveText(title);
  return dialog;
}
