const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear una nueva sede
const createSede = async ({ nombre }) => {
  if (!nombre) {
    return {
      success: false,
      message: 'El nombre de la sede es obligatorio.',
      sede: null,
    };
  }

  try {
    const nuevaSede = await prisma.sedes.create({
      data: { nombre },
      select: {
        id_sede: true,
        nombre: true,
      },
    });

    return {
      success: true,
      message: `Sede "${nuevaSede.nombre}" creada con éxito.`,
      sede: nuevaSede,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al crear la sede: ' + error.message,
      sede: null,
    };
  }
};

// Obtener una sede por nombre
const getSedeByNombre = async (nombre) => {
  try {
    const sede = await prisma.sedes.findUnique({
      where: { nombre },
      select: {
        nombre: true,
        usuarios: {
          select: {
            identificacion: true,
            nombre_completo: true,
            nombre_usuario: true,
            role: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
    });

    if (!sede) {
      return {
        success: false,
        message: 'Sede no encontrada.',
        sede: null,
      };
    }

    return {
      success: true,
      message: `Sede encontrada con éxito.`,
      sede,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al obtener la sede: ' + error.message,
      sede: null,
    };
  }
};

// Obtener todas las sedes
const getAllSedes = async () => {
  try {
    const sedes = await prisma.sedes.findMany({
      select: {
        nombre: true,
        usuarios: {
          select: {
            nombre_completo: true,
          },
        },
      },
    });

    return {
      success: true,
      message: 'Sedes obtenidas con éxito.',
      sedes,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al obtener todas las sedes: ' + error.message,
      sedes: null,
    };
  }
};

// Actualizar una sede por nombre
const updateSede = async (nombre, { nombreNuevo }) => {
  if (!nombre || !nombreNuevo) {
    return {
      success: false,
      message: 'El nombre actual y el nuevo nombre son obligatorios.',
      sede: null,
    };
  }

  try {
    const sede = await prisma.sedes.findUnique({
      where: { nombre },
    });

    if (!sede) {
      return {
        success: false,
        message: `La sede con el nombre "${nombre}" no fue encontrada.`,
        sede: null,
      };
    }

    const sedeActualizada = await prisma.sedes.update({
      where: { nombre },
      data: { nombre: nombreNuevo },
    });

    return {
      success: true,
      message: `Sede actualizada con éxito. El nuevo nombre es "${sedeActualizada.nombre}".`,
      sede: sedeActualizada,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al actualizar la sede: ' + error.message,
      sede: null,
    };
  }
};

// Eliminar una sede por nombre
const deleteSede = async (nombre) => {
  if (!nombre) {
    return {
      success: false,
      message: 'El nombre de la sede es obligatorio.',
    };
  }

  try {
    const sede = await prisma.sedes.findUnique({
      where: { nombre },
    });

    if (!sede) {
      return {
        success: false,
        message: `La sede con el nombre "${nombre}" no fue encontrada.`,
      };
    }

    await prisma.sedes.delete({
      where: { nombre },
    });

    return {
      success: true,
      message: `La sede "${nombre}" fue eliminada con éxito.`,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al eliminar la sede: ' + error.message,
    };
  }
};

module.exports = {
  createSede,
  getSedeByNombre,
  getAllSedes,
  updateSede,
  deleteSede,
};
