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
  }

  # Mutaciones para crear, actualizar y eliminar Pacientes
  type Mutation {
    createPaciente(input: CreatePacienteInput): Pacientes
    updatePaciente(id_pacientes: Int!, input: CreatePacienteInput): Pacientes
    deletePaciente(id_pacientes: Int!): Pacientes
  }
`;

module.exports = typeDefs;
