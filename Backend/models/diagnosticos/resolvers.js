const {
  createDiagnostico,
  getDiagnosticoByCodigo,
  getAllDiagnosticos,
  updateDiagnostico,
  deleteDiagnostico,
} = require('./service');

const resolvers = {
  Query: {
    // Obtener todos los diagnósticos
    diagnosticos: async () => {
      try {
        return await getAllDiagnosticos();
      } catch (error) {
        return new Error(`Error al obtener los diagnósticos: ${error.message}`);
      }
    },

    // Obtener diagnóstico por código
    getDiagnosticoByCodigo: async (_, { codigo }) => {
      try {
        const diagnostico = await getDiagnosticoByCodigo(codigo);

        if (!diagnostico) {
          return new Error(`Diagnóstico con código "${codigo}" no encontrado.`);
        }

        return diagnostico;
      } catch (error) {
        return new Error(`Error al obtener el diagnóstico: ${error.message}`);
      }
    },
  },

  Mutation: {
    // Crear un nuevo diagnóstico
    createDiagnostico: async (_, { input }) => {
      const response = await createDiagnostico(input);

      return {
        message: response.message,
        diagnostico: response.success ? response.diagnostico : null,
      };
    },

    // Actualizar un diagnóstico por código
    updateDiagnostico: async (_, { codigo, input }) => {
      const response = await updateDiagnostico(codigo, input);

      return {
        message: response.message,
        diagnostico: response.success ? response.diagnostico : null,
      };
    },

    //Eliminar un diagnóstico por código
    deleteDiagnostico: async (_, { codigo }) => {
      const response = await deleteDiagnostico(codigo);

      return {
        message: response.message,
      };
    },
  },
};

module.exports = resolvers;
