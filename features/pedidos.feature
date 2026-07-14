# language: pt
@pedidos
Funcionalidade: Histórico de pedidos
  Como cliente autenticado
  Quero consultar meus pedidos
  Para acompanhar compras atuais e anteriores

  Contexto:
    Dado que estou autenticado

  Cenário: Consultar histórico sem pedidos
    Quando consulto meus pedidos
    Então devo ver que ainda não possuo pedidos

  Cenário: Abrir os detalhes de um pedido realizado
    Dado que finalizei um pedido com PIX
    Quando consulto meus pedidos
    Então devo ver o pedido da BurgerHouse na lista
    Quando abro os detalhes do pedido
    Então devo ver os itens e o acompanhamento do pedido
