import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = ['/', '/projects', '/projects/nordstack-website', '/builds', '/builds/building-nordstack', '/photos', '/photos/sample-collection-one', '/about', '/no-such-page'];

for (const path of pages) {
  test(`no accessibility violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
    expect(summary).toEqual([]);
  });
}

test.describe('phone menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('opens from the menu button, traps focus, closes with Escape', async ({ page }) => {
    await page.goto('/builds');
    const btn = page.getByRole('button', { name: 'Menu' });
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('navigation', { name: 'Main', exact: true }).getByRole('link', { name: 'Projects' })).toBeHidden();

    await btn.click();
    const menu = page.getByRole('dialog', { name: 'Site menu' });
    await expect(menu).toBeVisible();
    await expect(btn).toHaveAttribute('aria-expanded', 'true');
    await expect(menu.getByRole('button', { name: 'Close' })).toBeFocused();
    await expect(menu.getByRole('link', { name: 'Builds' })).toHaveAttribute('aria-current', 'page');

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(btn).toBeFocused();
    await expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  test('links in the menu navigate', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('dialog', { name: 'Site menu' }).getByRole('link', { name: 'Photos' }).click();
    await expect(page).toHaveURL(/\/photos$/);
  });

  test('every page fits the phone width', async ({ page }) => {
    for (const path of pages) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
});

test('desktop shows the links and hides the menu button', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();
  await expect(page.getByRole('navigation', { name: 'Main', exact: true }).getByRole('link', { name: 'Projects' })).toBeVisible();
});

test('skip link moves focus to the main content', async ({ page }) => {
  await page.goto('/projects');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});
