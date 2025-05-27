const Service = require('../services/solicitudService');
const PDFDocument = require('pdfkit');
const QRcode = require('qrcode');

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

// Crear una nueva solicitud
const createSolicitud = async (req, res) => {
    try {
        const { body } = req;
        const doc = new PDFDocument({ margin: 50 });
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', async () => {
            const pdfBuffer = Buffer.concat(buffers);

            const solicitudData = {
                ...body,
                documento: pdfBuffer,
            };

            const solicitud = await Service.createSolicitud(solicitudData);

            const pdfUrl = `https://localhost:3000/api/solicitudes/${solicitud.id_solicitud}/pdf`;
            const qrDataURL = await QRcode.toDataURL(pdfUrl);

            res.status(201).json({
                solicitud,
                qrCode: qrDataURL,
            });
        });

        // Encabezado
        doc
            .fontSize(14)
            .text('SOLICITUD', { align: 'center', underline: true })
            .fontSize(10)
            .moveDown(0.5)
            .text('PARA SOLICITAR SERVICIOS DE MÁQUINA', { align: 'center' })
            .moveDown(1)
            .fontSize(11)

        // Título de solicitud
        doc
            .fontSize(12)
            .text('SOLICITA: Servicios de máquina expendedora')
            .moveDown(1);

        // Dirigido a
        doc
            .fontSize(12)
            .text('Sr. David Resino')
            .text('Jefe de la Empresa MasCoffee')
            .moveDown(2);

        // Cuerpo de la solicitud
        const {
            nombre_solicitante,
            direccion_establecimiento,
            telefono_solicitante,
            fecha_solicitud,
        } = body;

        doc
            .text(`YO ${nombre_solicitante}, con telefono de contacto: ${telefono_solicitante}, en la dirección:`, { align: 'justify' })
            .text(`${direccion_establecimiento}, de Talavera de la Reina o alrededores,`, { align: 'justify' })
            .text(`Ante Ud. con el debido respeto me presento y expongo lo siguiente:`)
            .moveDown(1)
            .text(`Que, deseando obtener los servicios de la máquina solicitada, le SOLICITO a usted los servicios de la máquina expendedora de café, con el fin de poder ofrecer a mis clientes un servicio de calidad.`)
            .moveDown(2);

        // Lugar y fecha
        const date = new Date(fecha_solicitud || Date.now());
        const dia = date.getDate();
        const mes = date.toLocaleString('es-PE', { month: 'long' });
        const anio = date.getFullYear();

        doc
            .text(`Talavera de la reina, ${dia} de ${mes} del ${anio}`)
            .moveDown(4);

        // Firma
        doc
            .text('_____________________________', { align: 'center' })
            .text(`${nombre_solicitante}`, { align: 'center' });

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