const { createSede, getSedeByNombre, getAllSedes, updateSede, deleteSede } = require('./service');

const resolvers = {
  Query: {
    getAllSedes: async () => {
      const response = await getAllSedes();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    },

    getSedeByNombre: async (_, { nombre }) => {
      const response = await getSedeByNombre(nombre);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    },
  },

  Mutation: {
    createSede: async (_, { input }) => {
      const response = await createSede(input);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    },

    updateSede: async (_, { nombre, input }) => {
      const response = await updateSede(nombre, input);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    },

    deleteSede: async (_, { nombre }) => {
      const response = await deleteSede(nombre);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    },
  },
};

module.exports = resolvers;
