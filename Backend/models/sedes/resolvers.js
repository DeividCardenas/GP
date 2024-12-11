const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    sedes: async () => {
      return await prisma.sedes.findMany({
        include: {
          usuarios: true,  // Incluir usuarios relacionados con la sede
        },
      });
    },
    getSede: async (_, { id_sede }) => {
      return await prisma.sedes.findUnique({
        where: { id_sede },
        include: {
          usuarios: true,
        },
      });
    },
  },

  Mutation: {
    createSede: async (_, { input }) => {
      return await prisma.sedes.create({
        data: {
          nombre: input.nombre,
        },
      });
    },

    updateSede: async (_, { id_sede, input }) => {
      return await prisma.sedes.update({
        where: { id_sede },
        data: {
          nombre: input.nombre,
        },
      });
    },

    deleteSede: async (_, { id_sede }) => {
      return await prisma.sedes.delete({
        where: { id_sede },
      });
    },
  },
};

module.exports = resolvers;
