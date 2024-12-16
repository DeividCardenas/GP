const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear un rol
const createRole = async ({ nombre }) => {
  if (!nombre) {
    return {
      success: false,
      message: 'El nombre del rol es obligatorio.',
      role: null, 
    };
  }

  try {
    const role = await prisma.roles.create({
      data: { nombre },
    });

    return {
      success: true, 
      message: `Rol "${role.nombre}" creado con éxito.`,
      role, 
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al crear el rol: ' + error.message,
      role: null, 
    };
  }
};

// Obtener un rol por Nombre
const getRoleByNombre = async (nombre) => {
  if (!nombre) {
    return {
      success: false,
      message: 'El nombre del rol es obligatorio.',
    };
  }

  try {
    // Busca el rol y sus usuarios asociados
    const role = await prisma.roles.findUnique({
      where: { nombre },
      include: {
        usuarios: {
          select: {
            identificacion: true,
            nombre_completo: true,
            nombre_usuario: true,
          },
        },
      },
    });

    if (!role) {
      return {
        success: false,
        message: `No se encontró un rol con el nombre "${nombre}".`,
      };
    }

    return {
      success: true,
      message: `Rol encontrado.`,
      role: {
        id_rol: role.id_rol,
        nombre: role.nombre,
        usuarios: role.usuarios, 
      },
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al obtener el rol: ' + error.message,
    };
  }
};


// Obtener todos los roles
const getAllRoles = async () => {
  try {
    const roles = await prisma.roles.findMany({
      include: { usuarios: true },
    });

    return {
      success: true,
      message: `Roles obtenidos con éxito.`,
      roles,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al obtener los roles: ' + error.message,
    };
  }
};

// Actualizar un rol
const updateRole = async (nombre, { nombreNuevo }) => {
  if (!nombre) {
    return {
      success: false,
      message: 'El nombre del rol es obligatorio.',
      role: null,
    };
  }

  try {
    const role = await prisma.roles.findUnique({
      where: { nombre },
    });

    if (!role) {
      return {
        success: false,
        message: `No se encontró un rol con el nombre ${id_rol}.`,
        role: null,
      };
    }

    const roleActualizado = await prisma.roles.update({
      where: { nombre },
      data: { nombre: nombreNuevo },
    });

    return {
      success: true,
      message: `Rol "${roleActualizado.nombre}" actualizado con éxito.`,
      role: roleActualizado,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al actualizar el rol: ' + error.message,
      role: null,
    };
  }
};

// Eliminar un rol
const deleteRole = async (nombre) => {
  if (!nombre) {
    return {
      success: false,
      message: 'El nombre del rol es obligatorio.',
    };
  }

  try {
    const role = await prisma.roles.findUnique({
      where: { nombre },
    });

    if (!role) {
      return {
        success: false,
        message: `No se encontró un rol con el nombre ${nombre}.`,
      };
    }

    const deletedRole = await prisma.roles.delete({
      where: { nombre },
    });

    return {
      success: true,
      message: `Rol "${deletedRole.nombre}" eliminado con éxito.`,
      role: deletedRole,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al eliminar el rol: ' + error.message,
    };
  }
};

module.exports = {
  createRole,
  getRoleByNombre,
  getAllRoles,
  updateRole,
  deleteRole,
};
