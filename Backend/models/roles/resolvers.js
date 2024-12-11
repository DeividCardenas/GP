const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    roles: async () => {
      return await prisma.roles.findMany({
        include: {
          usuarios: true,  // Incluir los usuarios relacionados con el rol
        },
      });
    },
    getRole: async (_, { id_rol }) => {
      return await prisma.roles.findUnique({
        where: { id_rol },
        include: {
          usuarios: true,
        },
      });
    },
  },

  Mutation: {
    createRole: async (_, { input }) => {
      return await prisma.roles.create({
        data: {
          nombre: input.nombre,
        },
      });
    },

    updateRole: async (_, { id_rol, input }) => {
      return await prisma.roles.update({
        where: { id_rol },
        data: {
          nombre: input.nombre,
        },
      });
    },

    deleteRole: async (_, { id_rol }) => {
      return await prisma.roles.delete({
        where: { id_rol },
      });
    },
  },
};

module.exports = resolvers;
