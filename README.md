Loja de Embalagens do Seu Manoel - API de Otimização de Caixas
Esta é uma API Node.js com NestJS que automatiza o processo de empacotamento de pedidos, otimizando o uso das caixas disponíveis. A API recebe uma lista de pedidos com produtos e suas dimensões e, para cada pedido, retorna qual(is) caixa(s) deve(m) ser usada(s) e quais produtos devem ser colocados em cada uma.

Funcionalidades
Processamento de Pedidos: Calcula a melhor combinação de caixas para um conjunto de produtos, minimizando o desperdício de espaço.

Caixas Padrão: Otimiza a embalagem usando três tamanhos de caixas pré-definidos:

Caixa 1: 30 x 40 x 80 cm

Caixa 2: 50 x 50 x 40 cm

Caixa 3: 50 x 80 x 60 cm

API RESTful: Expõe um endpoint para processar os pedidos, com validação de dados de entrada.

Swagger/OpenAPI: Documentação interativa da API para facilitar o consumo.

Segurança: Autenticação via JWT (JSON Web Token) com token bearer para proteger os endpoints.

Docker: Projeto pronto para ser executado em containers, garantindo um ambiente de execução consistente.

Testes Unitários: Inclui testes unitários para o OrdersController, garantindo a confiabilidade do código.

Pré-requisitos
Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.

Executando o Projeto
O projeto já vem com um arquivo docker-compose.yml para facilitar a execução.

Clone o repositório:

Bash

git clone https://github.com/rennanfn/l2codetest.git
cd l2codetest
Inicie os containers:

Bash

docker-compose up --build
Isso irá construir a imagem da aplicação e iniciar o servidor.

A API estará disponível em http://localhost:3000.

Endpoints da API
Documentação (Swagger): http://localhost:3000/api

Login (para obter o token):

Método: POST

URL: http://localhost:3000/auth/login

Corpo da requisição:

JSON

{
  "username": "qualquer-nome"
}
Processar Pedidos (protegido por token):

Método: POST

URL: http://localhost:3000/orders

Cabeçalho da requisição:
Authorization: Bearer [seu_token_jwt]

Corpo da requisição: Consulte o exemplo de entrada no arquivo swagger.json ou na documentação do Swagger.

Testes
Para executar os testes unitários do projeto, rode o seguinte comando no terminal dentro do container da aplicação:

Bash
docker-compose exec app npm run test

Database do prisma:
DATABASE_URL="postgresql://postgres:admin@localhost:5432/postgres?schema=public"

Lembrando que esta url é salva no arquivo .env, que não deve ser salvo no github
