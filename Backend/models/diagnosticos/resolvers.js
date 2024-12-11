const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    diagnosticos: async () => {
      // Obtener todos los diagnosticos
      return await prisma.diagnostico.findMany({
        include: {
          paciente: true, // Incluir paciente relacionado
          pendientes: true, // Incluir pendientes relacionados
        },
      });
    },
    getDiagnostico: async (_, { id_diagnostico }) => {
      // Obtener un diagnostico específico por ID
      return await prisma.diagnostico.findUnique({
        where: { id_diagnostico },
        include: {
          paciente: true,
          pendientes: true,
        },
      });
    },
  },

  Mutation: {
    createDiagnostico: async (_, { input }) => {
      // Crear un nuevo diagnostico
      return await prisma.diagnostico.create({
        data: {
          codigo: input.codigo,
          descripcion: input.descripcion,
          id_pacientes   : input.id_pacientes,
        },
      });
    },

    updateDiagnostico: async (_, { id_diagnostico, input }) => {
      // Actualizar un diagnostico existente
      return await prisma.diagnostico.update({
        where: { id_diagnostico },
        data: {
          codigo: input.codigo,
          descripcion: input.descripcion,
          id_pacientes: input.id_pacientes,
        },
      });
    },

    deleteDiagnostico: async (_, { id_diagnostico }) => {
      // Eliminar un diagnostico
      return await prisma.diagnostico.delete({
        where: { id_diagnostico },
      });
    },
  },
};

module.exports = resolvers;
