const gql = require('graphql-tag');

const typeDefs = gql`
  type Role {
    id_rol: Int
    nombre: String
    usuarios: [Usuario]
  }

  type Usuario {
    identificacion: String
    nombre_completo: String
    nombre_usuario: String
  }

  type RoleResponse {
    success: Boolean
    message: String
    role: Role
  }

  type RolesListResponse {
    success: Boolean
    message: String
    roles: [Role]
  }

  input CreateRoleInput {
    nombre: String!
  }

  input UpdateRoleInput {
    nombreNuevo: String!
  }

  type Query {
    getAllRoles: RolesListResponse
    getRoleByNombre(nombre: String!): RoleResponse
  }

  type Mutation {
    createRole(input: CreateRoleInput!): RoleResponse
    updateRole(nombre: String!, input: UpdateRoleInput!): RoleResponse
    deleteRole(nombre: String!): RoleResponse
  }
`;

module.exports = typeDefs;
