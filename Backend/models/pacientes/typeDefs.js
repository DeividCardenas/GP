const { gql } = require('graphql-tag');

const typeDefs = gql`
  # Tipo Pacientes
  type Pacientes {
    id_pacientes: Int
    identificacion: String
    tipo_identificacion: String
    nombre: String
    telefono1: String
    telefono2: String
    eps: String
    diagnostico: [Diagnostico]
    entregados: [Entregados]
    pendientes: [Pendientes]
  }

  # Input para crear y actualizar pacientes
  input PacienteInput {
    identificacion: String
    tipo_identificacion: String
    nombre: String
    telefono1: String
    telefono2: String
    eps: String
  }

  # Querys
  type Query {
    pacientes: [Pacientes]         
    getPacienteByIdentificacion(identificacion: String!): Pacientes
  }

  # Mutations
  type Mutation {
    createPaciente(input: PacienteInput!): ResponsePaciente
    updatePaciente(identificacion: String!, input: PacienteInput!): ResponsePaciente
    deletePaciente(identificacion: String!): ResponseMessage
  }

  type ResponsePaciente {
    message: String
    paciente: Pacientes       
  }

  type ResponseMessage {
    message: String
  }
`;

module.exports = typeDefs;
