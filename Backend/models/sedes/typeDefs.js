const gql = require('graphql-tag');

const typeDefs = gql`
  type Sedes {
    id_sede: Int
    nombre: String
    usuarios: [Usuarios]
  }

  input CreateSedeInput {
    nombre: String
  }

  type Query {
    sedes: [Sedes]
    getSede(id_sede: Int!): Sedes
  }

  type Mutation {
    createSede(input: CreateSedeInput): Sedes
    updateSede(id_sede: Int!, input: CreateSedeInput): Sedes
    deleteSede(id_sede: Int!): Sedes
  }
`;

module.exports = typeDefs;
