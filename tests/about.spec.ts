import { test, expect } from '@playwright/test';

test('about page shows the story, gear and contact form', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  for (const name of ['The story', 'What I make', 'Gear', 'Get in touch']) {
    await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();
  }
});

test('contact form checks the fields before sending', async ({ page }) => {
  await page.goto('/about');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Add your email so I can reply.')).toBeVisible();
  await expect(page.getByLabel('Email')).toBeFocused();
  await page.getByLabel('Email').fill('not-an-email');
  await page.getByLabel('Message').fill('Hello');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('That email doesn’t look right.')).toBeVisible();
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('alert')).toContainText('isn’t switched on yet');
});
