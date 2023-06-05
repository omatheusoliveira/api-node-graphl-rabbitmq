const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { connectToQueue } = require('./rabbitmq');

// Schema GraphQL
const typeDefs = gql`
  type Query {
    api: String,
    teacher: String,
  }
`;

// Resolvers GraphQL
const resolvers = {
  Query: {
    api: () => 'API com GrapphL e RabbitMD',
    teacher: () => 'Prof Sabatine',
  }
};

// Criação do aplicativo Express
const app = express();

// Criação do servidor Apollo GraphQL
const server = new ApolloServer({ typeDefs, resolvers });

// Aplicação do middleware antes de iniciar o servidor
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

// Conexão com a fila RabbitMQ
connectToQueue();

// Inicialização do servidor
startServer().then(() => {
  app.listen({ port: 4000 }, () =>
    console.log(`Servidor em execução em http://localhost:4000${server.graphqlPath}`)
  );
});

