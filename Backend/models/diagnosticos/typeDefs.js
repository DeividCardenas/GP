const { gql } = require('graphql-tag');

const typeDefs = gql`
  # Tipo para Diagnostico
  type Diagnostico {
    id_diagnostico: Int
    codigo: String
    descripcion: String
    paciente: Pacientes
    pendientes: [Pendientes]
  }

  # Tipo de entrada para crear o actualizar un Diagnostico
  input CreateDiagnosticoInput {
    codigo: String
    descripcion: String
    paciente_id: String
  }

  # Consultas para obtener Diagnosticos
  type Query {
    diagnosticos: [Diagnostico]
    getDiagnostico(id_diagnostico: Int!): Diagnostico
  }

  # Mutaciones para crear, actualizar y eliminar Diagnosticos
  type Mutation {
    createDiagnostico(input: CreateDiagnosticoInput): Diagnostico
    updateDiagnostico(id_diagnostico: Int!, input: CreateDiagnosticoInput): Diagnostico
    deleteDiagnostico(id_diagnostico: Int!): Diagnostico
  }
`;

module.exports = typeDefs;
