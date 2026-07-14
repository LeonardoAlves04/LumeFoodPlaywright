const { test, expect } = require('@playwright/test');
const { createLoggedUser } = require('./helpers/auth');
const { addClassicBurgerToCart } = require('./helpers/food');

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await createLoggedUser(page);
    await addClassicBurgerToCart(page);
    await page.getByRole('button', { name: /Finalizar pedido/ }).click();
  });

  test('exibe endereço, pagamento e resumo do pedido', async ({ page }) => {
    await expect(page).toHaveURL(/\/checkout$/);
    await expect(page.getByRole('heading', { name: 'Finalizar pedido' })).toBeVisible();
    await expect(page.locator('#address')).toBeVisible();
    await expect(page.getByRole('button', { name: /Cartão de crédito/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /PIX/ })).toBeVisible();
    await expect(page.getByText('Classic Burger')).toBeVisible();
    await expect(page.getByText('Total', { exact: true })).toBeVisible();
  });

  test('não confirma pedido sem endereço obrigatório', async ({ page }) => {
    await page.getByRole('button', { name: /Confirmar pedido/ }).click();

    await expect(page).toHaveURL(/\/checkout$/);
    await expect(page.locator('#address')).toBeFocused();
  });

  test('finaliza pedido com PIX e abre acompanhamento', async ({ page }) => {
    await page.locator('#address').fill('Rua QA Portfolio, 123 - Centro, Sao Paulo - SP');
    await page.getByRole('button', { name: /PIX/ }).click();
    await page.getByRole('button', { name: /Confirmar pedido/ }).click();

    await expect(page).toHaveURL(/\/pedidos\//);
    await expect(page.getByText('Pedido realizado com sucesso')).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'Aguardando confirmação' })).toBeVisible();
    await expect(page.getByText('Classic Burger')).toBeVisible();
    await expect(page.getByText('Rua QA Portfolio')).toBeVisible();
  });
});
