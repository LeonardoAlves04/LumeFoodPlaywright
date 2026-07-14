# LumeFood — Testes E2E com Playwright e BDD

Suíte end-to-end do LumeFood escrita com Playwright, Cucumber/Gherkin e
`playwright-bdd`. Os cenários descrevem o comportamento em português e são
convertidos em testes Playwright antes da execução.

## Cobertura BDD

- criação de conta, login válido e inválido e logout;
- catálogo, categorias e cardápio do restaurante;
- carrinho vazio, inclusão, quantidade, remoção e cupom;
- validação do endereço e finalização com PIX;
- histórico vazio e detalhes de um pedido realizado.
- 
# LumeFood — Automação de Testes com Playwright

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)

> Projeto de automação de testes end-to-end (E2E) utilizando Playwright para validar os principais fluxos de um sistema de delivery inspirado no iFood.


As especificações ficam em `features/` e as definições reutilizáveis em
`features/steps/`. Os testes antigos foram preservados em `tests/` para facilitar
a comparação durante a migração.

# Índice

- Sobre o Projeto
- Tecnologias Utilizadas
- Arquitetura do Projeto
- Casos de Teste
- Pré-requisitos
- Instalação
- Como Executar
- Estrutura de Pastas
- Recursos do Playwright
- Boas Práticas Adotadas

---

# Sobre o Projeto

Este projeto foi desenvolvido com o objetivo de praticar automação de testes E2E utilizando **Playwright**, simulando o comportamento real de um usuário em uma aplicação de delivery.

A suíte cobre os principais fluxos da aplicação, incluindo autenticação, navegação, gerenciamento do carrinho, checkout e acompanhamento de pedidos.

Além da automação, o projeto busca demonstrar boas práticas de organização, reutilização de código e manutenção dos testes.

**Sistema sob teste**

https://lumefood-git-master-henriquemanieris-projects.vercel.app

---

# Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| Playwright | Framework de automação E2E |
| JavaScript | Linguagem utilizada |
| Node.js | Ambiente de execução |

---

# Arquitetura do Projeto

O projeto foi estruturado seguindo boas práticas de automação.

## Page Object Model (POM)

As páginas possuem classes responsáveis por encapsular seletores e ações da interface, proporcionando:

- reutilização de código
- maior legibilidade
- facilidade de manutenção
- redução de duplicidade

## Helpers

Funções auxiliares foram criadas para centralizar comportamentos repetitivos, tornando os testes menores e mais simples de entender.

---

# Casos de Teste

## Autenticação

- Cadastro de usuário
- Login
- Logout
- Validação de campos obrigatórios

## Home

- Listagem de categorias
- Listagem de restaurantes
- Filtro por categoria

## Restaurante

- Visualização dos detalhes
- Adição de produtos ao carrinho

## Carrinho

- Carrinho vazio
- Alteração de quantidade
- Remoção de itens
- Aplicação de cupom

## Checkout

- Endereço obrigatório
- Seleção de forma de pagamento
- Finalização do pedido

## Pedidos

- Lista vazia
- Histórico após realizar pedido
- Acompanhamento do pedido criado

---

# Pré-requisitos

- Node.js 18+
- npm
- Git

---

# Instalação

```bash
git clone https://github.com/LeonardoAlves04/LumeFoodPlaywright

cd LumeFoodPlaywright

npm install
npm run browsers:install
npm test
```

Outros comandos:


```bash
npm run bddgen       # valida o Gherkin e gera os testes Playwright
npm run test:legacy  # executa apenas a suíte anterior à migração BDD
npm run report       # abre o relatório HTML da última execução
```

Por padrão, a suíte usa a URL publicada configurada em `playwright.config.js`.
Ela pode ser substituída com a variável `BASE_URL`.

## Cenários conhecidos
=======
# Como Executar

Instalar os navegadores do Playwright

```bash
npx playwright install
```

Executar todos os testes

```bash
npx playwright test
```

Executar em modo visual

```bash
npx playwright test --ui
```

Executar com navegador aberto

```bash
npx playwright test --headed
```

Abrir o relatório

```bash
npx playwright show-report
```

Cada cenário cria um usuário descartável com e-mail único. Screenshots, vídeos
e traces são preservados em falhas.

=======

# Estrutura de Pastas

```text
📦 LumeFoodPlaywright
├── 📂 tests
│   └── testes automatizados
├── 📂 pages
│   └── Page Objects
├── 📂 helpers
│   └── funções auxiliares
├── 📄 playwright.config.js
├── 📄 package.json
├── 📄 README.md
```
---

# Recursos do Playwright

- Execução em Chromium
- HTML Report
- Screenshots automáticos em falhas
- Trace Viewer
- Vídeos em caso de erro
- Esperas automáticas (Auto Wait)
- Execução Headless e Headed

---

# Boas Práticas Adotadas

- Page Object Model (POM)
- Testes independentes
- Dados dinâmicos para criação de usuários
- Nomenclatura descritiva
- Separação entre ações e validações
- Reutilização de código
- Esperas automáticas do Playwright

---

# Observações

Durante a execução dos testes foi identificado um possível comportamento inconsistente relacionado ao valor total do pedido entre o checkout e o detalhe do pedido. Em um cenário de produção, seria retornado um card para o dev analisar/resolver esse comportamento.

---

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leonardoalvesalmeida/)

</div>
>>>>>>> 8c7a2e915c8dedcd0243a4f03a25bf54bdfd3fb2
