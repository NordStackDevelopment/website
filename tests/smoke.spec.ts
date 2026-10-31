import { test, expect } from '@playwright/test';

test('home page loads with the logo', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('NordStack');
  await expect(page.getByAltText('NordStack')).toBeVisible();
});
