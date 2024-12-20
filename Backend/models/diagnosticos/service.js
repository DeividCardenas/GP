const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear un nuevo Diagnostico
const createDiagnostico = async ({ codigo, descripcion, paciente_identificacion }) => {
  try {
    // Validar que todos los campos estén presentes
    if (!codigo || !descripcion || !paciente_identificacion) {
      return {
        success: false,
        message: 'Todos los campos son obligatorios.',
        diagnostico: null,
      };
    }

    // Verificar si el código ya existe
    const diagnosticoExistente = await prisma.diagnostico.findUnique({
      where: { codigo },
    });

    if (diagnosticoExistente) {
      return {
        success: false,
        message: `Ya existe un diagnóstico con el código "${codigo}".`,
        diagnostico: null,
      };
    }

    // Buscar al paciente por su identificación
    const paciente = await prisma.pacientes.findUnique({
      where: { identificacion: paciente_identificacion },
    });

    if (!paciente) {
      return {
        success: false,
        message: `Paciente con identificación "${paciente_identificacion}" no encontrado.`,
        diagnostico: null,
      };
    }

    // Crear el diagnóstico
    const nuevoDiagnostico = await prisma.diagnostico.create({
      data: {
        codigo,
        descripcion,
        paciente_id: paciente.identificacion,
      },
      include: {
        paciente: true, // Incluye los datos del paciente relacionado
      },
    });

    return {
      success: true,
      message: 'Diagnóstico creado con éxito.',
      diagnostico: nuevoDiagnostico,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al crear el diagnóstico: ${error.message}`,
      diagnostico: null,
    };
  }
};

// Obtener un Diagnostico por código
const getDiagnosticoByCodigo = async (codigo) => {
  try {
    const diagnostico = await prisma.diagnostico.findUnique({
      where: { codigo },
      include: { paciente: true, pendientes: true },
    });

    if (!diagnostico) {
      throw new Error('Diagnóstico no encontrado.');
    }

    return diagnostico;
  } catch (error) {
    throw new Error('Error al obtener el diagnóstico: ' + error.message);
  }
};

// Obtener todos los Diagnosticos
const getAllDiagnosticos = async () => {
  try {
    const diagnosticos = await prisma.diagnostico.findMany({
      include: { paciente: true },
    });
    return diagnosticos;
  } catch (error) {
    throw new Error('Error al obtener los diagnósticos: ' + error.message);
  }
};

// Actualizar un Diagnostico por código
const updateDiagnostico = async (codigo, { descripcion, paciente_identificacion }) => {
  if (!codigo) {
    return {
      success: false,
      message: 'El código del diagnóstico es obligatorio.',
      diagnostico: null,
    };
  }

  try {
    // Buscar el diagnóstico por código
    const diagnostico = await prisma.diagnostico.findUnique({
      where: { codigo },
      include: { paciente: true }, // Incluir paciente relacionado
    });

    if (!diagnostico) {
      return {
        success: false,
        message: `Diagnóstico con código "${codigo}" no encontrado.`,
        diagnostico: null,
      };
    }

    const updateData = {};

    // Solo actualizamos los campos que se han pasado
    if (descripcion) updateData.descripcion = descripcion;

    // Verificar si se pasa el paciente_identificacion y si el paciente existe
    if (paciente_identificacion) {
      const paciente = await prisma.pacientes.findUnique({
        where: { identificacion: paciente_identificacion },
      });

      if (!paciente) {
        return {
          success: false,
          message: `Paciente con identificación "${paciente_identificacion}" no encontrado.`,
          diagnostico: null,
        };
      }

      // Si el paciente es válido, actualizamos la relación con el paciente
      updateData.paciente_id = paciente.identificacion;
    }

    // Realizar la actualización
    const diagnosticoActualizado = await prisma.diagnostico.update({
      where: { codigo },
      data: updateData,
      include: { paciente: true }, // Incluir datos del paciente en la respuesta
    });

    return {
      success: true,
      message: 'Diagnóstico actualizado con éxito.',
      diagnostico: diagnosticoActualizado,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al actualizar el diagnóstico: ' + error.message,
      diagnostico: null,
    };
  }
};

// Eliminar un Diagnostico por código
const deleteDiagnostico = async (codigo) => {
  try {
    const diagnostico = await prisma.diagnostico.findUnique({
      where: { codigo },
    });

    if (!diagnostico) {
      return {
        success: false,
        message: `Diagnóstico con código "${codigo}" no encontrado.`,
      };
    }

    await prisma.diagnostico.delete({
      where: { codigo },
    });

    return {
      success: true,
      message: 'Diagnóstico eliminado con éxito.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al eliminar el diagnóstico: ' + error.message,
    };
  }
};

module.exports = {
  createDiagnostico,
  getDiagnosticoByCodigo,
  getAllDiagnosticos,
  updateDiagnostico,
  deleteDiagnostico,
};
