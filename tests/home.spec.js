const { test, expect } = require('@playwright/test');
const { createLoggedUser } = require('./helpers/auth');

test.describe('Home e restaurantes', () => {
  test.beforeEach(async ({ page }) => {
    await createLoggedUser(page);
  });

  test('lista categorias e restaurantes disponíveis', async ({ page }) => {
    await expect(page.getByText('Comida boa, entregue rápido!')).toBeVisible();
    await expect(page.getByRole('button', { name: /Pizza/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Hambúrguer/ })).toBeVisible();
    await expect(page.getByText('Restaurantes disponíveis (6)')).toBeVisible();

    await expect(page.getByText('BurgerHouse')).toBeVisible();
    await expect(page.getByText('Bella Napoli Pizza')).toBeVisible();
    await expect(page.getByText('Sushi Zen')).toBeVisible();
  });

  test('permite selecionar categoria de pizza mantendo a lista estável', async ({ page }) => {
    await page.getByRole('button', { name: /Pizza/ }).click();

    await expect(page.getByText('Restaurantes disponíveis')).toBeVisible();
    await expect(page.getByText('Bella Napoli Pizza')).toBeVisible();
    await expect(page.getByText('Pizza Express')).toBeVisible();
  });

  test('abre o detalhe de um restaurante pela lista', async ({ page }) => {
    await page.getByRole('link').filter({ hasText: 'BurgerHouse' }).click();

    await expect(page).toHaveURL(/\/restaurante\//);
    await expect(page.getByRole('heading', { name: 'BurgerHouse' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Classic Burger' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Combo Classic' })).toBeVisible();
  });
});
