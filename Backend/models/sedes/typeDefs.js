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
    success: Boolean
    message: String
    sede: Sede
  }

  type SedeListResponse {
    success: Boolean
    message: String
    sedes: [Sede]
  }

  input CreateSedeInput {
    nombre: String!
  }

  input UpdateSedeInput {
    nombreNuevo: String!
  }

  type Query {
    getAllSedes: SedeListResponse
    getSedeByNombre(nombre: String!): SedeResponse
  }

  type Mutation {
    createSede(input: CreateSedeInput!): SedeResponse
    updateSede(nombre: String!, input: UpdateSedeInput!): SedeResponse
    deleteSede(nombre: String!): SedeResponse
  }
`;

module.exports = typeDefs;
