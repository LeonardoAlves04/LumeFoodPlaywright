const { test, expect } = require('@playwright/test');
const { loginUser, registerUser, uniqueUser } = require('./helpers/auth');

test.describe('Autenticação', () => {
  test('exibe a tela de login com os campos principais', async ({ page }) => {
    await page.goto('/login');

    await expect(page).toHaveTitle(/LumeFood/);
    await expect(page.getByRole('heading', { name: 'LumeFood' })).toBeVisible();
    await expect(page.locator('#email')).toHaveAttribute('type', 'email');
    await expect(page.locator('#password')).toHaveAttribute('type', 'password');
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cadastre-se' })).toHaveAttribute('href', /\/register$/);
  });

  test('mantém campos obrigatórios antes de enviar login vazio', async ({ page }) => {
    await page.goto('/login');

    await expect(page.locator('#email')).toHaveAttribute('required', '');
    await expect(page.locator('#password')).toHaveAttribute('required', '');
  });

  test('cria conta e redireciona para login com mensagem de sucesso', async ({ page }) => {
    const user = await registerUser(page);

    await expect(page.locator('#email')).toBeEmpty();
    await expect(page.getByText('Conta criada com sucesso')).toBeVisible();
    expect(user.email).toContain('@example.com');
  });

  test('entra com usuário recém-criado', async ({ page }) => {
    const user = await registerUser(page);

    await loginUser(page, user);

    await expect(page.getByText('QA')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sair' })).toBeVisible();
  });

  test('sai da conta e volta para login', async ({ page }) => {
    const user = await registerUser(page);
    await loginUser(page, user);

    await page.getByRole('button', { name: 'Sair' }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
  });

  test('não permite login com senha incorreta', async ({ page }) => {
    const user = await registerUser(page);

    await page.locator('#email').fill(user.email);
    await page.locator('#password').fill(`${user.password}-errada`);
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByText(/inválid|incorret|erro|falhou/i)).toBeVisible();
  });
});
