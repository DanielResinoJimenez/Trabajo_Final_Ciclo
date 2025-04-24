const Service = require('../services/perdidaService');

// Obtener todas las máquinas

const getAllPerdidas = async (req, res) => {
    try {
        const perdidas = await Service.getAllPerdidas();
        res.status(200).json(perdidas);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Crear una nueva máquina

const createPerdida = async (req, res) => {
    try {
        const body = req.body;
        const perdida = await Service.createPerdida(body);
        res.status(201).json(perdida);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Modificar una máquina

const putPerdida = async (req, res) => {
    try {
        const { id_perdida } = req.params;
        const newPerdida = req.body;
        const updated = await Service.putPerdida(newPerdida, id_perdida);
        res.status(200).send(updated);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

//

const deletePerdida = async (req, res) => {
    try {
        const { id_perdida } = req.params;
        const deleted = await Service.deletePerdida(id_perdida);
        res.status(200).send(deleted);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllMaquinas,
    createPerdida,
    putPerdida,
    deletePerdida
}