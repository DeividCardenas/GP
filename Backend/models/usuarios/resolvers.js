const { authenticateUser, createUsuario, getUsuarioById, getUsuarioByIdentificacion, getAllUsuarios, updateUsuario, deleteUsuario } = require('./service');

const resolvers = {
  Query: {
    usuarios: async () => {
      try {
        return await getAllUsuarios();
      } catch (error) {
        throw new Error('Error al obtener los usuarios: ' + error.message);
      }
    },

    getUsuario: async (_, { id_usuario }) => {
      try {
        return await getUsuarioById(id_usuario);
      } catch (error) {
        throw new Error('Error al obtener el usuario: ' + error.message);
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
    login: async (_, { nombre_usuario, contrasena }) => {
      try {
        const user = await authenticateUser(nombre_usuario, contrasena);
        if (!user) {
          throw new Error('Usuario no encontrado');
        }
  
        return {
          id_usuario: user.id_usuario,
          identificacion: user.identificacion,
          nombre_completo: user.nombre_completo,
          nombre_usuario: user.nombre_usuario,
          contrasena: user.contrasena, 
          role: user.role,
          sede: user.sede,
          message: "Autenticación exitosa" 
        };
      } catch (error) {
        throw new Error('Error de autenticación: ' + error.message);
      }
    },

    createUsuario: async (_, { input }) => {
      try {
        return await createUsuario(input);
      } catch (error) {
        throw new Error('Error al crear el usuario: ' + error.message);
      }
    },

    updateUsuario: async (_, { id_usuario, input }) => {
      try {
        return await updateUsuario(id_usuario, input);
      } catch (error) {
        throw new Error('Error al actualizar el usuario: ' + error.message);
      }
    },

    deleteUsuario: async (_, { id_usuario }) => {
      try {
        return await deleteUsuario(id_usuario);
      } catch (error) {
        throw new Error('Error al eliminar el usuario: ' + error.message);
      }
    },
  },

  // Resolver relaciones de Usuarios
  Usuarios: {
    role: async (parent) => parent.role,
    sede: async (parent) => parent.sede,
  },
};

module.exports = resolvers;