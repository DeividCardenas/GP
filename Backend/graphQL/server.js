const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { typeDefs, resolvers } = require('./schema');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const startServer = async () => {
  const app = express();
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true, 
    context: ({ req }) => ({
      // Contexto para los resolvers
    }),
  });

  await server.start();
  
  app.use(cors());
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

module.exports = startServer;