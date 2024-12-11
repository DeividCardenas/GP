const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los pacientes
const getPacientes = async () => {
  return await prisma.pacientes.findMany({
    include: {
      diagnostico: true,
      entregados: true,
      pendientes: true,
    },
  });
};

// Obtener un paciente por ID
const getPacienteById = async (id_pacientes) => {
  return await prisma.pacientes.findUnique({
    where: { id_pacientes },
    include: {
      diagnostico: true,
      entregados: true,
      pendientes: true,
    },
  });
};

// Crear un nuevo paciente
const createPaciente = async (input) => {
  return await prisma.pacientes.create({
    data: {
      identificacion: input.identificacion,
      tipo_identificacion: input.tipo_identificacion,
      nombre: input.nombre,
      telefono1: input.telefono1,
      telefono2: input.telefono2,
      eps: input.eps,
    },
  });
};

// Actualizar un paciente existente
const updatePaciente = async (id_pacientes, input) => {
  return await prisma.pacientes.update({
    where: { id_pacientes },
    data: {
      identificacion: input.identificacion,
      tipo_identificacion: input.tipo_identificacion,
      nombre: input.nombre,
      telefono1: input.telefono1,
      telefono2: input.telefono2,
      eps: input.eps,
    },
  });
};

// Eliminar un paciente
const deletePaciente = async (id_pacientes) => {
  return await prisma.pacientes.delete({
    where: { id_pacientes },
  });
};

module.exports = {
  getPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente,
};
