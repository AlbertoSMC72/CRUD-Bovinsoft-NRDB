const estadosModelo = require('../models/estadosBovino.modelo');

const index = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;

        const estados = await estadosModelo.find({ deleted: false }).skip(skip).limit(limit);

        let response = {
            message: "Se obtuvieron los estados correctamente",
            data: estados
        }

        if (page && limit) {
            const totalEstados = await estadosModelo.countDocuments({ deleted: false });
            const totalPages = Math.ceil(totalEstados / limit);
            const currentPage = parseInt(page);

            response = {
                ...response,
                total: totalEstados,
                totalPages,
                currentPage,
            }
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: "Ocurrió un error al obtener los estados",
            error: error.message
        });
    }
}

const obtenerEstadosBovino = async (req, res) => {
    const idVaca = req.params.idVaca;

    try {
        const estados = await estadosModelo.find({ idBovino: idVaca, deleted: false });

        if (estados.length === 0) {
            return res.status(404).json({ message: "No se encontraron estados para esta vaca." });
        }

        res.status(200).json({ message: "Se obtuvieron los estados correctamente", data: estados });
    } catch (error) {
        res.status(500).json({
            message: "Ocurrió un error al obtener los estados de la vaca",
            error: error.message,
        });
    }
}

const obtenerEstadosTitulo = async (req, res) => {
    const titulo = req.params.titulo;

    try {
        const estados = await estadosModelo.find({ Titulo: titulo, deleted: false });

        if (estados.length === 0) {
            return res.status(404).json({ message: "No se encontraron estados con este título." });
        }

        res.status(200).json({ message: "Se obtuvieron los estados correctamente", data: estados });
    } catch (error) {
        res.status(500).json({
            message: "Ocurrió un error al obtener los estados con este título",
            error: error.message,
        });
    }
};

const obtenerEstadoPorId = async (req, res) => {
    const idEstado = req.params.idEstado;

    try {
        const estado = await estadosModelo.findById(idEstado);

        if (!estado) {
            return res.status(404).json({ message: "No se encontró el estado con el ID proporcionado." });
        }

        res.status(200).json({ message: "Se obtuvo el estado correctamente", data: estado });
    } catch (error) {
        res.status(500).json({
            message: "Ocurrió un error al obtener el estado por su ID",
            error: error.message,
        });
    }
};

const crearEstado = async (req, res) => {
    try {
        const estado = req.body;
        const estadoCreado = await estadosModelo.create(estado);

        return res.status(201).json({
            message: "Se creó el estado correctamente",
            data: estadoCreado,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al crear el estado",
            error: error.message,
        });
    }
};

const eliminadoLinteral = async (req, res) => {
    const idEstado = req.params.idEstado;

    try {
        const estado = await estadosModelo.findByIdAndDelete(idEstado);

        if (!estado) {
            return res.status(404).json({ message: "No se encontró el estado con el ID proporcionado." });
        }

        res.status(200).json({ message: "Se eliminó el estado correctamente", data: estado });
    } catch (error) {
        res.status(500).json({
            message: "Ocurrió un error al eliminar el estado por su ID",
            error: error.message,
        });
    }
}

// Exporta las funciones del controlador
module.exports = {
    index,
    obtenerEstadosBovino,
    obtenerEstadosTitulo,
    obtenerEstadoPorId,
    eliminadoLinteral,
    crearEstado
};
