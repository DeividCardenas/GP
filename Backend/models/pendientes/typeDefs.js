const { gql } = require('graphql-tag');

const typeDefs = gql`
  # Tipo para Pendientes
  type Pendientes {
    id_pendientes: Int
    numero_factura: Int
    fecha_registro: DateTime
    paciente: Pacientes
    medicamento: Medicamentos
    diagnostico: Diagnostico
    cantidad_prescrita: Int
    cantidad_pendiente: Int
    cantidad_entregada: Int
    tipo_entrega: String
    estado_dispensacion: EstadoDispensacion
    numero_formula: String
    fecha_formula: DateTime
    observacion: String
  }

  # Tipo de entrada para crear o actualizar un Pendiente
  input CreatePendienteInput {
    numero_factura: Int
    paciente_id: String
    medicamento_id: Int
    diagnostico_id: Int
    cantidad_prescrita: Int
    cantidad_pendiente: Int
    cantidad_entregada: Int
    tipo_entrega: String
    estado_dispensacion: EstadoDispensacion
    numero_formula: String
    fecha_formula: DateTime
    observacion: String
  }

  # Consultas para obtener Pendientes
  type Query {
    pendientes: [Pendientes]
    getPendiente(id_pendientes: Int!): Pendientes
  }

  # Mutaciones para crear, actualizar y eliminar Pendientes
  type Mutation {
    createPendiente(input: CreatePendienteInput): Pendientes
    updatePendiente(id_pendientes: Int!, input: CreatePendienteInput): Pendientes
    deletePendiente(id_pendientes: Int!): Pendientes
  }

  # Enum para el estado de dispensación
  enum EstadoDispensacion {
    pendiente
    en_proceso
    completada
  }

  # Scalar para manejar DateTime
  scalar DateTime
`;

module.exports = typeDefs;
