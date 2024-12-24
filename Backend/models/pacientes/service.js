const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const validateInput = (data, requiredFields) => {
  requiredFields.forEach((field) => {
    if (!data[field]) {
      throw new Error(`El campo '${field}' es obligatorio.`);
    }
  });
};

const createPaciente = async ({ identificacion, tipo_identificacion, nombre, telefono1, telefono2, eps }) => {
  try {
    validateInput({ identificacion, tipo_identificacion, nombre, telefono1, telefono2, eps }, [
      'identificacion',
      'tipo_identificacion',
      'nombre',
      'telefono1',
      'telefono2',
      'eps',
    ]);

    const existingPaciente = await prisma.pacientes.findUnique({
      where: { identificacion },
    });

    if (existingPaciente) {
      return {
        success: false,
        message: 'La identificación ya está registrada.',
        paciente: null,
      };
    }

    const nuevoPaciente = await prisma.pacientes.create({
      data: { identificacion, tipo_identificacion, nombre, telefono1, telefono2, eps },
    });

    return {
      success: true,
      message: `Paciente "${nombre}" creado con éxito.`,
      paciente: nuevoPaciente,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al crear el paciente: ' + error.message,
      paciente: null,
    };
  }
};

const getAllPacientes = async () => {
  try {
    const pacientes = await prisma.pacientes.findMany();
    return {
      success: true,
      message: 'Pacientes obtenidos correctamente',
      data: pacientes,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al obtener los pacientes: ' + error.message,
    };
  }
};

const updatePaciente = async (identificacion, input) => {
  try {
    const paciente = await prisma.pacientes.findUnique({
      where: { identificacion },
    });

    if (!paciente) {
      return {
        success: false,
        message: 'Paciente no encontrado',
      };
    }

    const updatedPaciente = await prisma.pacientes.update({
      where: { identificacion },
      data: input,
    });

    return {
      success: true,
      message: 'Paciente actualizado correctamente',
      data: updatedPaciente,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al actualizar el paciente: ' + error.message,
    };
  }
};

const deletePaciente = async (identificacion) => {
  try {
    const paciente = await prisma.pacientes.findUnique({
      where: { identificacion },
    });

    if (!paciente) {
      return {
        success: false,
        message: `El paciente con la identificación "${identificacion}" no fue encontrado.`,
        paciente: null,
      };
    }

    await prisma.pacientes.delete({
      where: { identificacion },
    });

    return {
      success: true,
      message: `Paciente con identificación "${identificacion}" eliminado con éxito.`,
      paciente: null,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al eliminar el paciente: ' + error.message,
      paciente: null,
    };
  }
};

module.exports = {
  createPaciente,
  getAllPacientes,
  updatePaciente,
  deletePaciente,
};
