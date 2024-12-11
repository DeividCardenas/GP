const gql = require('graphql-tag');

const typeDefs = gql`
  # Tipo Usuario
  type Usuarios {
    id_usuario: Int
    nombre_usuario: String
    contrasena: String
    role: Roles
    sede: Sedes
  }

  # Input para crear y actualizar un usuario
  input CreateUsuarioInput {
    nombre_usuario: String!
    contrasena: String!
    roles_id: Int!
    sede_id: Int!
  }

  # Consulta para obtener usuarios
  type Query {
    usuarios: [Usuarios]
    getUsuario(id_usuario: Int!): Usuarios
  }

  # Mutación para crear y actualizar usuarios
  type Mutation {
    createUsuario(input: CreateUsuarioInput): Usuarios
    updateUsuario(id_usuario: Int!, input: CreateUsuarioInput): Usuarios
    deleteUsuario(id_usuario: Int!): Usuarios
  }
`;

module.exports = typeDefs;
