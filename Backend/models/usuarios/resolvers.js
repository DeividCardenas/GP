const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    // Obtener todos los usuarios
    usuarios: async () => {
      try {
        return await prisma.usuarios.findMany({
          include: {
            role: true,  // Incluir el role relacionado con el usuario
            sede: true,  // Incluir la sede relacionada con el usuario
          },
        });
      } catch (error) {
        throw new Error('Error al obtener los usuarios: ' + error.message);
      }
    },

    // Obtener un usuario por ID
    getUsuario: async (_, { id_usuario }) => {
      try {
        return await prisma.usuarios.findUnique({
          where: { id_usuario },
          include: {
            role: true,  // Incluir el role
            sede: true,  // Incluir la sede
          },
        });
      } catch (error) {
        throw new Error('Error al obtener el usuario: ' + error.message);
      }
    },
  },

  Mutation: {
    // Crear un nuevo usuario
    createUsuario: async (_, { input }) => {
      try {
        const usuario = await prisma.usuarios.create({
          data: {
            nombre_usuario: input.nombre_usuario,
            contrasena: input.contrasena,
            role: {
              connect: { id_rol: input.roles_id },  // Conectar con el rol ya existente
            },
            sede: {
              connect: { id_sede: input.sede_id },  // Conectar con la sede ya existente
            },
          },
        });
        return usuario;
      } catch (error) {
        throw new Error('Error al crear el usuario: ' + error.message);
      }
    },

    // Actualizar un usuario
    updateUsuario: async (_, { id_usuario, input }) => {
      try {
        const usuario = await prisma.usuarios.update({
          where: { id_usuario },
          data: {
            nombre_usuario: input.nombre_usuario,
            contrasena: input.contrasena,
            role: {
              connect: { id_rol: input.roles_id },  // Conectar con el rol
            },
            sede: {
              connect: { id_sede: input.sede_id },  // Conectar con la sede
            },
          },
        });
        return usuario;
      } catch (error) {
        throw new Error('Error al actualizar el usuario: ' + error.message);
      }
    },

    // Eliminar un usuario
    deleteUsuario: async (_, { id_usuario }) => {
      try {
        const usuario = await prisma.usuarios.delete({
          where: { id_usuario },
        });
        return usuario;
      } catch (error) {
        throw new Error('Error al eliminar el usuario: ' + error.message);
      }
    },
  },

  // Resolvers para las relaciones
  Usuarios: {
    role: async (parent) => {
      return parent.role; // Prisma automatically resolves relations
    },
    sede: async (parent) => {
      return parent.sede; // Prisma automatically resolves relations
    }
  },
};

module.exports = resolvers;
