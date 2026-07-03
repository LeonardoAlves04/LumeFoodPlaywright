const { expect } = require('@playwright/test');

function uniqueUser() {
  const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  return {
    name: 'QA Portfolio',
    email: `qa.portfolio.${id}@example.com`,
    password: 'Teste123!',
  };
}

async function registerUser(page, user = uniqueUser()) {
  await page.goto('/register');
  await page.locator('#name').fill(user.name);
  await page.locator('#email').fill(user.email);
  await page.locator('#password').fill(user.password);
  await page.getByRole('button', { name: 'Criar conta' }).click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByText('Conta criada com sucesso')).toBeVisible();

  return user;
}

async function loginUser(page, user) {
  await page.goto('/login');
  await page.locator('#email').fill(user.email);
  await page.locator('#password').fill(user.password);
  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText('Login realizado com sucesso')).toBeVisible();
  await expect(page.getByText('Restaurantes disponíveis')).toBeVisible();
}

async function createLoggedUser(page) {
  const user = await registerUser(page);
  await loginUser(page, user);

  return user;
}

module.exports = {
  createLoggedUser,
  loginUser,
  registerUser,
  uniqueUser,
};
