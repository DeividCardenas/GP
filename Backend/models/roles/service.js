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

// Obtener un rol por nombre
const getRoleByNombre = async (nombre) => {
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
        role: null,
      };
    }

    return {
      success: true,
      message: 'Rol encontrado.',
      role,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al obtener el rol: ' + error.message,
      role: null,
    };
  }
};

// Obtener todos los roles
const getAllRoles = async () => {
  try {
    const roles = await prisma.roles.findMany({
      include: {
        usuarios: true,
      },
    });

    return {
      success: true,
      message: 'Roles obtenidos con éxito.',
      roles,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al obtener los roles: ' + error.message,
      roles: [],
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
        message: `No se encontró un rol con el nombre "${nombre}".`,
        role: null,
      };
    }

    const updatedRole = await prisma.roles.update({
      where: { nombre },
      data: { nombre: nombreNuevo },
    });

    return {
      success: true,
      message: `Rol actualizado con éxito a "${updatedRole.nombre}".`,
      role: updatedRole,
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
        message: `No se encontró un rol con el nombre "${nombre}".`,
      };
    }

    await prisma.roles.delete({
      where: { nombre },
    });

    return {
      success: true,
      message: `Rol "${nombre}" eliminado con éxito.`,
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
