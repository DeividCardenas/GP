const { gql } = require('graphql-tag');

const typeDefs = gql`
  # Tipo para Pacientes
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

  input UpdatePacienteInput {
  identificacion: String
  tipo_identificacion: String
  nombre: String
  telefono1: String
  telefono2: String
  eps: String
  }

  # Tipo de entrada para crear o actualizar un Paciente
  input CreatePacienteInput {
    identificacion: String
    tipo_identificacion: String
    nombre: String
    telefono1: String
    telefono2: String
    eps: String
  }

  # Consultas para obtener Pacientes
  type Query {
    pacientes: [Pacientes]
    getPaciente(id_pacientes: Int!): Pacientes
    getPacienteByIdentificacion(identificacion: String!): Pacientes
  }

  # Mutaciones para crear, actualizar y eliminar Pacientes
  type Mutation {
    createPaciente(input: CreatePacienteInput): Pacientes
    updatePaciente(identificacion: String!, input: UpdatePacienteInput!): Pacientes
    deletePaciente(identificacion: String!): Boolean
  }
`;

module.exports = typeDefs;
