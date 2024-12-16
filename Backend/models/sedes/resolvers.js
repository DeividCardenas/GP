const { createSede, getSedeByNombre, getAllSedes, updateSede, deleteSede } = require('./service');

const resolvers = {
  Query: {
    // Obtener todas las sedes
    sedes: async () => {
      try {
        return await getAllSedes();
      } catch (error) {
        console.error('Error en el resolver de sedes:', error.message);
        throw new Error('Error al obtener las sedes.');
      }
    },

    // Obtener una sede por nombre
    getSedeByNombre: async (_, { nombre }) => {
      try {
        return await getSedeByNombre(nombre);
      } catch (error) {
        throw new Error('Error al obtener la sede: ' + error.message);
      }
    },
  },

  Mutation: {
    // Crear una nueva sede
    createSede: async (_, { input }) => {
      const { nombre } = input;

      const response = await createSede({ nombre });

      if (!response.success) {
        throw new Error(response.message);
      }

      return {
        message: response.message,
        sede: response.sede,
      };
    },

    // Actualizar una sede
    updateSede: async (_, { nombre, input }) => {
      const response = await updateSede(nombre, input);

      if (!response.success) {
        throw new Error(response.message); 
      }

      return {
        message: response.message,
        sede: response.sede,
      };
    },

    // Eliminar una sede
    deleteSede: async (_, { nombre }) => {
      const response = await deleteSede(nombre);

      if (!response.success) {
        throw new Error(response.message);
      }

      return {
        message: response.message,
      };
    },
  },
};

module.exports = resolvers;
