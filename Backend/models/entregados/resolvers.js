const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { GraphQLDateTime } = require('graphql-scalars');

const resolvers = {
  DateTime: GraphQLDateTime, // Resolver para DateTime

  Query: {
    entregados: async () => {
      // Obtener todos los entregados
      return await prisma.entregados.findMany({
        include: {
          medicamento: true, // Incluir medicamento relacionado
          paciente: true,   // Incluir paciente relacionado
        },
      });
    },
    getEntregado: async (_, { id_entregados }) => {
      // Obtener un entregado específico por ID
      return await prisma.entregados.findUnique({
        where: { id_entregados },
        include: {
          medicamento: true,
          paciente: true,
        },
      });
    },
  },

  Mutation: {
    createEntregado: async (_, { input }) => {
      // Crear un nuevo entregado
      return await prisma.entregados.create({
        data: {
          observacion: input.observacion,
          fecha_registro: new Date(input.fecha_registro),
          cantidad_dispensada: input.cantidad_dispensada,
          numero_del_entregado: input.numero_del_entregado,
          medicamento_id: input.medicamento_id,
          paciente_id: input.paciente_id,
        },
      });
    },

    updateEntregado: async (_, { id_entregados, input }) => {
      // Actualizar un entregado existente
      return await prisma.entregados.update({
        where: { id_entregados },
        data: {
          observacion: input.observacion,
          fecha_registro: new Date(input.fecha_registro),
          cantidad_dispensada: input.cantidad_dispensada,
          numero_del_entregado: input.numero_del_entregado,
          medicamento_id: input.medicamento_id,
          paciente_id: input.paciente_id,
        },
      });
    },

    deleteEntregado: async (_, { id_entregados }) => {
      // Eliminar un entregado
      return await prisma.entregados.delete({
        where: { id_entregados },
      });
    },
  },
};

module.exports = resolvers;
