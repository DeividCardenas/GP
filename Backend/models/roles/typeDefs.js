const gql = require('graphql-tag');

const typeDefs = gql`
  type Roles {
    id_rol: Int
    nombre: String
    usuarios: [Usuarios]
  }

  input CreateRoleInput {
    nombre: String
  }

  type Query {
    roles: [Roles]
    getRole(id_rol: Int!): Roles
  }

  type Mutation {
    createRole(input: CreateRoleInput): Roles
    updateRole(id_rol: Int!, input: CreateRoleInput): Roles
    deleteRole(id_rol: Int!): Roles
  }
`;

module.exports = typeDefs;
