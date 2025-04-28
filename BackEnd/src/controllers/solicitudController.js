const Service = require('../services/solicitudService');

// Obtener todas las solicitudes
const getAllSolicitudes = async (req, res) => {
    try {
        const solicitudes = await Service.getAllSolicitudes();
        res.status(200).json(solicitudes);
    } catch (error) {
        console.error("Error en getAllSolicitudes:", error);
        res.status(500).json({ message: "Error al obtener las solicitudes" });
    }
};

// Obtener todas las solicitudes
const getSolicitudesPendientes = async (req, res) => {
    try {
        const solicitudes = await Service.getSolicitudesPendientes();
        res.status(200).json(solicitudes);
    } catch (error) {
        console.error("Error en getSolicitudesPendientes:", error);
        res.status(500).json({ message: "Error al obtener las solicitudes" });
    }
};

// Obtener todas las solicitudes
const getSolicitudesDenegadas = async (req, res) => {
    try {
        const solicitudes = await Service.getSolicitudesDenegadas();
        res.status(200).json(solicitudes);
    } catch (error) {
        console.error("Error en getSolicitudesDenegadas:", error);
        res.status(500).json({ message: "Error al obtener las solicitudes" });
    }
};

// Obtener solicitud existente
const getSolicitudExistente = async(req, res) => {
    try {
        const solicitudes = await Service.getSolicitudExistente(req.body);
        res.status(200).json(solicitudes);
    } catch (error) {
        console.error("Error en getSolicitudExistente:", error);
        res.status(500).json({ message: "Error al obtener las solicitudes" });
    }
}

// Crear una nueva solicitud
const createSolicitud = async (req, res) => {
    try {
        const solicitud = await Service.createSolicitud(req.body);
        res.status(201).json(solicitud);
    } catch (error) {
        console.error("Error creando la solicitud:", error);
        res.status(500).json({ message: "Error al crear la solicitud" });
    }
};

// Actualizar una solicitud
const updateSolicitud = async (req, res) => {
    const {id} = req.params;
    const {estado} = req.body;
    try {
        const updatedSolicitud = await Service.updateSolicitud(id, estado);
        res.status(200).json(updatedSolicitud);
    } catch (error) {
        console.error("Error actualizando la solicitud:", error);
        res.status(500).json({ message: "Error al actualizar la solicitud" });
    }
};

// Borrar una solicitud

const deleteSolicitud = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedSolicitud = await Service.deleteSolicitud(id);
        res.status(200).json(deletedSolicitud);
    } catch (error) {
        console.error("Error borrando la solicitud:", error);
        res.status(500).json({ message: "Error al borrar la solicitud" });
    }
}

// Exportar los controladores
module.exports = {
    getAllSolicitudes,
    createSolicitud,
    updateSolicitud,
    getSolicitudesPendientes,
    getSolicitudesDenegadas,
    getSolicitudExistente,
    deleteSolicitud
};