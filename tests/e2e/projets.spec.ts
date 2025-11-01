import { test, expect } from '@playwright/test';

test('projets page hero', async ({ page }) => {
  await page.goto('/projets');
  await expect(page.getByRole('heading', { name: 'Innovations & Projets Agricoles' })).toBeVisible();
  await expect(page.getByRole('button', { name: '+ Soumettre un projet' })).toBeVisible();
});
