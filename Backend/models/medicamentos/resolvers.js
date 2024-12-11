const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { GraphQLDateTime } = require('graphql-scalars');

const resolvers = {
  DateTime: GraphQLDateTime, // Resolver para DateTime

  Query: {
    medicamentos: async () => {
      // Obtener todos los medicamentos
      return await prisma.medicamentos.findMany({
        include: {
          entregados: true, // Incluir entregados relacionados
          pendientes: true, // Incluir pendientes relacionados
        },
      });
    },
    getMedicamento: async (_, { id_medicamentos }) => {
      // Obtener un medicamento específico por ID
      return await prisma.medicamentos.findUnique({
        where: { id_medicamentos },
        include: {
          entregados: true,
          pendientes: true,
        },
      });
    },
  },

  Mutation: {
    createMedicamento: async (_, { input }) => {
      // Crear un nuevo medicamento
      return await prisma.medicamentos.create({
        data: {
          laboratorio: input.laboratorio,
          tipo_producto: input.tipo_producto,
          nombre_generico: input.nombre_generico,
          nombre_comercial: input.nombre_comercial,
          fecha_vencimiento: new Date(input.fecha_vencimiento),
          cum: input.cum,
          lote: input.lote,
          codigo: input.codigo,
          cobertura: input.cobertura,
        },
      });
    },

    updateMedicamento: async (_, { id_medicamentos, input }) => {
      // Actualizar un medicamento existente
      return await prisma.medicamentos.update({
        where: { id_medicamentos },
        data: {
          laboratorio: input.laboratorio,
          tipo_producto: input.tipo_producto,
          nombre_generico: input.nombre_generico,
          nombre_comercial: input.nombre_comercial,
          fecha_vencimiento: new Date(input.fecha_vencimiento),
          cum: input.cum,
          lote: input.lote,
          codigo: input.codigo,
          cobertura: input.cobertura,
        },
      });
    },

    deleteMedicamento: async (_, { id_medicamentos }) => {
      // Eliminar un medicamento
      return await prisma.medicamentos.delete({
        where: { id_medicamentos },
      });
    },
  },
};

module.exports = resolvers;