const { test, expect } = require('@playwright/test');
const { createLoggedUser } = require('./helpers/auth');
const { addClassicBurgerToCart } = require('./helpers/food');

async function createOrder(page) {
  await addClassicBurgerToCart(page);
  await page.getByRole('button', { name: /Finalizar pedido/ }).click();
  await page.locator('#address').fill('Rua QA Portfolio, 123 - Centro, Sao Paulo - SP');
  await page.getByRole('button', { name: /PIX/ }).click();
  await page.getByRole('button', { name: /Confirmar pedido/ }).click();
  await expect(page).toHaveURL(/\/pedidos\//);
}

test.describe('Pedidos', () => {
  test.beforeEach(async ({ page }) => {
    await createLoggedUser(page);
  });

  test('mostra lista vazia quando usuário ainda não fez pedidos', async ({ page }) => {
    await page.goto('/pedidos');

    await expect(page.getByText(/nenhum pedido|sem pedidos|ainda não/i)).toBeVisible();
  });

  test('lista pedido criado e permite abrir detalhe', async ({ page }) => {
    await createOrder(page);
    await page.goto('/pedidos');

    await expect(page.getByText('BurgerHouse')).toBeVisible();
    await expect(page.getByText('Aguardando confirmação')).toBeVisible();

    await page.getByRole('button', { name: /Ver detalhes/ }).click();

    await expect(page).toHaveURL(/\/pedidos\//);
    await expect(page.getByText('Acompanhe seu pedido')).toBeVisible();
    await expect(page.getByText('Itens do pedido')).toBeVisible();
  });
});
