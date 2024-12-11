const { makeExecutableSchema } = require('@graphql-tools/schema');

// Importación de los typeDefs de cada modelo
const roleTypeDefs = require('../models/roles/typeDefs');
const sedeTypeDefs = require('../models/sedes/typeDefs');
const usuarioTypeDefs = require('../models/usuarios/typeDefs');
const pacienteTypeDefs = require('../models/pacientes/typeDefs');
const medicamentoTypeDefs = require('../models/medicamentos/typeDefs');
const entregadoTypeDefs = require('../models/entregados/typeDefs');
const diagnosticoTypeDefs = require('../models/diagnosticos/typeDefs');
const pendienteTypeDefs = require('../models/pendientes/typeDefs');

// Importación de los resolvers de cada modelo
const roleResolvers = require('../models/roles/resolvers');
const sedeResolvers = require('../models/sedes/resolvers');
const usuarioResolvers = require('../models/usuarios/resolvers');
const pacienteResolvers = require('../models/pacientes/resolvers');
const medicamentoResolvers = require('../models/medicamentos/resolvers');
const entregadoResolvers = require('../models/entregados/resolvers');
const diagnosticoResolvers = require('../models/diagnosticos/resolvers');
const pendienteResolvers = require('../models/pendientes/resolvers');

// Unir todos los typeDefs en un solo array
const typeDefs = [
  roleTypeDefs,
  sedeTypeDefs,
  usuarioTypeDefs,
  pacienteTypeDefs,
  medicamentoTypeDefs,
  entregadoTypeDefs,
  diagnosticoTypeDefs,
  pendienteTypeDefs
];

// Unir todos los resolvers, organizando Query y Mutation
const resolvers = {
  Query: {
    ...roleResolvers.Query,
    ...sedeResolvers.Query,
    ...usuarioResolvers.Query,
    ...pacienteResolvers.Query,
    ...medicamentoResolvers.Query,
    ...entregadoResolvers.Query,
    ...diagnosticoResolvers.Query,
    ...pendienteResolvers.Query,
  },
  Mutation: {
    ...roleResolvers.Mutation,
    ...sedeResolvers.Mutation,
    ...usuarioResolvers.Mutation,
    ...pacienteResolvers.Mutation,
    ...medicamentoResolvers.Mutation,
    ...entregadoResolvers.Mutation,
    ...diagnosticoResolvers.Mutation,
    ...pendienteResolvers.Mutation,
  }
};


// Crear el esquema ejecutable con los typeDefs y resolvers combinados
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = { typeDefs, resolvers };
