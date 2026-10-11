import { test, expect, openExample } from './fixtures.js';

test('touch drag works on mobile and the dialog remains dismissible and reusable', async ({ page, context }) => {
  await page.goto('./');
  const welcomeConfirm = await page.getByRole('button', { name: 'Woohoo!', exact: true }).boundingBox();
  expect(welcomeConfirm).not.toBeNull();
  await page.touchscreen.tap(welcomeConfirm.x + welcomeConfirm.width / 2, welcomeConfirm.y + welcomeConfirm.height / 2);
  await expect(page.locator('.dnk-dialog')).toHaveCount(0);

  const dialog = await openExample(page, 1, 'Basic');
  const wrapper = dialog.locator('.dnk-dialog-content-wrapper');
  const before = await wrapper.boundingBox();
  const header = await dialog.locator('.dnk-dialog-header').boundingBox();
  expect(before).not.toBeNull();
  expect(header).not.toBeNull();

  // Chromium's input protocol produces trusted touch events, exercising
  // react-draggable's touch handlers rather than synthetic DOM dispatches.
  const session = await context.newCDPSession(page);
  const start = { x: header.x + header.width / 2, y: header.y + header.height / 2 };
  await session.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ ...start, id: 1 }],
  });
  for (let step = 1; step <= 5; step += 1) {
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: start.x - step * 4, y: start.y + step * 12, id: 1 }],
    });
  }
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await session.detach();

  const after = await wrapper.boundingBox();
  expect(after.x - before.x).toBeCloseTo(-20, 0);
  expect(after.y - before.y).toBeCloseTo(60, 0);
  await dialog.getByRole('button', { name: 'Close dialog', exact: true }).tap();
  await expect(page.locator('.dnk-dialog')).toHaveCount(0);

  await openExample(page, 1, 'Basic');
  const reopened = await wrapper.boundingBox();
  expect(reopened.x).toBeCloseTo(before.x, 0);
  expect(reopened.y).toBeCloseTo(before.y, 0);
  await page.touchscreen.tap(8, 8);
  await expect(page.locator('.dnk-dialog')).toHaveCount(0);
});
