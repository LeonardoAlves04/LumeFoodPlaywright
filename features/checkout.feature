# language: pt
@checkout
Funcionalidade: Finalização do pedido
  Como cliente com produtos no carrinho
  Quero informar entrega e pagamento
  Para concluir minha compra

  Contexto:
    Dado que estou autenticado
    E que adicionei um Classic Burger ao carrinho
    E avancei para o checkout

  Cenário: Impedir pedido sem endereço
    Quando confirmo o pedido sem preencher o endereço
    Então devo permanecer no checkout
    E o campo de endereço deve receber o foco

  Cenário: Finalizar pedido com PIX
    Quando informo um endereço de entrega
    E escolho o pagamento por PIX
    E confirmo o pedido
    Então devo ver o acompanhamento do pedido
    E o pedido deve estar aguardando confirmação
