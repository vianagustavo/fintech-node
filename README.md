![Logo Cubos](https://cubos.io/cubos-brand.bbceae54.svg)

# Cubos - Desafio Pessoa Backend Junior

De acordo com o desafio proposto, foi construída uma API que simula uma aplicação financeira real, cobrindo a criação de contas, cartões e realização de transações.

# Sumário

1. <a href="#Tecnologias-Utilizadas">Tecnologias Utilizadas</a>
2. <a href="#Configurando-o-Projeto">Configurando o Projeto</a>
3. <a href="#Inicializando">Inicializando</a>
4. <a href="#Gerando-e-Implementando-Migrations-(Entity-Framework)">Gerando e Implementando Migrations (Entity Framework)</a>
5. <a href="#Rodando-Testes">Rodando Testes</a>
6. <a href="#CI/CD">CI/CD</a>
7. <a href="#API-Endpoints">API Endpoints</a>
8. <a href="#Autor">Autor</a>

## Tecnologias Utilizadas

- [NodeJS](https://nodejs.org/en)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Postgres](https://www.postgresql.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [Docker](https://www.docker.com/)

## Configurando o Projeto

Para adotar as melhores práticas de desenvolvimento, o projeto foi segredado em ambientes, sendo os principais para a configuração: development e test

Foi disponibilizado um arquivo docker-compose que é responsável por gerar instancias para bancos de dev e teste, para tal basta rodar o comando:

`docker-compose up -d`

Inicialmente é necessário criar e setar variáveis de ambiente de acordo. Os exemplos das variáveis utilizadas no projeto podem ser encontradas no arquivo:

`.env.example`

É necessário criar um arquivo `.env` ou `.env.development` e realizar a configuração. Caso alguma env estiver faltando, a inicialização do projeto irá falhar e você poderá ver qual está faltando, de acordo com a validação feita no arquivo `./src/config/validation.schema`

## Inicializando

- Clonar o repositório: `git clone git@github.com:vianagustavo/fintech-node.git`
- Buildar o projeto: `npm run build`
- Executar aplicação: `npm run start`

## Gerando e Implementando Migrations (Prisma)

Todas as migrations utilizadas para manutenção e criação das tabelas do banco de dados do projeto podem ser encontradas dentro da própria pasta do Prisma.

Para rodar as migrations existentes no projeto e configurar um banco de dados:

```
$ npx prisma migrate dev

```

## Rodando Testes

Com intuito de relizar testes automatizados, foram realizados testes que estão disponíveis para todos os endpoints da aplicação

Antes é necessário configurar as variáveis de ambiente dentro de um arquivo `.env.test` na root do projeto. Como mencionado anteriormente, o arquivo docker-compose já faz a criação de instancias de bancos tanto de dev quanto de testes caso preferir, portanto basta configurar o arquivo de envs de teste.

```
# Rodando os testes
$ npm run test

```

## CI/CD

Foram utilizados os conceitos de CI/CD, através do GitHub Actions, sempre que for feito um push ou pull-request para a branch main, adotando boas práticas de desenvolvimento e automação da implantação da nossa aplicação.

Os principais steps envolvem o type-check do projeto e a realização dos testes para cada pipeline

O workflow completo pode ser encontrado em:

`.github/workflows/workflow.yml`

## API Endpoints

Os endpoints acessíveis apenas à `Pessoa` podem ser acessados através de autenticação Bearer e o token necessário pode ser gerado através da rota de login

Utilize o header `Authentication: Bearer {token}` para autenticar as rotas protegidas

A documentação completa Swagger da API pode ser acessada em `http://localhost:3000/apidoc` (conforme a porta que for utilizada nas variáveis de ambiente)

| Verbo  |                         Endpoint                          |              Descrição              | Acessível à: |
| :----- | :-------------------------------------------------------: | :---------------------------------: | :----------: |
| `POST` |                         `/people`                         |        Criação de uma pessoa        |  ---------   |
| `POST` |                      `/people/login`                      |       Autenticação de pessoa        |  ---------   |
| `POST` |               `/people/:peopleId/accounts`                |        Criação de uma conta         |    Pessoa    |
| `GET`  |               `/people/:peopleId/accounts`                |  Listagem de contas de uma pessoa   |    Pessoa    |
| `POST` |               `/accounts/:accountId/cards`                |        Criação de um cartão         |    Pessoa    |
| `GET`  |               `/accounts/:accountId/cards`                |  Listagem de cartões de uma conta   |    Pessoa    |
| `GET`  |                 `/people/:peopleId/cards`                 | Listagem dos cartões de uma pessoa  |    Pessoa    |
| `POST` |            `/accounts/:accountId/transactions`            |  Criação de uma transação em conta  |    Pessoa    |
| `GET`  |            `/accounts/:accountId/transactions`            | Listagem de transações de uma conta |    Pessoa    |
| `GET`  |              `/accounts/:accountId/balance`               |         Saldo de uma conta          |    Pessoa    |
| `POST` | `/accounts/:accountId/transactions/:transactionId/revert` |  Realiza reversão de uma transação  |    Pessoa    |

## Autor

- **Gustavo Ferreira Viana**
