const { gql } = require('graphql-tag');

const typeDefs = gql`
  # Tipo para Entregados
  type Entregados {
    id_entregados: Int
    observacion: String
    fecha_registro: DateTime
    cantidad_dispensada: Int
    numero_del_entregado: Int
    medicamento: Medicamentos
    paciente: Pacientes
  }

  # Tipo de entrada para crear o actualizar un Entregado
  input CreateEntregadoInput {
    observacion: String
    fecha_registro: DateTime
    cantidad_dispensada: Int
    numero_del_entregado: Int
    medicamento_id: Int
    paciente_id: String
  }

  # Consultas para obtener Entregados
  type Query {
    entregados: [Entregados]
    getEntregado(id_entregados: Int!): Entregados
  }

  # Mutaciones para crear, actualizar y eliminar Entregados
  type Mutation {
    createEntregado(input: CreateEntregadoInput): Entregados
    updateEntregado(id_entregados: Int!, input: CreateEntregadoInput): Entregados
    deleteEntregado(id_entregados: Int!): Entregados
  }

  # Scalar para manejar DateTime
  scalar DateTime
`;

module.exports = typeDefs;
