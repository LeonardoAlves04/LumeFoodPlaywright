const { expect } = require('@playwright/test');
const { createBdd } = require('playwright-bdd');
const { loginUser, registerUser, uniqueUser } = require('../../tests/helpers/auth');
const { addClassicBurgerToCart } = require('../../tests/helpers/food');

const { Given, When, Then } = createBdd();

Given('que estou na página de cadastro', async ({ page }) => {
  await page.goto('/register');
});

When('preencho os dados de um novo cliente', async ({ page }) => {
  const user = uniqueUser();
  await page.locator('#name').fill(user.name);
  await page.locator('#email').fill(user.email);
  await page.locator('#password').fill(user.password);
});

When('envio o cadastro', async ({ page }) => {
  await page.getByRole('button', { name: 'Criar conta' }).click();
});

Then('devo ser direcionado para o login', async ({ page }) => {
  await expect(page).toHaveURL(/\/login$/);
});

Then('devo ver a confirmação de conta criada', async ({ page }) => {
  await expect(page.getByText('Conta criada com sucesso')).toBeVisible();
});

Given('que possuo uma conta cadastrada', async ({ page }) => {
  page.testUser = await registerUser(page);
});

When('entro com minhas credenciais válidas', async ({ page }) => {
  await loginUser(page, page.testUser);
});

When('tento entrar com uma senha incorreta', async ({ page }) => {
  await page.locator('#email').fill(page.testUser.email);
  await page.locator('#password').fill(`${page.testUser.password}-errada`);
  await page.getByRole('button', { name: 'Entrar' }).click();
});

Then('devo permanecer na página de login', async ({ page }) => {
  await expect(page).toHaveURL(/\/login$/);
});

Then('devo ver uma mensagem de falha na autenticação', async ({ page }) => {
  await expect(page.getByText(/inválid|incorret|erro|falhou/i)).toBeVisible();
});

Given('que estou autenticado', async ({ page }) => {
  const user = await registerUser(page);
  await loginUser(page, user);
});

When('encerro minha sessão', async ({ page }) => {
  await page.getByRole('button', { name: 'Sair' }).click();
});

Then('devo voltar para a página de login', async ({ page }) => {
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
});

Then('devo acessar a lista de restaurantes', async ({ page }) => {
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText('Restaurantes disponíveis')).toBeVisible();
});

Then('devo ver as categorias Pizza e Hambúrguer', async ({ page }) => {
  await expect(page.getByRole('button', { name: /Pizza/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Hambúrguer/ })).toBeVisible();
});

Then('devo ver os restaurantes BurgerHouse, Bella Napoli Pizza e Sushi Zen', async ({ page }) => {
  for (const name of ['BurgerHouse', 'Bella Napoli Pizza', 'Sushi Zen']) {
    await expect(page.getByText(name)).toBeVisible();
  }
});

When('seleciono a categoria Pizza', async ({ page }) => {
  await page.getByRole('button', { name: /Pizza/ }).click();
});

Then('devo ver apenas restaurantes da categoria Pizza', async ({ page }) => {
  await expect(page.getByText('Bella Napoli Pizza')).toBeVisible();
  await expect(page.getByText('Pizza Express')).toBeVisible();
  await expect(page.getByText('BurgerHouse')).toBeHidden();
  await expect(page.getByText('Sushi Zen')).toBeHidden();
});

When('abro o restaurante BurgerHouse', async ({ page }) => {
  await page.getByRole('link').filter({ hasText: 'BurgerHouse' }).click();
});

Then('devo ver seu cardápio e os produtos Classic Burger e Combo Classic', async ({ page }) => {
  await expect(page).toHaveURL(/\/restaurante\//);
  await expect(page.getByRole('heading', { name: 'BurgerHouse' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Classic Burger' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Combo Classic' })).toBeVisible();
});

When('abro meu carrinho', async ({ page }) => {
  await page.goto('/carrinho');
});

Then('devo ver que o carrinho está vazio', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Seu carrinho está vazio' })).toBeVisible();
});

Then('não devo poder finalizar o pedido', async ({ page }) => {
  await expect(page.getByRole('button', { name: /Finalizar pedido/ })).toBeHidden();
});

When('adiciono um Classic Burger ao carrinho', async ({ page }) => {
  await addClassicBurgerToCart(page);
});

Given('que adicionei um Classic Burger ao carrinho', async ({ page }) => {
  await addClassicBurgerToCart(page);
});

Then('devo ver o produto e o resumo de valores', async ({ page }) => {
  const item = page.locator('[data-testid^="cart-item-"]');
  await expect(item.getByText('Classic Burger')).toBeVisible();
  await expect(page.getByText('Subtotal')).toBeVisible();
  await expect(page.getByText('Taxa de entrega')).toBeVisible();
  await expect(page.getByText('Total', { exact: true })).toBeVisible();
});

When('aumento a quantidade do produto', async ({ page }) => {
  await page.getByRole('button', { name: '+', exact: true }).click();
});

When('diminuo a quantidade do produto', async ({ page }) => {
  await page.getByRole('button', { name: '−', exact: true }).click();
});

Then('a quantidade deve ser {int}', async ({ page }, quantity) => {
  const item = page.locator('[data-testid^="cart-item-"]');
  await expect(item.getByText(String(quantity), { exact: true })).toBeVisible();
});

When('removo o produto do carrinho', async ({ page }) => {
  await page.getByRole('button', { name: '✕', exact: true }).click();
});

When('informo o cupom {string}', async ({ page }, coupon) => {
  await page.getByPlaceholder('Digite o cupom').fill(coupon);
});

Then('o botão de aplicar cupom deve estar {string}', async ({ page }, state) => {
  const button = page.getByRole('button', { name: 'Aplicar' });
  if (state === 'habilitado') await expect(button).toBeEnabled();
  else await expect(button).toBeDisabled();
});

Given('avancei para o checkout', async ({ page }) => {
  await page.getByRole('button', { name: /Finalizar pedido/ }).click();
  await expect(page).toHaveURL(/\/checkout$/);
});

When('confirmo o pedido sem preencher o endereço', async ({ page }) => {
  await page.getByRole('button', { name: /Confirmar pedido/ }).click();
});

Then('devo permanecer no checkout', async ({ page }) => {
  await expect(page).toHaveURL(/\/checkout$/);
});

Then('o campo de endereço deve receber o foco', async ({ page }) => {
  await expect(page.locator('#address')).toBeFocused();
});

When('informo um endereço de entrega', async ({ page }) => {
  await page.locator('#address').fill('Rua QA Portfolio, 123 - Centro, Sao Paulo - SP');
});

When('escolho o pagamento por PIX', async ({ page }) => {
  await page.getByRole('button', { name: /PIX/ }).click();
});

When('confirmo o pedido', async ({ page }) => {
  await page.getByRole('button', { name: /Confirmar pedido/ }).click();
});

Then('devo ver o acompanhamento do pedido', async ({ page }) => {
  await expect(page).toHaveURL(/\/pedidos\//);
  await expect(page.getByText('Pedido realizado com sucesso')).toBeVisible();
  await expect(page.getByText('Classic Burger')).toBeVisible();
});

Then('o pedido deve estar aguardando confirmação', async ({ page }) => {
  await expect(page.locator('span').filter({ hasText: 'Aguardando confirmação' })).toBeVisible();
});

Given('que finalizei um pedido com PIX', async ({ page }) => {
  await addClassicBurgerToCart(page);
  await page.getByRole('button', { name: /Finalizar pedido/ }).click();
  await page.locator('#address').fill('Rua QA Portfolio, 123 - Centro, Sao Paulo - SP');
  await page.getByRole('button', { name: /PIX/ }).click();
  await page.getByRole('button', { name: /Confirmar pedido/ }).click();
  await expect(page).toHaveURL(/\/pedidos\//);
});

When('consulto meus pedidos', async ({ page }) => {
  await page.goto('/pedidos');
});

Then('devo ver que ainda não possuo pedidos', async ({ page }) => {
  await expect(page.getByText(/nenhum pedido|sem pedidos|ainda não/i)).toBeVisible();
});

Then('devo ver o pedido da BurgerHouse na lista', async ({ page }) => {
  await expect(page.getByText('BurgerHouse')).toBeVisible();
  await expect(page.getByText('Aguardando confirmação')).toBeVisible();
});

When('abro os detalhes do pedido', async ({ page }) => {
  await page.getByRole('button', { name: /Ver detalhes/ }).click();
});

Then('devo ver os itens e o acompanhamento do pedido', async ({ page }) => {
  await expect(page.getByText('Acompanhe seu pedido')).toBeVisible();
  await expect(page.getByText('Itens do pedido')).toBeVisible();
  await expect(page.getByText('Classic Burger')).toBeVisible();
});
