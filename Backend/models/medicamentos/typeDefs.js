const gql = require('graphql-tag');

const typeDefs = gql`
  # Tipo para Medicamentos
  type Medicamentos {
    id_medicamentos: Int
    laboratorio: String
    tipo_producto: String
    nombre_generico: String
    nombre_comercial: String
    fecha_vencimiento: DateTime
    cum: String
    lote: String
    codigo: Int
    cobertura: String
    entregados: [Entregados]
    pendientes: [Pendientes]
  }

  # Tipo de entrada para crear o actualizar un Medicamento
  input CreateMedicamentoInput {
    laboratorio: String
    tipo_producto: String
    nombre_generico: String
    nombre_comercial: String
    fecha_vencimiento: DateTime
    cum: String
    lote: String
    codigo: Int
    cobertura: String
  }

  # Consultas para obtener Medicamentos
  type Query {
    medicamentos: [Medicamentos]
    getMedicamento(id_medicamentos: Int!): Medicamentos
  }

  # Mutaciones para crear, actualizar y eliminar Medicamentos
  type Mutation {
    createMedicamento(input: CreateMedicamentoInput): Medicamentos
    updateMedicamento(id_medicamentos: Int!, input: CreateMedicamentoInput): Medicamentos
    deleteMedicamento(id_medicamentos: Int!): Medicamentos
  }

  # Scalar para manejar DateTime
  scalar DateTime
`;

module.exports = typeDefs;
