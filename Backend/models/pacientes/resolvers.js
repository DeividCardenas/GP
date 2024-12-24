const { createPaciente, getAllPacientes, updatePaciente, deletePaciente } = require('./service');

const resolvers = {
  Query: {
    getAllPacientes: async () => {
      try {
        return await getAllPacientes();
      } catch (error) {
        throw new Error('Error al obtener los pacientes: ' + error.message);
      }
    },

    getPaciente: async (_, { id_pacientes }) => {
      try {
        return await getPaciente(id_pacientes);
      } catch (error) {
        throw new Error('Error al obtener el paciente: ' + error.message);
      }
    },
  },

  Mutation: {
    createPaciente: async (_, { input }) => {
      const response = await createPaciente(input);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    },

    updatePaciente: async (_, { identificacion, input }) => {
      const response = await updatePaciente(identificacion, input);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    },

    deletePaciente: async (_, { identificacion }) => {
      const response = await deletePaciente(identificacion);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    },
  },
};

module.exports = resolvers;
