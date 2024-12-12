const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Función para validar las credenciales del usuario (nombre de usuario y contraseña)
const validateCredentials = async (nombre_usuario, contrasena) => {
  console.log('Buscando usuario con nombre de usuario:', nombre_usuario);

  const user = await prisma.usuarios.findFirst({
    where: { nombre_usuario },
    include: { role: true, sede:true }, // Incluir los roles para asignarlos al usuario
  });

  console.log('Usuario encontrado:', user); // Ver qué datos estamos obteniendo

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Comparar la contraseña ingresada con la almacenada (en texto plano en la DB)
  if (user.contrasena !== contrasena) {
    throw new Error('Contraseña incorrecta');
  }

  return user; // Regresar el usuario si las credenciales son correctas
};

// Función para autenticar un usuario
const authenticateUser = async (nombre_usuario, contrasena) => {
  const user = await validateCredentials(nombre_usuario, contrasena);
  return { user }; // Retorna solo el usuario sin el token
};

const validateInput = (data, requiredFields) => {
  requiredFields.forEach((field) => {
    if (!data[field]) {
      throw new Error(`El campo '${field}' es obligatorio.`);
    }
  });
};

const createUsuario = async (data) => {
  try {
    validateInput(data, ['identificacion', 'nombre_completo', 'nombre_usuario', 'contrasena', 'role_id', 'sede_id']);

    return await prisma.usuarios.create({
      data: {
        identificacion: data.identificacion,
        nombre_completo: data.nombre_completo,
        nombre_usuario: data.nombre_usuario,
        contrasena: data.contrasena,  // Guardar la contraseña en texto plano (no recomendado)
        role: { connect: { id_rol: data.role_id } },
        sede: { connect: { id_sede: data.sede_id } },
      },
      include: {
        role: true,
        sede: true,
      },
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('La identificación o nombre de usuario ya está en uso.');
    }
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};

const getUsuarioById = async (id_usuario) => {
  try {
    if (!id_usuario) {
      throw new Error("El ID de usuario es obligatorio.");
    }
    return await prisma.usuarios.findUnique({
      where: { id_usuario },
      include: {
        role: true,
        sede: true,
      },
    });
  } catch (error) {
    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};

const getUsuarioByIdentificacion = async (identificacion) => {
  try {
    if (!identificacion) {
      throw new Error("La identificación es obligatoria.");
    }
    return await prisma.usuarios.findUnique({
      where: { identificacion },
      include: {
        role: true,
        sede: true,
      },
    });
  } catch (error) {
    throw new Error('Error al obtener el usuario por identificación: ' + error.message);
  }
};

const getAllUsuarios = async () => {
  try {
    return await prisma.usuarios.findMany({
      include: {
        role: true,
        sede: true,
      },
    });
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};

const updateUsuario = async (id_usuario, data) => {
  try {
    if (!id_usuario) {
      throw new Error("El ID de usuario es obligatorio.");
    }

    return await prisma.usuarios.update({
      where: { id_usuario },
      data: {
        ...(data.identificacion && { identificacion: data.identificacion }),
        ...(data.nombre_completo && { nombre_completo: data.nombre_completo }), 
        ...(data.nombre_usuario && { nombre_usuario: data.nombre_usuario }),
        ...(data.contrasena && { contrasena: data.contrasena }),
        ...(data.role_id && { role: { connect: { id_rol: data.role_id } } }),
        ...(data.sede_id && { sede: { connect: { id_sede: data.sede_id } } }),
      },
      include: {
        role: true,
        sede: true,
      },
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('La identificación o nombre de usuario ya está en uso.');
    }
    throw new Error('Error al actualizar el usuario: ' + error.message);
  }
};

const deleteUsuario = async (id_usuario) => {
  try {
    if (!id_usuario) {
      throw new Error("El ID de usuario es obligatorio.");
    }
    return await prisma.usuarios.delete({
      where: { id_usuario },
    });
  } catch (error) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};

module.exports = {
  authenticateUser,
  createUsuario,
  getUsuarioById,
  getUsuarioByIdentificacion,
  getAllUsuarios,
  updateUsuario,
  deleteUsuario,
};
