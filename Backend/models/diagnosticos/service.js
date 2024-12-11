const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los diagnosticos
const getDiagnosticos = async () => {
  return await prisma.diagnostico.findMany({
    include: {
      paciente: true,
      pendientes: true,
    },
  });
};

// Obtener un diagnostico por ID
const getDiagnosticoById = async (id_diagnostico) => {
  return await prisma.diagnostico.findUnique({
    where: { id_diagnostico },
    include: {
      paciente: true,
      pendientes: true,
    },
  });
};

// Crear un nuevo diagnostico
const createDiagnostico = async (input) => {
  return await prisma.diagnostico.create({
    data: {
      codigo: input.codigo,
      descripcion: input.descripcion,
      paciente_id: input.paciente_id,
    },
  });
};

// Actualizar un diagnostico existente
const updateDiagnostico = async (id_diagnostico, input) => {
  return await prisma.diagnostico.update({
    where: { id_diagnostico },
    data: {
      codigo: input.codigo,
      descripcion: input.descripcion,
      paciente_id: input.paciente_id,
    },
  });
};

// Eliminar un diagnostico
const deleteDiagnostico = async (id_diagnostico) => {
  return await prisma.diagnostico.delete({
    where: { id_diagnostico },
  });
};

module.exports = {
  getDiagnosticos,
  getDiagnosticoById,
  createDiagnostico,
  updateDiagnostico,
  deleteDiagnostico,
};
