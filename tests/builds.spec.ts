import { test, expect } from '@playwright/test';

test('builds page shows the current build with its layers', async ({ page }) => {
  await page.goto('/builds');
  await expect(page).toHaveTitle('Builds · NordStack');
  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Builds' })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('heading', { name: 'Building NordStack', level: 2 })).toBeVisible();
  // One row per layer in the log; the log grows, so only check the first layers are there
  const stack = page.getByRole('list', { name: 'Progress, layer by layer' });
  await expect(stack.getByText('The brand')).toBeVisible();
  await expect(stack.getByText('Finding the style')).toBeVisible();
  await page.getByRole('link', { name: 'Read the build log' }).click();
  await expect(page).toHaveURL(/\/builds\/building-nordstack\/?$/);
});

test('build log page renders every layer from the Markdown log', async ({ page }) => {
  await page.goto('/builds/building-nordstack');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Building NordStack');
  for (const name of ['The brand', 'Finding the style', 'The plan and the foundations', 'Look and layout']) {
    await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible();
  }
  // Latest photo first, and a jump list that links to each layer
  await expect(page.getByText(/Where it stands now, after layer \d/)).toBeVisible();
  await page.getByRole('navigation', { name: 'Jump to a layer' }).getByRole('link', { name: /The brand/ }).click();
  await expect(page).toHaveURL(/#layer-1$/);
  // Parts list comes from the log's Parts table
  await expect(page.getByRole('heading', { name: 'Parts list' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Astro' })).toBeVisible();
});

test('build log has no horizontal scroll at phone width', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/builds/building-nordstack');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
