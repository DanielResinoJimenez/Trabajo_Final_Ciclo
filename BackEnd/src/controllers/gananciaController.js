const Service = require('../services/gananciaService');

// Obtener todas las máquinas

const getAllGanancias = async (req, res) => {
    try {
        const maquinas = await Service.getAllGanancias();
        res.status(200).json(maquinas);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Crear una nueva máquina

const createGanancia = async (req, res) => {
    try {
        const body = req.body;
        const ganancia = await Service.createGanancia(body);
        res.status(201).json(ganancia);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Modificar una máquina

const putGanancia = async (req, res) => {
    try {
        const { id_ganancia } = req.params;
        const newGanancia = req.body;
        const updated = await Service.putGanancia(newGanancia, id_ganancia);
        res.status(200).send(updated);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

//

const deleteGanancia = async (req, res) => {
    try {
        const { id_ganancia } = req.params;
        const deleted = await Service.deleteGanancia(id_ganancia);
        res.status(200).send(deleted);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllMaquinas,
    createGanancia,
    putGanancia,
    deleteGanancia
}