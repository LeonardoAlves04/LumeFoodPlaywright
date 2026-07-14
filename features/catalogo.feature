# language: pt
@catalogo
Funcionalidade: Descoberta de restaurantes
  Como cliente autenticado
  Quero explorar restaurantes por categoria
  Para escolher minha refeição

  Contexto:
    Dado que estou autenticado

  Cenário: Exibir o catálogo inicial
    Então devo ver as categorias Pizza e Hambúrguer
    E devo ver os restaurantes BurgerHouse, Bella Napoli Pizza e Sushi Zen

  @known-bug
  Cenário: Filtrar restaurantes por pizza
    Quando seleciono a categoria Pizza
    Então devo ver apenas restaurantes da categoria Pizza

  Cenário: Abrir o cardápio de um restaurante
    Quando abro o restaurante BurgerHouse
    Então devo ver seu cardápio e os produtos Classic Burger e Combo Classic
