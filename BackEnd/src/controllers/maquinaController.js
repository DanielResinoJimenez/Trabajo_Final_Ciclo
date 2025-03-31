const Service = require('../services/maquinaService');

// Obtener todas las máquinas

const getAllMaquinas = async (req, res) => {
    try {
        const maquinas = await Service.getAllMaquinas();
        res.status(200).json(maquinas);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Obtener las máquinas en stock

const getMaquinasStock = async (req, res) => {
    try {
        const maquinas = await Service.getMaquinasStock();
        res.status(200).json(maquinas);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Obtener las máquinas por marca

const getMaquinaByMarca = async (req, res) => {
    try {
        const { marca } = req.params;
        const maquinas = await Service.getMaquinaByMarca(marca);
        res.status(200).json(maquinas);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Crear una nueva máquina

const createMaquina = async (req, res) => {
    try {
        const body = req.body;
        const maquina = await Service.createMaquina(body);
        res.status(201).json(maquina);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Crear la imagen de una máquina

const createMaquinaImagen = async (req, res) => {
    try {
        const imagenData = req.body;
        const maquina = await Service.createMaquinaImagen(imagenData);
        res.status(200).json(maquina);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Modificar una máquina

const putMaquina = async (req, res) => {
    try {
        const { id_maquina } = req.params;
        const newMaquina = req.body;
        const updated = await Service.putMaquina(newMaquina, id_maquina);
        res.status(200).send(updated);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

//

const deleteMaquina = async (req, res) => {
    try {
        const { id_maquina } = req.params;
        const deleted = await Service.deleteMaquina(id_maquina);
        res.status(200).send(deleted);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllMaquinas,
    getMaquinaByMarca,
    getMaquinasStock,
    createMaquina,
    createMaquinaImagen,
    putMaquina,
    deleteMaquina
}