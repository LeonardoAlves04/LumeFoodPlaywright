const { test, expect } = require('@playwright/test');
const { createLoggedUser } = require('./helpers/auth');
const { addClassicBurgerToCart } = require('./helpers/food');

test.describe('Carrinho', () => {
  test.beforeEach(async ({ page }) => {
    await createLoggedUser(page);
  });

  test('mostra carrinho vazio antes de adicionar produtos', async ({ page }) => {
    await page.goto('/carrinho');

    await expect(page.getByRole('heading', { name: 'Seu carrinho está vazio' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ver restaurantes' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Finalizar pedido/ })).toBeHidden();
  });

  test('adiciona produto e exibe resumo de valores', async ({ page }) => {
    await addClassicBurgerToCart(page);

    const item = page.locator('[data-testid^="cart-item-"]');

    await expect(page.getByText('BurgerHouse')).toBeVisible();
    await expect(item.getByText('R$ 28,00')).toBeVisible();
    await expect(page.getByText('Subtotal')).toBeVisible();
    await expect(page.getByText('Taxa de entrega')).toBeVisible();
    await expect(page.getByText('Total', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /Finalizar pedido/ })).toBeEnabled();
  });

  test('altera quantidade do produto no carrinho', async ({ page }) => {
    await addClassicBurgerToCart(page);

    const item = page.locator('[data-testid^="cart-item-"]');

    await page.getByRole('button', { name: '+', exact: true }).click();
    await expect(item.getByText('2', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: '−', exact: true }).click();
    await expect(item.getByText('1', { exact: true })).toBeVisible();
  });

  test('remove produto do carrinho', async ({ page }) => {
    await addClassicBurgerToCart(page);

    await page.getByRole('button', { name: '✕', exact: true }).click();

    await expect(page.getByRole('heading', { name: 'Seu carrinho está vazio' })).toBeVisible();
    await expect(page.getByText('Classic Burger')).toBeHidden();
  });

  test('habilita aplicação de cupom apenas quando há texto digitado', async ({ page }) => {
    await addClassicBurgerToCart(page);

    const couponInput = page.getByPlaceholder('Digite o cupom');
    const applyButton = page.getByRole('button', { name: 'Aplicar' });

    await expect(applyButton).toBeDisabled();
    await couponInput.fill('PORTFOLIO10');
    await expect(applyButton).toBeEnabled();
  });
});
