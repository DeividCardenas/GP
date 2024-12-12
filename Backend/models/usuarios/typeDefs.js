const gql = require('graphql-tag');

const typeDefs = gql`
  # Tipo Usuario
  type Usuarios {
    id_usuario: Int
    identificacion: String
    nombre_completo: String
    nombre_usuario: String
    contrasena: String
    role: Roles
    sede: Sedes
  }

  # Tipo Rol
  type Roles {
    id_rol: Int
    nombre: String
  }

  # Tipo Sede
  type Sedes {
    id_sede: Int
    nombre: String
  }

  # Respuesta de autenticación
  type AuthPayload {
    id_usuario: Int
    identificacion: String
    nombre_completo: String
    nombre_usuario: String
    contrasena: String
    role: Roles
    sede: Sedes
    message: String!  # Asegúrate de que este campo esté presente y sea no nulo
    }

  # Input para crear y actualizar un usuario
  input CreateUsuarioInput {
    identificacion: String!
    nombre_completo: String!
    nombre_usuario: String!
    contrasena: String!
    role_id: Int!
    sede_id: Int!
  }

  # Consulta para obtener usuarios
  type Query {
    usuarios: [Usuarios]
    getUsuario(id_usuario: Int!): Usuarios
    getUsuarioByIdentificacion(identificacion: String!): Usuarios
  }

  type Mutation {
    createUsuario(input: CreateUsuarioInput!): Usuarios
    updateUsuario(id_usuario: Int!, input: CreateUsuarioInput!): Usuarios
    deleteUsuario(id_usuario: Int!): Usuarios
    login(nombre_usuario: String!, contrasena: String!): AuthPayload!
  }
`;

module.exports = typeDefs;