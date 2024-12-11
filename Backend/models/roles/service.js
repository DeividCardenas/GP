const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createRole = async ({ nombre }) => {
  return await prisma.roles.create({
    data: { nombre },
  });
};

const getRoleById = async (id_rol) => {
  return await prisma.roles.findUnique({
    where: { id_rol },
    include: { usuarios: true },
  });
};

const getAllRoles = async () => {
  return await prisma.roles.findMany({
    include: { usuarios: true },
  });
};

const updateRole = async (id_rol, { nombre }) => {
  return await prisma.roles.update({
    where: { id_rol },
    data: { nombre },
  });
};

const deleteRole = async (id_rol) => {
  return await prisma.roles.delete({
    where: { id_rol },
  });
};

module.exports = {
  createRole,
  getRoleById,
  getAllRoles,
  updateRole,
  deleteRole,
};
