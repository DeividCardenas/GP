const {
  getPacientes,
  getPacienteById,
  getPacienteByIdentificacion,
  createPaciente,
  updatePaciente,
  deletePaciente,
} = require('./service');

const resolvers = {
  Query: {
    pacientes: async () => {
      try {
        return await getPacientes();
      } catch (error) {
        throw new Error('Error al obtener pacientes: ' + error.message);
      }
    },

    getPaciente: async (_, { id_pacientes }) => {
      try {
        return await getPacienteById(id_pacientes);
      } catch (error) {
        throw new Error('Error al obtener el paciente: ' + error.message);
      }
    },

    getPacienteByIdentificacion: async (_, { identificacion }) => {
      try {
        return await getPacienteByIdentificacion(identificacion);
      } catch (error) {
        throw new Error('Error al obtener el paciente por identificación: ' + error.message);
      }
    },
  },

  Mutation: {
    createPaciente: async (_, { input }) => {
      try {
        return await createPaciente(input);
      } catch (error) {
        throw new Error('Error al crear el paciente: ' + error.message);
      }
    },

    updatePaciente: async (_, { identificacion, input }) => {
      try {
        return await updatePaciente(identificacion, input);
      } catch (error) {
        throw new Error('Error al actualizar el paciente: ' + error.message);
      }
    },

    deletePaciente: async (_, { identificacion }) => {
      try {
        const pacienteEliminado = await deletePaciente(identificacion);
        return pacienteEliminado;
      } catch (error) {
        throw new Error('Error al eliminar el paciente: ' + error.message);
      }
    },
  },
};

module.exports = resolvers;
