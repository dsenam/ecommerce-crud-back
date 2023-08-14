# Documentação da API de Produtos

Esta documentação fornece informações sobre a API de gerenciamento de produtos, que permite adicionar, listar, buscar, atualizar e deletar produtos usando o Node.js, Express e Firebase Firestore.

## Configuração

1. Certifique-se de ter o Node.js instalado.
2. Clone este repositório.
3. Instale as dependências usando o seguinte comando:

npm install

## Uso

Antes de iniciar o servidor, certifique-se de ter um arquivo `serviceAccountJson.json` contendo as credenciais do Firebase Admin.

Inicie o servidor usando o comando:

npm start

A API estará disponível em `http://localhost:3000`.

## Rotas

- `POST /products`: Adiciona um novo produto.
- `GET /products`: Lista todos os produtos.
- `GET /products/:productId`: Retorna detalhes de um produto pelo ID.
- `PUT /products/:productId`: Atualiza as informações de um produto existente.
- `DELETE /products/:productId`: Deleta um produto pelo ID.

## Exemplos de Requisições

- Adicionar um novo produto:

POST /products
Content-Type: application/json

{
  "name": "Produto 1",
  "price": 10.99
}

- Listar todos os produtos:

GET /products

- Buscar detalhes de um produto pelo ID:

GET /products/:productId

- Atualizar as informações de um produto:

PUT /products/:productId
Content-Type: application/json

{
  "name": "Produto Atualizado",
  "price": 15.99
}

- Deletar um produto pelo ID:

DELETE /products/:productId

## Observações

- Esta API utiliza o Firebase Firestore como banco de dados.
- Certifique-se de tratar adequadamente as informações sensíveis, como as credenciais do Firebase Admin.
- Este é um exemplo simples e pode ser expandido com mais funcionalidades e segurança conforme necessário.

---

Lembre-se de ajustar as informações conforme apropriado para o seu projeto e suas necessidades.
