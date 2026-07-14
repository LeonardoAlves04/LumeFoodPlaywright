# language: pt
@autenticacao
Funcionalidade: Autenticação de clientes
  Como cliente do LumeFood
  Quero criar e acessar minha conta
  Para fazer pedidos com segurança

  Cenário: Criar uma nova conta
    Dado que estou na página de cadastro
    Quando preencho os dados de um novo cliente
    E envio o cadastro
    Então devo ser direcionado para o login
    E devo ver a confirmação de conta criada

  Cenário: Entrar com uma conta válida
    Dado que possuo uma conta cadastrada
    Quando entro com minhas credenciais válidas
    Então devo acessar a lista de restaurantes

  Cenário: Recusar uma senha incorreta
    Dado que possuo uma conta cadastrada
    Quando tento entrar com uma senha incorreta
    Então devo permanecer na página de login
    E devo ver uma mensagem de falha na autenticação

  Cenário: Encerrar a sessão
    Dado que estou autenticado
    Quando encerro minha sessão
    Então devo voltar para a página de login
