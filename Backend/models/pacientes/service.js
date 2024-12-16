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

const getPacienteByIdentificacion = async (identificacion) => {
  try {
    if (!identificacion) {
      throw new Error("La identificación es obligatoria.");
    }
    return await prisma.pacientes.findUnique({
      where: { identificacion },
    });
  } catch (error) {
    throw new Error('Error al obtener el paciente por identificación: ' + error.message);
  }
};

// Crear un nuevo paciente
const createPaciente = async (input) => {
  try {
    // Verificar si ya existe un paciente con la misma identificación
    const existingPaciente = await prisma.pacientes.findUnique({
      where: {
        identificacion: input.identificacion, // Verifica si ya existe un paciente con esa identificación
      },
    });

    if (existingPaciente) {
      throw new Error('Ya existe un paciente con esa identificación.');
    }

    // Si no existe, crea el nuevo paciente
    const paciente = await prisma.pacientes.create({
      data: {
        identificacion: input.identificacion,
        tipo_identificacion: input.tipo_identificacion,
        nombre: input.nombre,
        telefono1: input.telefono1,
        telefono2: input.telefono2,
        eps: input.eps,
      },
    });

    return { success: true, message: 'Paciente creado con éxito.', paciente };  
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('Error de unicidad: La identificación ya está en uso.');
    }
    throw new Error("Error al crear el paciente: " + error.message);
  }
};


// Actualizar un paciente existente
const updatePaciente = async (identificacion, input) => {
  try {
    if (!identificacion) {
      throw new Error("La identificación es obligatoria para actualizar un paciente.");
    }

    const data = {};
    if (input.identificacion) data.identificacion = input.identificacion;
    if (input.tipo_identificacion) data.tipo_identificacion = input.tipo_identificacion;
    if (input.nombre) data.nombre = input.nombre;
    if (input.telefono1) data.telefono1 = input.telefono1;
    if (input.telefono2) data.telefono2 = input.telefono2;
    if (input.eps) data.eps = input.eps;

    if (Object.keys(data).length === 0) {
      throw new Error("No se proporcionaron campos para actualizar.");
    }

    const pacienteActualizado = await prisma.pacientes.update({
      where: { identificacion },
      data,
    });

    return { success: true, message: 'Paciente actualizado con éxito.', pacienteActualizado }; 
  } catch (error) {
    throw new Error("Error al actualizar el paciente: " + error.message);
  }
};

// Eliminar un paciente
const deletePaciente = async (identificacion) => {
  try {
    if (!identificacion) {
      throw new Error("La identificación es obligatoria para eliminar un paciente.");
    }

    await prisma.pacientes.delete({
      where: { identificacion },
    });

    return { success: true, message: 'Paciente eliminado con éxito.' }; 
  } catch (error) {
    throw new Error("Error al eliminar el paciente: " + error.message);
  }
};


module.exports = {
  getPacientes,
  getPacienteById,
  getPacienteByIdentificacion,
  createPaciente,
  updatePaciente,
  deletePaciente,
};
