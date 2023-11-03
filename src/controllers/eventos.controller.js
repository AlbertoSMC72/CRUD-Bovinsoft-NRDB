const eventosModelo = require('../models/eventos.modelo');
const { crearEstado } = require('../controllers/estados.controller');

// Obtener todos los eventos
const obtenerTodos = async (req, res) => {
    try {
        const eventos = await eventosModelo.find({ deleted: false });
        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al obtener los eventos', error: error.message });
    }
}

// Obtener un evento por su ID
const obtenerEventoPorId = async (req, res) => {
    const eventoId = req.params.id;
    try {
        const evento = await eventosModelo.findById(eventoId);
        if (!evento) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        return res.status(200).json(evento);
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al obtener el evento', error: error.message });
    }
}

// Crear un nuevo evento
const crearEvento = async (req, res) => {
    const eventoData = req.body;
    try {
        const nuevoEvento = {
            idBovino: eventoData.idBovino,
            Titulo: eventoData.Titulo,
            Asunto: eventoData.Asunto,
            Descripcion: eventoData.Descripcion,
            FechaFin: new Date(),
            created_by: eventoData.created_by,
        };

        nuevoEvento.FechaFin.setMonth(nuevoEvento.FechaFin.getMonth() + 9);

        const eventoCreado = await eventosModelo.create(nuevoEvento);

        /* desde aqui se van a crear muchos estados del vovino, como aqui xd */
        if (eventoData.Asunto === "Cargada") {
            const nuevoEstado = {
                idBovino: eventoData.idBovino,
                Titulo: "Cargada",
                created_by: eventoData.created_by,
            };
            await crearEstado(nuevoEstado); /* función del controlador para crear el estado "Cargada" */
            return res.status(201).json({
                message: 'Evento y estado "Cargada" creados correctamente',
                evento: eventoCreado,
                estado: nuevoEstado,
            });
        }

        return res.status(201).json(eventoCreado);
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al crear el evento', error: error.message });
    }
}

// Actualizar un evento
const actualizarEvento = async (req, res) => {
    const eventoId = req.params.id;
    const datosActualizar = req.body;
    try {
        const eventoActualizado = await eventosModelo.findByIdAndUpdate(eventoId, datosActualizar, { new: true });
        if (!eventoActualizado) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        return res.status(200).json(eventoActualizado);
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al actualizar el evento', error: error.message });
    }
}

// Borrado lógico de un evento
const eliminadoLogico = async (req, res) => {
    const eventoId = req.params.id;
    try {
        const eventoEliminado = await eventosModelo.findByIdAndUpdate(eventoId, { deleted: true, deleted_at: new Date() });
        if (!eventoEliminado) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        return res.status(200).json({ message: 'Evento eliminado correctamente', data: eventoEliminado });
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al eliminar el evento', error: error.message });
    }
}

// Eliminar permanentemente un evento
const eliminarEvento = async (req, res) => {
    const eventoId = req.params.id;
    try {
        const eventoEliminado = await eventosModelo.findByIdAndRemove(eventoId);
        if (!eventoEliminado) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        return res.status(200).json({ message: 'Evento eliminado permanentemente', data: eventoEliminado });
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al eliminar el evento', error: error.message });
    }
}

const obtenerEventosNoPasados = async (req, res) => {
    try {
        const fechaActual = new Date();
        const eventos = await eventosModelo.find({ FechaFin: { $gte: fechaActual } });

        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error al obtener los eventos que no han pasado FechaFin',
            error: error.message,
        });
    }
}

const obtenerEventos2Semanas = async (req, res) => {
    try {
        const fechaActual = new Date();
        const dosSemanasDespues = moment(fechaActual).add(2, 'weeks').toDate();
        const eventos = await eventosModelo.find({ FechaFin: { $gte: fechaActual, $lte: dosSemanasDespues } });

        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error al obtener los eventos con menos de 2 semanas para FechaFin',
            error: error.message,
        });
    }
}

const obtenerEventosNoTerminados = async (req, res) => {
    try {
        const eventos = await eventosModelo.find({ Terminado: false });

        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error al obtener los eventos no terminados',
            error: error.message,
        });
    }
}

const obtenerEventosTerminados = async (req, res) => {
    try {
        const eventos = await eventosModelo.find({ Terminado: true });

        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error al obtener los eventos terminados',
            error: error.message,
        });
    }
}

module.exports = {
    obtenerTodos,
    obtenerEventoPorId,
    crearEvento,
    actualizarEvento,
    eliminadoLogico,
    eliminarEvento,
    obtenerEventosNoPasados,
    obtenerEventos2Semanas,
    obtenerEventosNoTerminados,
    obtenerEventosTerminados,
};
