import { test, expect } from '@playwright/test';

test('homepage loads hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Connecter la Terre, les Acteurs et la Technologie' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Explorer les Données' })).toBeVisible();
});
