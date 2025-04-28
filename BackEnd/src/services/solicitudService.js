const { where } = require("sequelize");
const Solicitud = require("../database/models/Solicitud");

// Funciones de consultas en la base de datos.

// Obtener todas las solicitudes

const getAllSolicitudes = async () => {
    try {
        return await Solicitud.findAll();
    } catch (error) {
        console.log("Error en getAllSolicitudes:", error);
        throw error;
    }
}

// Obtener todas las solicitudes

const getSolicitudesPendientes = async () => {
    try {
        return await Solicitud.findAll({ where: { estado: "pendiente" } });
    } catch (error) {
        console.log("Error en getAllSolicitudes:", error);
        throw error;
    }
}

// Obtener todas las solicitudes

const getSolicitudesDenegadas = async () => {
    try {
        return await Solicitud.findAll({ where: { estado: "rechazada" } });
    } catch (error) {
        console.log("Error en getAllSolicitudes:", error);
        throw error;
    }
}

// Obtener solicitud por id_usuario e id_maquina

const getSolicitudExistente = async (solicitud) => {
    try {
        return await Solicitud.findAll({ where: { id_maquina: solicitud.id_maquina, id_usuario: solicitud.id_usuario } });
    } catch (error) {
        console.log("Error en getSolicitudExistente:", error);
        throw error;
    }
}

// Crear una nueva solicitud

const createSolicitud = async (body) => {
    try {
        return await Solicitud.create(body);
    } catch (error) {
        console.error("Error creando la solicitud:", error);
        throw error;
    }
};

const updateSolicitud = async (id_solicitud, estado) => {
    try {
        return await Solicitud.update({ estado: estado },          
            { where: { id_solicitud: id_solicitud } }) 
    } catch (error) {
        console.error("Error actualizando la solicitud:", error);
        throw error;
    }
}

// Exportar las funciones

module.exports = { getAllSolicitudes, createSolicitud, updateSolicitud, getSolicitudesPendientes, getSolicitudesDenegadas, getSolicitudExistente };  
