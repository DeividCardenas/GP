const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los entregados
const getEntregados = async () => {
  return await prisma.entregados.findMany({
    include: {
      medicamento: true,
      paciente: true,
    },
  });
};

// Obtener un entregado por ID
const getEntregadoById = async (id_entregados) => {
  return await prisma.entregados.findUnique({
    where: { id_entregados },
    include: {
      medicamento: true,
      paciente: true,
    },
  });
};

// Crear un nuevo entregado
const createEntregado = async (input) => {
  return await prisma.entregados.create({
    data: {
      observacion: input.observacion,
      fecha_registro: new Date(input.fecha_registro),
      cantidad_dispensada: input.cantidad_dispensada,
      numero_del_entregado: input.numero_del_entregado,
      medicamento_id: input.medicamento_id,
      paciente_id: input.paciente_id,
    },
  });
};

// Actualizar un entregado existente
const updateEntregado = async (id_entregados, input) => {
  return await prisma.entregados.update({
    where: { id_entregados },
    data: {
      observacion: input.observacion,
      fecha_registro: new Date(input.fecha_registro),
      cantidad_dispensada: input.cantidad_dispensada,
      numero_del_entregado: input.numero_del_entregado,
      medicamento_id: input.medicamento_id,
      paciente_id: input.paciente_id,
    },
  });
};

// Eliminar un entregado
const deleteEntregado = async (id_entregados) => {
  return await prisma.entregados.delete({
    where: { id_entregados },
  });
};

module.exports = {
  getEntregados,
  getEntregadoById,
  createEntregado,
  updateEntregado,
  deleteEntregado,
};
