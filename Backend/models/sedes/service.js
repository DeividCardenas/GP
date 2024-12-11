const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSede = async ({ nombre }) => {
  return await prisma.sedes.create({
    data: { nombre },
  });
};

const getSedeById = async (id_sede) => {
  return await prisma.sedes.findUnique({
    where: { id_sede },
    include: { usuarios: true },
  });
};

const getAllSedes = async () => {
  return await prisma.sedes.findMany({
    include: { usuarios: true },
  });
};

const updateSede = async (id_sede, { nombre }) => {
  return await prisma.sedes.update({
    where: { id_sede },
    data: { nombre },
  });
};

const deleteSede = async (id_sede) => {
  return await prisma.sedes.delete({
    where: { id_sede },
  });
};

module.exports = {
  createSede,
  getSedeById,
  getAllSedes,
  updateSede,
  deleteSede,
};
