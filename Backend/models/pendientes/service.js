const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los pendientes
const getPendientes = async () => {
  return await prisma.pendientes.findMany({
    include: {
      paciente: true,
      medicamento: true,
      diagnostico: true,
    },
  });
};

// Obtener un pendiente por ID
const getPendienteById = async (id_pendientes) => {
  return await prisma.pendientes.findUnique({
    where: { id_pendientes },
    include: {
      paciente: true,
      medicamento: true,
      diagnostico: true,
    },
  });
};

// Crear un nuevo pendiente
const createPendiente = async (input) => {
  return await prisma.pendientes.create({
    data: {
      numero_factura: input.numero_factura,
      paciente_id: input.paciente_id,
      medicamento_id: input.medicamento_id,
      diagnostico_id: input.diagnostico_id,
      cantidad_prescrita: input.cantidad_prescrita,
      cantidad_pendiente: input.cantidad_pendiente,
      cantidad_entregada: input.cantidad_entregada,
      tipo_entrega: input.tipo_entrega,
      estado_dispensacion: input.estado_dispensacion,
      numero_formula: input.numero_formula,
      fecha_formula: input.fecha_formula,
      observacion: input.observacion,
    },
  });
};

// Actualizar un pendiente existente
const updatePendiente = async (id_pendientes, input) => {
  return await prisma.pendientes.update({
    where: { id_pendientes },
    data: {
      numero_factura: input.numero_factura,
      paciente_id: input.paciente_id,
      medicamento_id: input.medicamento_id,
      diagnostico_id: input.diagnostico_id,
      cantidad_prescrita: input.cantidad_prescrita,
      cantidad_pendiente: input.cantidad_pendiente,
      cantidad_entregada: input.cantidad_entregada,
      tipo_entrega: input.tipo_entrega,
      estado_dispensacion: input.estado_dispensacion,
      numero_formula: input.numero_formula,
      fecha_formula: input.fecha_formula,
      observacion: input.observacion,
    },
  });
};

// Eliminar un pendiente
const deletePendiente = async (id_pendientes) => {
  return await prisma.pendientes.delete({
    where: { id_pendientes },
  });
};

module.exports = {
  getPendientes,
  getPendienteById,
  createPendiente,
  updatePendiente,
  deletePendiente,
};
