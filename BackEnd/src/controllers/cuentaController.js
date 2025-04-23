const Service = require('../services/cuentaService');

// Obtener todas las máquinas

const getAllCuentas = async (req, res) => {
    try {
        const cuentas = await Service.getAllCuentas();
        res.status(200).json(cuentas);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllCuentas,
    
}