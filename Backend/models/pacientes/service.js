const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear un nuevo paciente
const createPaciente = async ({ identificacion, tipo_identificacion, nombre, telefono1, telefono2, eps }) => {
  if (!identificacion || !tipo_identificacion || !nombre || !telefono1 || !telefono2 || !eps) {
    return {
      success: false,
      message: 'Todos los campos son obligatorios.',
      paciente: null,
    };
  }

  try {
    const pacienteExistente = await prisma.pacientes.findUnique({
      where: { identificacion },
    });

    if (pacienteExistente) {
      return {
        success: false,
        message: 'Paciente ya registrado.',
        paciente: null,
      };
    }

    const nuevoPaciente = await prisma.pacientes.create({
      data: {
        identificacion,
        tipo_identificacion,
        nombre,
        telefono1,
        telefono2,
        eps,
      },
      select: {
        id_pacientes: true,
        identificacion: true,
        tipo_identificacion: true,
        nombre: true,
        telefono1: true,
        telefono2: true,
        eps: true,
      },
    });

    return {
      success: true,
      message: `Paciente "${nuevoPaciente.nombre}" creado con éxito.`,
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

// Obtener un paciente por identificacion
const getPacienteByIdentificacion = async (identificacion) => {
  try {
    const paciente = await prisma.pacientes.findUnique({
      where: { identificacion },
      select: {
        id_pacientes: true,
        identificacion: true,
        tipo_identificacion: true,
        nombre: true,
        telefono1: true,
        telefono2: true,
        eps: true,
        diagnostico: true,
        entregados: true,
        pendientes: true,
      },
    });

    if (!paciente) {
      throw new Error('Paciente no encontrado.');
    }

    return paciente;
  } catch (error) {
    throw new Error('Error al obtener el paciente: ' + error.message);
  }
};

// Obtener todos los pacientes
const getAllPacientes = async () => {
  try {
    const pacientes = await prisma.pacientes.findMany({
      select: {
        id_pacientes: true,
        identificacion: true,
        tipo_identificacion: true,
        nombre: true,
        telefono1: true,
        telefono2: true,
        eps: true,
      },
    });
    return pacientes;
  } catch (error) {
    console.error('Error al obtener todos los pacientes:', error.message);
    throw new Error('Error al obtener todos los pacientes.');
  }
};

// Actualizar un paciente por identificacion
const updatePaciente = async (identificacion, { tipo_identificacion, nombre, telefono1, telefono2, eps }) => {
  if (!identificacion) {
    return {
      success: false,
      message: 'La identificación del paciente es obligatoria.',
      paciente: null,
    };
  }

  try {
    const paciente = await prisma.pacientes.findUnique({
      where: { identificacion },
    });

    if (!paciente) {
      return {
        success: false,
        message: `Paciente con identificación "${identificacion}" no encontrado.`,
        paciente: null,
      };
    }

    const updateData = {};
    if (tipo_identificacion) updateData.tipo_identificacion = tipo_identificacion;
    if (nombre) updateData.nombre = nombre;
    if (telefono1) updateData.telefono1 = telefono1;
    if (telefono2) updateData.telefono2 = telefono2;
    if (eps) updateData.eps = eps;

    const pacienteActualizado = await prisma.pacientes.update({
      where: { identificacion },
      data: updateData,
    });

    return {
      success: true,
      message: 'Paciente actualizado con éxito.',
      paciente: pacienteActualizado,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al actualizar el paciente: ' + error.message,
      paciente: null,
    };
  }
};  

// Eliminar un paciente por identificacion
const deletePaciente = async (identificacion) => {
  if (!identificacion) {
    return {
      success: false,
      message: 'La identificacion del paciente es obligatoria.',
    };
  }

  try {
    const paciente = await prisma.pacientes.findUnique({
      where: { identificacion },
    });

    if (!paciente) {
      return {
        success: false,
        message: `Paciente con identificacion "${identificacion}" no encontrado.`,
      };
    }

    await prisma.pacientes.delete({
      where: { identificacion },
    });

    return {
      success: true,
      message: `Paciente con identificacion "${identificacion}" eliminado con éxito.`,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error al eliminar el paciente: ' + error.message,
    };
  }
};

module.exports = {
  createPaciente,
  getPacienteByIdentificacion,
  getAllPacientes,
  updatePaciente,
  deletePaciente,
};
