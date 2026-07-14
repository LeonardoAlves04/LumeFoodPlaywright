# Revisão de qualidade

## Achados prioritários

1. **Filtro de categoria não restringe a lista.** Ao selecionar Pizza,
   BurgerHouse e Sushi Zen continuam visíveis. O comportamento esperado está
   automatizado e marcado com `@known-bug`.
2. **Possível divergência de total.** A suíte anterior já registra que o total
   do detalhe do pedido pode divergir do checkout. Recomenda-se comparar subtotal,
   frete, desconto e total numericamente nas duas telas.
3. **Seletores pouco semânticos.** Remoção (`✕`) e quantidade (`+`/`−`) dependem
   do texto visual. `aria-label` e `data-testid` específicos reduziriam ambiguidades.
4. **Custo de preparação.** Cada cenário cadastra e autentica pela interface.
   Uma API ou estado de autenticação reutilizável deixaria a suíte mais rápida,
   mantendo apenas os cenários de autenticação pela interface.

## Casos recomendados para a próxima iteração

- cadastro com e-mail duplicado, e-mail inválido e senha no limite da regra;
- acesso direto a carrinho, checkout e pedidos sem autenticação;
- cupom válido, inválido, expirado e com espaços;
- persistência do carrinho após atualizar a página e após logout/login;
- impedimento de misturar itens de restaurantes diferentes;
- cálculo do total ao alterar quantidade, aplicar desconto e remover itens;
- proteção contra duplo clique em Confirmar pedido;
- comportamento responsivo em viewport de celular;
- acessibilidade básica: nomes acessíveis, foco e navegação por teclado.

## Estratégia BDD adotada

Os arquivos `.feature` descrevem resultados observáveis e evitam detalhes de
implementação. Os passos técnicos reutilizam os helpers existentes, e tags por
domínio permitem execuções focadas. Cenários de defeitos conhecidos ficam
explicitamente identificados, sem mascarar regressões da suíte principal.
