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

            // Creamos el QR

            const pdfUrl = `https://localhost:3000/api/solicitudes/${solicitud.id_solicitud}/pdf`;

            const qrDataURL = await QRcode.toDataURL(pdfUrl);

            res.status(201).json({
                solicitud,
                qrCode: qrDataURL,
            });
        });

        // Contenido del PDF

        doc
            .fontSize(22)
            .fillColor('#2c3e50')
            .text('Formulario de Solicitud de Máquina', { align: 'center' })
            .moveDown(0.5);

        doc
            .strokeColor('#aaaaaa')
            .lineWidth(1)
            .moveTo(doc.page.margins.left, doc.y)
            .lineTo(doc.page.width - doc.page.margins.right, doc.y)
            .stroke()
            .moveDown();

        doc.fontSize(12).fillColor('black');

        const renderField = (label, value) => {
            doc.font('Helvetica-Bold').text(`${label}:`, { continued: true });
            doc.font('Helvetica').text(` ${value || 'N/A'}`);
        };

        renderField('Nombre del solicitante', body.nombre_solicitante);
        renderField('Dirección del establecimiento', body.direccion_establecimiento);
        renderField('Teléfono', body.telefono_solicitante);
        renderField('Fecha de solicitud', new Date(body.fecha_solicitud || Date.now()).toLocaleDateString());
        renderField('ID del Usuario', body.id_usuario);
        renderField('ID de la Máquina', body.id_maquina);
        renderField('Estado', body.estado);

        doc.moveDown(1.5);

        const pdfUrl = `https://localhost:3000/api/solicitudes/temp/pdf`;
        const qrImageBuffer = await QRcode.toBuffer(pdfUrl);

        doc.fontSize(12).text("Escanea el código QR para ver este documento en línea:", {
            align: 'center',
        });

        doc.moveDown(0.5);

        const qrSize = 150;
        const x = (doc.page.width - qrSize) / 2;

        doc.image(qrImageBuffer, x, doc.y, { width: qrSize });

        // === Pie de página ===
        doc.moveDown(2);
        doc.fontSize(10).fillColor('gray').text('Este documento fue generado automáticamente.', {
            align: 'center',
        });

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