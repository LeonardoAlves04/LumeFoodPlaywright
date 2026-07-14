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

As especificações ficam em `features/` e as definições reutilizáveis em
`features/steps/`. Os testes antigos foram preservados em `tests/` para facilitar
a comparação durante a migração.

## Como executar

```bash
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

O cenário de filtro por Pizza está marcado com `@known-bug` e fora da execução
padrão: hoje a interface mantém restaurantes de outras categorias visíveis.
Essa quarentena deve ser removida quando o comportamento do produto for corrigido.

Cada cenário cria um usuário descartável com e-mail único. Screenshots, vídeos
e traces são preservados em falhas.
