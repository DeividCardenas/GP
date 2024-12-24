const gql = require('graphql-tag');

const typeDefs = gql`
  type Usuario {
    id_usuario: Int
    identificacion: String
    nombre_completo: String
    nombre_usuario: String
    sede: Sedes
    rol: Roles
  }

  type Usuarios {
    id_usuario: Int
    identificacion: String
    nombre_completo: String
    nombre_usuario: String
    contrasena: String
    role: Roles
    sede: Sedes
  }

  type Roles {
    id_rol: Int
    nombre: String
  }

  type Sedes {
    id_sede: Int
    nombre: String
  }

  input UpdateUsuarioInput {
    identificacionNuevo: String
    nombre_completo: String
    nombre_usuario: String
    contrasena: String
    role: String
    sede: String
  }

  input CreateUsuarioInput {
    identificacion: String!
    nombre_completo: String!
    nombre_usuario: String!
    contrasena: String!
    role: String!
    sede: String!
  }

  type UsuarioResponse {
    message: String
    usuario: Usuario
  }

  type Query {
    getAllUsuarios: [Usuarios]
    getUsuarioByIdentificacion(identificacion: String!): Usuarios
  }

  type Mutation {
    loginuser(nombre_usuario: String!, contrasena: String!): Usuario
    createUsuario(input: CreateUsuarioInput!): UsuarioResponse
    updateUsuario(identificacion: String!, input: UpdateUsuarioInput!): UsuarioResponse
    deleteUsuario(identificacion: String!): UsuarioResponse
  }
`;

module.exports = typeDefs;