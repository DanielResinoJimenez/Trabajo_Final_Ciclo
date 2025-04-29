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
const getSolicitudExistente = async (req, res) => {
    try {
        const solicitudes = await Service.getSolicitudExistente(req.body);
        res.status(200).json(solicitudes);
    } catch (error) {
        console.error("Error en getSolicitudExistente:", error);
        res.status(500).json({ message: "Error al obtener las solicitudes" });
    }
}

// Obtener PDF por ID de solicitud
const getSolicitudPDF = async (req, res) => {
    const { id } = req.params;

    try {
        const solicitud = await Service.getSolicitudById(id);

        if (!solicitud || !solicitud.documento) {
            return res.status(404).json({ message: "Documento no encontrado." });
        }

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="solicitud.pdf"', // cambia a 'attachment;' si quieres forzar descarga
        });

        res.send(solicitud.documento);
    } catch (error) {
        console.error("Error obteniendo el PDF:", error);
        res.status(500).json({ message: "Error al obtener el PDF" });
    }
};

// Crear una nueva solicitud
const createSolicitud = async (req, res) => {
    try {
        const { body } = req;

        // Crear el PDF
        const doc = new PDFDocument();
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', async () => {
            const pdfBuffer = Buffer.concat(buffers);

            const solicitudData = {
                ...body,
                documento: pdfBuffer, // Aquí metes el PDF generado
            };

            const solicitud = await Service.createSolicitud(solicitudData);
            res.status(201).json(solicitud);
        });

        doc.fontSize(18).text('Solicitud de máquina', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Nombre solicitante: ${body.nombre_solicitante}`);
        doc.text(`Dirección: ${body.direccion_establecimiento}`);
        doc.text(`Teléfono: ${body.telefono_solicitante}`);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`);

        doc.end(); 

    } catch (error) {
        console.error("Error creando la solicitud:", error);
        res.status(500).json({ message: "Error al crear la solicitud" });
    }
};

// Actualizar una solicitud
const updateSolicitud = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
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
    const { id } = req.params;
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
    deleteSolicitud,
    getSolicitudPDF
};