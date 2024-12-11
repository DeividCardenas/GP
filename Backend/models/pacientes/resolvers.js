const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    pacientes: async () => {
      // Obtener todos los pacientes
      return await prisma.pacientes.findMany({
        include: {
          diagnostico: true, // Incluir diagnóstico relacionado
          entregados: true, // Incluir entregados relacionados
          pendientes: true, // Incluir pendientes relacionados
        },
      });
    },
    getPaciente: async (_, { id_pacientes }) => {
      // Obtener un paciente específico por ID
      return await prisma.pacientes.findUnique({
        where: { id_pacientes },
        include: {
          diagnostico: true,
          entregados: true,
          pendientes: true,
        },
      });
    },
  },

  Mutation: {
    createPaciente: async (_, { input }) => {
      // Crear un nuevo paciente
      return await prisma.pacientes.create({
        data: {
          identificacion: input.identificacion,
          tipo_identificacion: input.tipo_identificacion,
          nombre: input.nombre,
          telefono1: input.telefono1,
          telefono2: input.telefono2,
          eps: input.eps,
        },
      });
    },

    updatePaciente: async (_, { id_pacientes, input }) => {
      // Actualizar un paciente existente
      return await prisma.pacientes.update({
        where: { id_pacientes },
        data: {
          identificacion: input.identificacion,
          tipo_identificacion: input.tipo_identificacion,
          nombre: input.nombre,
          telefono1: input.telefono1,
          telefono2: input.telefono2,
          eps: input.eps,
        },
      });
    },

    deletePaciente: async (_, { id_pacientes }) => {
      // Eliminar un paciente
      return await prisma.pacientes.delete({
        where: { id_pacientes },
      });
    },
  },
};

module.exports = resolvers;