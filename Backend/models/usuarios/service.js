const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const validateInput = (data, requiredFields) => {
  requiredFields.forEach((field) => {
    if (!data[field]) {
      throw new Error(`El campo '${field}' es obligatorio.`);
    }
  });
};

async function loginUsuario(nombre_usuario, contrasena) {
  
  const usuario = await prisma.usuarios.findUnique({
      where: { nombre_usuario },
      include: { role: true, sede: true },
  });

  if (!usuario || usuario.contrasena !== contrasena) {
      throw new Error('Credenciales inválidas');
  }

  return {
      nombre_completo: usuario.nombre_completo,
      nombre_usuario: usuario.nombre_usuario,
      rol: usuario.role.nombre, 
      sede: usuario.sede.nombre,
  };
}

const createUser = async ({ identificacion, nombre_completo, nombre_usuario, contrasena, role_nombre, sede_nombre }) => {
  if (!identificacion || !nombre_completo || !nombre_usuario || !contrasena || !role_nombre || !sede_nombre) {
    return {
      success: false,
      message: 'Todos los campos son obligatorios.',
      usuario: null,
    };
  }

  try { 
    // Verificar si el nombre de usuario ya está registrado
    const existingUser = await prisma.usuarios.findUnique({
      where: { nombre_usuario },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'El nombre de usuario ya está en uso.',
        usuario: null,
      };
    }

    // Verificar si el rol existe
    const role = await prisma.roles.findUnique({
      where: { nombre: role_nombre },
    });

    if (!role) {
      return {
        success: false,
        message: 'Rol no encontrado.',
        usuario: null,
      };
    }

    // Verificar si la sede existe
    const sede = await prisma.sedes.findUnique({
      where: { nombre: sede_nombre },
    });

    if (!sede) {
      return {
        success: false,
        message: 'Sede no encontrada.',
        usuario: null,
      };
    }

    const nuevoUsuario = await prisma.usuarios.create({
      data: {
        identificacion,
        nombre_completo,
        nombre_usuario,
        contrasena, 
        role: { connect: { id_rol: role.id_rol } },
        sede: { connect: { id_sede: sede.id_sede } },
      },
      select: {
        id_usuario: true,
        identificacion: true,
        nombre_completo: true,
        nombre_usuario: true,
        role: true,   
        sede: true,   
      },
    });

    const usuarioResponse = {
      id_usuario: nuevoUsuario.id_usuario,
      identificacion: nuevoUsuario.identificacion,
      nombre_completo: nuevoUsuario.nombre_completo,
      nombre_usuario: nuevoUsuario.nombre_usuario,
      rol: nuevoUsuario.role,  
      sede: nuevoUsuario.sede,  
    };

    return {
      success: true,
      message: `Usuario "${nombre_completo}" creado con éxito.`,
      usuario: usuarioResponse,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al crear el usuario: ' + error.message,
      usuario: null,
    };
  }
};

const getUsuarioByIdentificacion = async (identificacion) => {
  try {
    if (!identificacion) {
      throw new Error("La identificación es obligatoria.");
    }
    return await prisma.usuarios.findUnique({
      where: { identificacion },
      include: {
        role: true,
        sede: true,
      },
    });
  } catch (error) {
    throw new Error('Error al obtener el usuario por identificación: ' + error.message);
  }
};

const getAllUsuarios = async () => {
  try {
    return await prisma.usuarios.findMany({
      include: {
        role: true,
        sede: true,
      },
    });
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};

const updateUsuario = async (identificacion, { identificacionNuevo, nombre_completo, nombre_usuario, contrasena, role, sede }) => {
  if (!identificacion) {
    return {
      success: false,
      message: 'La identificación del usuario es obligatoria.',
      usuario: null,
    };
  }

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { identificacion },
      include: { role: true, sede: true },
    });

    if (!usuario) {
      return {
        success: false,
        message: `El usuario con la identificación "${identificacion}" no fue encontrado.`,
        usuario: null,
      };
    }

    const updateData = {};

    if (identificacionNuevo) updateData.identificacion = identificacionNuevo;
    if (nombre_completo) updateData.nombre_completo = nombre_completo;
    if (nombre_usuario) updateData.nombre_usuario = nombre_usuario;
    if (contrasena) updateData.contrasena = contrasena;
    if (role) updateData.role = { connect: { nombre: role } };
    if (sede) updateData.sede = { connect: { nombre: sede } };

    const usuarioActualizado = await prisma.usuarios.update({
      where: { identificacion },
      data: updateData,
      include: { role: true, sede: true },
    });

    return {
      success: true,
      message: `Usuario actualizado con éxito.`,
      usuario: usuarioActualizado,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al actualizar el usuario: ' + error.message,
      usuario: null,
    };
  }
};

const deleteUsuario = async (identificacion) => {
  try {
    if (!identificacion) {
      throw new Error("La identificación es obligatoria.");
    }

    // Buscar el usuario por su identificación
    const usuario = await prisma.usuarios.findUnique({
      where: { identificacion },
    });

    if (!usuario) {
      throw new Error(`El usuario con la identificación "${identificacion}" no fue encontrado.`);
    }

    // Eliminar el usuario
    return await prisma.usuarios.delete({
      where: { identificacion },
    });
  } catch (error) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};

module.exports = {
  loginUsuario,
  createUser,
  getUsuarioByIdentificacion,
  getAllUsuarios,
  updateUsuario,
  deleteUsuario,
};
