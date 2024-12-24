const gql = require('graphql-tag');

const typeDefs = gql`
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

  input CreatePacienteInput {
    identificacion: String!
    tipo_identificacion: String!
    nombre: String!
    telefono1: String!
    telefono2: String
    eps: String!
  }

  input UpdatePacienteInput {
    identificacionNuevo: String
    tipo_identificacion: String
    nombre: String
    telefono1: String
    telefono2: String
    eps: String
  }

  type PacienteResponse {
    success: Boolean
    message: String
    paciente: Pacientes
  }

  type Query {
    getAllPacientes: [Pacientes]
    getPaciente(id_pacientes: Int!): Pacientes
  }

  type Mutation {
    createPaciente(input: CreatePacienteInput!): PacienteResponse
    updatePaciente(identificacion: String!, input: UpdatePacienteInput!): PacienteResponse
    deletePaciente(identificacion: String!): PacienteResponse
  }
`;

module.exports = typeDefs;
