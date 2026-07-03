# LumeFood - Testes E2E

Suite de testes end-to-end para o LumeFood, um site de pedidos de comida no estilo iFood.

O foco deste projeto é mostrar é aprimorar meus conhecimnetos em playwright e melhorar também o meu portfólio: testes com nomes claros, helpers pequenos e cobertura dos fluxos mais importantes do usuário.

## O que foi coberto

- Login, cadastro e logout
- Validação de campos obrigatórios
- Home com categorias e restaurantes
- Filtro por categoria
- Detalhe de restaurante
- Carrinho vazio
- Adição, alteração de quantidade e remoção de produto
- Cupom habilitado apenas com texto
- Checkout com endereço e forma de pagamento
- Bloqueio de pedido sem endereço
- Pedido finalizado e acompanhamento
- Lista de pedidos vazia e com pedido criado

## Como rodar

```bash
npm install
npm run browsers:install
npm test
```

Para abrir o relatório HTML depois da execução:

```bash
npm run report
```

## URL testada

Por padrão os testes usam:

```text
https://lumefood-git-master-henriquemanieris-projects.vercel.app
```

## Observações de QA

- Cada teste cria um usuário descartável com email único.
- Os testes rodam em apenas um worker localmente para reduzir instabilidade em ambiente publicado.
- Prints, vídeos e traces são guardados quando algum teste falha.
- Durante a exploração manual foi visto um possível ponto de atenção: o total exibido no detalhe do pedido pode ficar diferente do total visto no checkout. Em um ambiente real isso seria retornado ticket para o dev.
