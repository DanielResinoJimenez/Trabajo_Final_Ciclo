const Usuario = require('../database/models/Usuario');
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jwt-simple");
// const generatePassword = require("generate-password-browser");
// const emailService = require('./emailService');

// OBTENER TODOS LOS USUARIOS
const getAllUsers = async () => {
    return await Usuario.findAll();
};

// BUSCAR UN USUARIO POR EMAIL
const getUnUserEmail = async (email) => {
    return await Usuario.findOne({ where: { email: email } });
};

// ENVIAR CORREO CAMBIO CONTRASEÑA

// const resetUserPassword = async (email) => {
//     console.log('Generando nueva contraseña para:', email);

//     // Generar nueva contraseña
//     const newPassword = generatePassword.generate({
//         length: 10,
//         numbers: true,
//         symbols: true,
//         uppercase: true,
//         lowercase: true,
//         strict: true
//     });

//     console.log('Nueva contraseña generada:', newPassword);

//     try {
//         // Buscar al usuario por correo
//         const user = await User.findOne({ where: { email_user: email } });

//         if (!user) {
//             throw new Error('Usuario no encontrado.');
//         }

//         // Encriptar la nueva contraseña
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
        
//         // Actualizar la contraseña en la base de datos
//         await user.update({ password_user: hashedPassword});

//         console.log('Contraseña actualizada en la base de datos.');

//         // Enviar el correo con la nueva contraseña
//         const emailSent = await emailService.sendPasswordResetEmail(email, newPassword);
//         if (emailSent) {
//             return { success: true, message: 'Contraseña actualizada y correo enviado exitosamente.' };
//         } else {
//             throw new Error('No se pudo enviar el correo.');
//         }

//     } catch (error) {
//         console.error('Error al resetear la contraseña:', error);
//         throw error;
//     }
// };

// CREAR TOKEN DE AUTENTICACIÓN
const createToken = (usuario) => {
    const payload = {
        usuarioId: usuario.id_usuario,
        createdAt: moment().unix(),
        expiredAt: moment().add(8, "hours").unix(),
    };
    return jwt.encode(payload, "Token256");
};

// LOGIN DE USUARIO
const login = async (req) => {
    try {
        // Acceder correctamente a req.body
        const { email_user, password_user } = req.body;

        // Buscar usuario por email
        const user = await Usuario.findOne({ where: { email: email_user } });
        console.log(user)

        // Validar si el usuario existe
        if (!user) {
            return { error: "Usuario o contraseña incorrectos" };
        }

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const isCorrectPass = await bcrypt.compare(password_user, user.password);
        if (!isCorrectPass) {
            return { error: "Usuario o contraseña incorrectos" };
        }

        const token = createToken(user);

        return { 
            ok: true, 
            success: token, 
            user: {
                id: user.id_usuario,
                email: user.email,
                rol: user.rol,
                token: token
            } }; // Asegúrate de devolver un objeto con 'ok' si el login es exitoso, Enviamos también el token
    } catch (error) {
        console.error("Error en login:", error);
        return { error: "Ocurrió un error en el login" };
    }
};


// REGISTRO DE USUARIO
const register = async (user) => {
    try {
        console.log(user);
        return await Usuario.create({
            nombre: user.nombre,
            apellidos: user.apellidos,
            email: user.email_user,
            password: bcrypt.hashSync(user.password_user, 10),
            direccion: user.direccion,
            telefono: user.telefono,
            rol: "user"
        });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return { message: "Error al registrar usuario" };
    }
};

// MODIFICAR DATOS DE UN USUARIO
const updateUser = async (newUser, email) => {
    try {
        const updated = await User.update(newUser, { where: { email: email } });
        return updated[0] ? "Usuario actualizado correctamente" : "No se encontró el usuario";
    } catch (error) {
        console.error("Error actualizando usuario:", error);
        throw error;
    }
};

// MODIFICAR ROL USUARIO
const updateRolUser = async (rol, email) => {
    try {
        const updated = await Usuario.update({rol: rol}, { where: { email: email } });
        return updated[0] ? "Usuario actualizado correctamente" : "No se encontró el usuario";
    } catch (error) {
        console.error("Error actualizando usuario:", error);
        throw error;
    }
};

// MODIFICAR CONTRASEÑA DE UN USUARIO LOGUEADO
const updatePassUser = async (newPassword, email) => {
    try {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        const updated = await Usuario.update({ password: hashedPassword }, { where: { email } });
        return updated[0] ? "Contraseña actualizada correctamente" : "No se encontró el usuario";
    } catch (error) {
        console.error("Error actualizando contraseña:", error);
        throw error;
    }
};

// MODIFICAR CONTRASEÑA DE UN USUARIO SIN LOGUEAR
// const updatePassUserLog = async (newPassword, email_user) => {
//     return await updatePassUser(newPassword, email_user);
// };

// ELIMINAR UN USUARIO
const removeUsuario = async (email) => {
    try {
        const deleted = await Usuario.destroy({ where: {email: email} });
        return deleted ? "Usuario eliminado correctamente" : "No se encontró el usuario";
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        throw error;
    }
};

module.exports = {
    getAllUsers,
    getUnUserEmail,
    register,
    login,
    updateUser,
    updateRolUser,
    updatePassUser,
    removeUsuario,
};