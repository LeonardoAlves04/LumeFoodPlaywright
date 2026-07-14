const { expect } = require('@playwright/test');

async function openBurgerHouse(page) {
  await page.goto('/');

  const restaurant = page.getByRole('link').filter({ hasText: 'BurgerHouse' });
  await expect(restaurant).toBeVisible();
  await restaurant.click();

  await expect(page).toHaveURL(/\/restaurante\//);
  await expect(page.getByRole('heading', { name: 'BurgerHouse' })).toBeVisible();
}

async function addClassicBurgerToCart(page) {
  await openBurgerHouse(page);

  await expect(page.getByRole('heading', { name: 'Classic Burger' })).toBeVisible();
  await page.locator('[data-testid^="add-to-cart-"]').first().click();

  await page.goto('/carrinho');
  await expect(page.getByRole('heading', { name: 'Meu carrinho' })).toBeVisible();
  await expect(page.getByText('Classic Burger')).toBeVisible();
}

module.exports = {
  addClassicBurgerToCart,
  openBurgerHouse,
};
