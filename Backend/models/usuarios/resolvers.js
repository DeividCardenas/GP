const { loginUsuario, createUser, getUsuarioByIdentificacion, getAllUsuarios, updateUsuario, deleteUsuario } = require('./service');

const resolvers = {

  Query: {
    usuarios: async () => {
      try {
        return await getAllUsuarios();
      } catch (error) {
        throw new Error('Error al obtener los usuarios: ' + error.message);
      }
    },

    getUsuarioByIdentificacion: async (_, { identificacion }) => {
      try {
        return await getUsuarioByIdentificacion(identificacion);
      } catch (error) {
        throw new Error('Error al obtener el usuario por identificación: ' + error.message);
      }
    },

  },

  Mutation: {
    
    async loginuser(_, { nombre_usuario, contrasena }) {
      try {
          const usuario = await loginUsuario(nombre_usuario, contrasena);
          return usuario;
      } catch (error) {
          throw new Error(error.message);
      }
    },

    createUsuario: async (_, { input }) => {
      const { identificacion, nombre_completo, nombre_usuario, contrasena, role_nombre, sede_nombre } = input;
    
      const response = await createUser({ 
        identificacion, 
        nombre_completo, 
        nombre_usuario, 
        contrasena, 
        role_nombre, 
        sede_nombre 
      });
    
      if (!response.success) {
        throw new Error(response.message);
      }
    
      return {
        message: response.message,
        usuario: response.usuario, 
      };
    },

    updateUsuario: async (_, { identificacion, input }) => {
      try {
        
        const result = await updateUsuario(identificacion, input);
        
        if (result.success) {
          return {
            success: true,
            message: result.message,
            usuario: result.usuario,
          };
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        throw new Error('Error al actualizar el usuario: ' + error.message);
      }
    },

    deleteUsuario: async (_, { identificacion }) => {
      try {
        const usuarioEliminado = await deleteUsuario(identificacion);
    
        return {
          success: true,
          message: `Usuario con identificación "${identificacion}" eliminado con éxito.`,
          usuario: usuarioEliminado,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Error al eliminar el usuario: ' + error.message,
          usuario: null,
        };
      }
    },

  },

  Usuarios: {
    role: async (parent) => parent.role,
    sede: async (parent) => parent.sede,
  },
  
};

module.exports = resolvers;