import { test, expect } from '@playwright/test';

test('acteurs page shows cards', async ({ page }) => {
  await page.goto('/acteurs');
  await expect(page.getByRole('heading', { name: 'Acteurs du Secteur Agricole' })).toBeVisible();
  await expect(page.getByText('Tous les types')).toBeVisible();
});
