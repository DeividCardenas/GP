const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los medicamentos
const getMedicamentos = async () => {
  return await prisma.medicamentos.findMany({
    include: {
      entregados: true, // Incluir entregados relacionados
      pendientes: true, // Incluir pendientes relacionados
    },
  });
};

// Obtener un medicamento por ID
const getMedicamentoById = async (id_medicamentos) => {
  return await prisma.medicamentos.findUnique({
    where: { id_medicamentos },
    include: {
      entregados: true,
      pendientes: true,
    },
  });
};

// Crear un nuevo medicamento
const createMedicamento = async (input) => {
  return await prisma.medicamentos.create({
    data: {
      laboratorio: input.laboratorio,
      tipo_producto: input.tipo_producto,
      nombre_generico: input.nombre_generico,
      nombre_comercial: input.nombre_comercial,
      fecha_vencimiento: new Date(input.fecha_vencimiento),
      cum: input.cum,
      lote: input.lote,
      codigo: input.codigo,
      cobertura: input.cobertura,
    },
  });
};

// Actualizar un medicamento existente
const updateMedicamento = async (id_medicamentos, input) => {
  return await prisma.medicamentos.update({
    where: { id_medicamentos },
    data: {
      laboratorio: input.laboratorio,
      tipo_producto: input.tipo_producto,
      nombre_generico: input.nombre_generico,
      nombre_comercial: input.nombre_comercial,
      fecha_vencimiento: new Date(input.fecha_vencimiento),
      cum: input.cum,
      lote: input.lote,
      codigo: input.codigo,
      cobertura: input.cobertura,
    },
  });
};

// Eliminar un medicamento
const deleteMedicamento = async (id_medicamentos) => {
  return await prisma.medicamentos.delete({
    where: { id_medicamentos },
  });
};

module.exports = {
  getMedicamentos,
  getMedicamentoById,
  createMedicamento,
  updateMedicamento,
  deleteMedicamento,
};
