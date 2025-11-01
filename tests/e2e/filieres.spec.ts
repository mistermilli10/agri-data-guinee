import { test, expect } from '@playwright/test';

test('filieres page displays filters', async ({ page }) => {
  await page.goto('/filieres');
  await expect(page.getByRole('heading', { name: 'Filières Agricoles de Guinée' })).toBeVisible();
  await expect(page.getByText('Toutes les régions')).toBeVisible();
  await expect(page.getByText('Tous les types')).toBeVisible();
});
