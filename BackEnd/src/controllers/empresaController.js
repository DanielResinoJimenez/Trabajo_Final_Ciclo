const Service = require('../services/empresaService');

// Obtener todas las máquinas

const getAllEmpresas = async (req, res) => {
    try {
        const empresas = await Service.getAllEmpresas();
        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getOneEmpresa = async (req, res) => {
    try {
        const empresa = await Service.getOneEmpresa(req.params.email);
        res.status(200).json(empresa);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllEmpresas,
    getOneEmpresa
}