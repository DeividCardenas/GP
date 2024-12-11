const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUsuario = async (data) => {
  try {
    const usuario = await prisma.usuarios.create({
      data: {
        nombre_usuario: data.nombre_usuario,
        contrasena: data.contrasena,
        roles_id: data.roles_id,  // Relación con roles
        sede_id: data.sede_id,    // Relación con sede
      },
    });
    return usuario;
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};

const getUsuarioById = async (id_usuario) => {
  return await prisma.usuarios.findUnique({
    where: { id_usuario },
    include: {
      role: true,  // Incluir el role
      sede: true,  // Incluir la sede
    },
  });
};

const getAllUsuarios = async () => {
  return await prisma.usuarios.findMany({
    include: {
      role: true,  // Incluir el role
      sede: true,  // Incluir la sede
    },
  });
};

const updateUsuario = async (id_usuario, { nombre_usuario, contrasena, roles_id, sede_id }) => {
  return await prisma.usuarios.update({
    where: { id_usuario },
    data: {
      nombre_usuario,
      contrasena,
      roles_id,
      sede_id,
    },
  });
};

const deleteUsuario = async (id_usuario) => {
  return await prisma.usuarios.delete({
    where: { id_usuario },
  });
};

module.exports = {
  createUsuario,
  getUsuarioById,
  getAllUsuarios,
  updateUsuario,
  deleteUsuario,
};
