import { test, expect } from '@playwright/test';

test('home page shows the hero, current build and sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('NordStack');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Building from the ground up');
  await expect(page.getByRole('navigation', { name: 'Main', exact: true }).getByRole('link', { name: 'NordStack home' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Building NordStack', level: 2 })).toBeVisible();
  for (const name of ['Work', 'Photographs', 'Made up north, one layer at a time']) {
    await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible();
  }
});

test('work filter shows only the chosen kind', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('#work .card');
  await expect(cards).toHaveCount(4);
  await page.getByRole('button', { name: 'Builds' }).click();
  await expect(page.getByRole('button', { name: 'Builds' })).toHaveAttribute('aria-pressed', 'true');
  await expect(cards.filter({ visible: true })).toHaveCount(1);
  await expect(page.getByRole('status')).toHaveText('Showing 1 of 4');
  await page.getByRole('button', { name: 'All' }).click();
  await expect(cards.filter({ visible: true })).toHaveCount(4);
});

test('no horizontal scroll at phone width', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('missing pages show Off the map', async ({ page }) => {
  await page.goto('/404');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Off the map');
});
