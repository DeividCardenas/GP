const gql = require('graphql-tag');

const typeDefs = gql`
  type Sede {
    nombre: String
    usuarios: [Usuario]
  }

  type Usuario {
    identificacion: String
    nombre_completo: String
    nombre_usuario: String
    role: Role
  }

  type Role {
    nombre: String
  }

  type SedeResponse {
    message: String
    sede: Sede
  }

  input CreateSedeInput {
    nombre: String!
  }

  input UpdateSedeInput {
    nombreNuevo: String!
  }

  type Query {
    sedes: [Sede]  
    getSedeByNombre(nombre: String!): Sede
  }

  type Mutation {
    createSede(input: CreateSedeInput!): SedeResponse!
    updateSede(nombre: String!, input: UpdateSedeInput!): SedeResponse
    deleteSede(nombre: String!): SedeResponse
  }
`;

module.exports = typeDefs;
