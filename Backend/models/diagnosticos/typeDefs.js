const { gql } = require('graphql-tag');

const typeDefs = gql`
  # Tipo Diagnostico
  type Diagnostico {
    id_diagnostico: Int
    codigo: String
    descripcion: String
    paciente_id: String
    paciente: Pacientes
    pendientes: [Pendientes]
  }

  # Input para crear y actualizar Diagnosticos
  input DiagnosticoInput {
    codigo: String
    descripcion: String!
    paciente_identificacion: String # Hacer opcional para actualización
  }

  # Querys
  type Query {
    # Obtener todos los diagnósticos
    diagnosticos: [Diagnostico]
    # Obtener un diagnóstico por código
    getDiagnosticoByCodigo(codigo: String!): Diagnostico
  }

  # Mutations
  type Mutation {
    # Crear un nuevo diagnóstico
    createDiagnostico(input: DiagnosticoInput!): ResponseDiagnostico
    # Actualizar un diagnóstico existente
    updateDiagnostico(codigo: String!, input: DiagnosticoInput!): ResponseDiagnostico
    # Eliminar un diagnóstico por código
    deleteDiagnostico(codigo: String!): ResponseMessage
  }

  # Respuesta personalizada para Diagnosticos
  type ResponseDiagnostico {
    message: String
    diagnostico: Diagnostico
  }

  # Respuesta genérica para mensajes
  type ResponseMessage {
    message: String
  }
`;

module.exports = typeDefs;
