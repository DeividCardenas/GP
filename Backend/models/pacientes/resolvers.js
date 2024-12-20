const { 
  createPaciente, 
  getPacienteByIdentificacion, 
  getAllPacientes, 
  updatePaciente, 
  deletePaciente 
} = require('./service');

const resolvers = {
  Query: {
    // Obtener todos los pacientes
    pacientes: async () => {
      try {
        return await getAllPacientes();
      } catch (error) {
        console.error('Error en el resolver de pacientes:', error.message);
        throw new Error('Error al obtener los pacientes.');
      }
    },

    // Obtener un paciente por identificacion
    getPacienteByIdentificacion: async (_, { identificacion }) => {
      try {
        return await getPacienteByIdentificacion(identificacion);
      } catch (error) {
        throw new Error('Error al obtener el paciente: ' + error.message);
      }
    },
  },

  Mutation: {
    // Crear un nuevo paciente
    createPaciente: async (_, { input }) => {
      const { identificacion, tipo_identificacion, nombre, telefono1, telefono2, eps } = input;

      const response = await createPaciente({ identificacion, tipo_identificacion, nombre, telefono1, telefono2, eps });

      if (!response.success) {
        throw new Error(response.message);
      }

      return {
        message: response.message,
        paciente: response.paciente,  // Esto es un objeto de tipo 'Paciente'
      };
    },

    // Actualizar un paciente
    updatePaciente: async (_, { identificacion, input }) => {
      try {
        const result = await updatePaciente(identificacion, input);
    
        if (result.success) {
          return {
            message: result.message,
            paciente: result.paciente,
          };
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        throw new Error('Error al actualizar el paciente: ' + error.message);
      }
    },

    // Eliminar un paciente
    deletePaciente: async (_, { identificacion }) => {
      const response = await deletePaciente(identificacion);

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
