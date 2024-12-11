const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { GraphQLDateTime } = require('graphql-scalars');

const resolvers = {
  DateTime: GraphQLDateTime, // Resolver para DateTime

  Query: {
    pendientes: async () => {
      // Obtener todos los pendientes
      return await prisma.pendientes.findMany({
        include: {
          paciente: true, // Incluir paciente relacionado
          medicamento: true, // Incluir medicamento relacionado
          diagnostico: true, // Incluir diagnostico relacionado
        },
      });
    },
    getPendiente: async (_, { id_pendientes }) => {
      // Obtener un pendiente específico por ID
      return await prisma.pendientes.findUnique({
        where: { id_pendientes },
        include: {
          paciente: true,
          medicamento: true,
          diagnostico: true,
        },
      });
    },
  },

  Mutation: {
    createPendiente: async (_, { input }) => {
      // Crear un nuevo pendiente
      return await prisma.pendientes.create({
        data: {
          numero_factura: input.numero_factura,
          paciente_id: input.paciente_id,
          medicamento_id: input.medicamento_id,
          diagnostico_id: input.diagnostico_id,
          cantidad_prescrita: input.cantidad_prescrita,
          cantidad_pendiente: input.cantidad_pendiente,
          cantidad_entregada: input.cantidad_entregada,
          tipo_entrega: input.tipo_entrega,
          estado_dispensacion: input.estado_dispensacion,
          numero_formula: input.numero_formula,
          fecha_formula: new Date(input.fecha_formula),
          observacion: input.observacion,
        },
      });
    },

    updatePendiente: async (_, { id_pendientes, input }) => {
      // Actualizar un pendiente existente
      return await prisma.pendientes.update({
        where: { id_pendientes },
        data: {
          numero_factura: input.numero_factura,
          paciente_id: input.paciente_id,
          medicamento_id: input.medicamento_id,
          diagnostico_id: input.diagnostico_id,
          cantidad_prescrita: input.cantidad_prescrita,
          cantidad_pendiente: input.cantidad_pendiente,
          cantidad_entregada: input.cantidad_entregada,
          tipo_entrega: input.tipo_entrega,
          estado_dispensacion: input.estado_dispensacion,
          numero_formula: input.numero_formula,
          fecha_formula: new Date(input.fecha_formula),
          observacion: input.observacion,
        },
      });
    },

    deletePendiente: async (_, { id_pendientes }) => {
      // Eliminar un pendiente
      return await prisma.pendientes.delete({
        where: { id_pendientes },
      });
    },
  },
};

module.exports = resolvers;
