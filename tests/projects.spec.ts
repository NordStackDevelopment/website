import { test, expect } from '@playwright/test';

test('projects list filters by kind', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.getByRole('heading', { level: 1, name: 'Projects' })).toBeVisible();
  const cards = page.locator('.card');
  const total = await cards.count();
  expect(total).toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Scripts' }).click();
  await expect(page.getByRole('button', { name: 'Scripts' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.card:visible')).toHaveCount(0);
  await expect(page.getByText('Nothing here yet.')).toBeVisible();
  await page.getByRole('button', { name: 'All' }).click();
  await expect(page.locator('.card:visible')).toHaveCount(total);
});

test('project page shows facts, links and write-up', async ({ page }) => {
  await page.goto('/projects/nordstack-website');
  await expect(page.getByRole('heading', { level: 1, name: 'NordStack' })).toBeVisible();
  await expect(page.getByText('Stack', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View the code' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Read the build log' })).toHaveAttribute('href', '/builds/building-nordstack');
  await expect(page.getByRole('link', { name: 'All projects' })).toBeVisible();
});
