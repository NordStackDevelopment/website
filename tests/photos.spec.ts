import { test, expect } from '@playwright/test';

test('photos page groups collections by year', async ({ page }) => {
  await page.goto('/photos');
  await expect(page.getByRole('heading', { level: 1, name: 'Photographs' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: '2026' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: '2025' })).toBeVisible();
});

test('collection viewer opens, moves with arrow keys and closes with Escape', async ({ page }) => {
  await page.goto('/photos/sample-collection-one');
  const viewer = page.getByRole('dialog', { name: 'Photo viewer' });
  await expect(viewer).toBeHidden();
  const opener = page.getByRole('button', { name: /full screen/ }).first();
  await opener.click();
  await expect(viewer).toBeVisible();
  await expect(viewer.getByText('1 / 3')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(viewer.getByText('2 / 3')).toBeVisible();
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await expect(viewer.getByText('3 / 3')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(viewer).toBeHidden();
  await expect(opener).toBeFocused();
});

test('collection page has no horizontal scroll at phone width', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/photos/sample-collection-one');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
