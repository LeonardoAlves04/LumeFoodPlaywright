# language: pt
@carrinho
Funcionalidade: Gerenciamento do carrinho
  Como cliente autenticado
  Quero revisar os produtos escolhidos
  Para controlar meu pedido antes do pagamento

  Contexto:
    Dado que estou autenticado

  Cenário: Consultar um carrinho vazio
    Quando abro meu carrinho
    Então devo ver que o carrinho está vazio
    E não devo poder finalizar o pedido

  Cenário: Adicionar um produto ao carrinho
    Quando adiciono um Classic Burger ao carrinho
    Então devo ver o produto e o resumo de valores

  Cenário: Alterar a quantidade de um produto
    Dado que adicionei um Classic Burger ao carrinho
    Quando aumento a quantidade do produto
    Então a quantidade deve ser 2
    Quando diminuo a quantidade do produto
    Então a quantidade deve ser 1

  Cenário: Remover o último produto
    Dado que adicionei um Classic Burger ao carrinho
    Quando removo o produto do carrinho
    Então devo ver que o carrinho está vazio

  Esquema do Cenário: Habilitar o cupom somente com conteúdo válido
    Dado que adicionei um Classic Burger ao carrinho
    Quando informo o cupom "<cupom>"
    Então o botão de aplicar cupom deve estar "<estado>"
 
