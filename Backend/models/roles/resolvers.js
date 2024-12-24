// Updated resolvers
const {
  createRole,
  getRoleByNombre,
  getAllRoles,
  updateRole,
  deleteRole,
} = require('./service');

const resolvers = {
  Query: {
    // Obtener todos los roles
    getAllRoles: async () => {
      const response = await getAllRoles();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },

    // Obtener un rol por nombre
    getRoleByNombre: async (_, { nombre }) => {
      const response = await getRoleByNombre(nombre);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
  },

  Mutation: {
    // Crear un rol
    createRole: async (_, { input }) => {
      const response = await createRole(input);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },

    // Actualizar un rol
    updateRole: async (_, { nombre, input }) => {
      const response = await updateRole(nombre, input);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },

    // Eliminar un rol
    deleteRole: async (_, { nombre }) => {
      const response = await deleteRole(nombre);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
  },
};

module.exports = resolvers;
