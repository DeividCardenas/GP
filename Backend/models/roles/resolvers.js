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
    roles: async () => {
      try {
        const roles = await getAllRoles();
        return roles;
      } catch (error) {
        throw new Error('Error al obtener los roles: ' + error.message);
      }
    },

    // Obtener un rol por ID
    getRoleByNombre: async (_, { nombre }) => {
      try {
        // Llamar a la función getRoleByNombre con el nombre proporcionado
        const result = await getRoleByNombre(nombre);
    
        if (result.success) {
          return {
            success: true,
            message: result.message,
            role: result.role,
          };
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        return {
          success: false,
          message: 'Error al obtener el rol: ' + error.message,
          role: null,
        };
      }
    },  
  },

  Mutation: {
    // Crear un nuevo rol
    createRole: async (_, { input }) => {
      const { nombre } = input;
    
      const response = await createRole({ nombre });

      if (!response.success) {
        throw new Error(response.message);
      }
    
      return {
        message: response.message,
        role: response.role,
      };
    },
    

    // Actualizar un rol
    updateRole: async (_, { nombre, input }) => {
        const response = await updateRole(nombre, input);

        if (!response.success) {
          throw new Error(response.message);
        }
  
        return {
          message: response.message,
          role: response.role,
        };
    },

    // Eliminar un rol
    deleteRole: async (_, { nombre }) => {
      const response = await deleteRole(nombre);

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
