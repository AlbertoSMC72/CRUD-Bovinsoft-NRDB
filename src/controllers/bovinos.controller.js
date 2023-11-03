const bovinoModelo = require('../models/bovino.modelo');

/* todas las vacas QUE NO TINEN BORRADO LOGICO */
const index = async (req, res) => {
    try {
        const {page, limit} = req.query;
        const skip = (page - 1) * limit;

        const bovino = req.bovino;

        const bovinos = await find({deleted: false}).skip(skip).limit(limit);
        
        let response = {
            message: "se obtuvieron los bovinos correctamente",
            data: bovinos
        }

        if (page && limit) {
            const totalBovinos = await countDocuments({deleted: false});
            const totalPages =  Math.ceil(totalBovinos / limit);
            const currentPage = parseInt(page);

            response = {
                ...response,
                total: totalBovinos,
                totalPages,
                currentPage,
            }
        }

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener los usuarios",
            error: error.message
        });
        
    }
}

/* una vaca */
const obtenerID = async (req, res) => {
    try {
        const bovinoId = req.params.id;
        const bovino = await findById(bovinoId);

        if (!bovino) {
            return res.status(404).json({
                message: "bovino no encontrado"
            });
        }

        return res.status(200).json({
            message: "bovino obtenido exitosamente",
            bovino
        })

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener el bovino",
            error: error.message
        });
    }
}

/* crear vaca */
const crearBovino = async (req, res) => {
    try {
        const bovino = req.body;
        const bovinoCreado = await create(bovino);

        return res.status(201).json({
            message: "bovino creado exitosamente",
            bovinoCreado
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al crear el bovino",
            error: error.message
        });
    }
}

/* actualizacion parcial de la vaca (provablemente el que usemos mas) */
const actualizacionParcial = async (req, res) => {
    try {
        const bovinoId = req.params.id;
        const datosActualizar = {
            ...req.body,
            updated_at: new Date()
        }

        const bovinoActualizado = await findByIdAndUpdate(bovinoId, datosActualizar);
        
        if (!bovinoActualizado) {
            return res.status(404).json({
                message: "bovino no encontrado"
            });
        }

        return res.status(200).json({
            message: "bovino actualizado correctamente",
            bovinoActualizado
        });

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al actualizar el bovino",
            error: error.message
        });
    }
}

/* eliminar Logico */
const eliminadoLogico = async (req, res) => {
    try {
        const bovinoId = req.params.id;
        const bovinoEliminado = await findByIdAndUpdate(bovinoId, {deleted: true, deleted_at: new Date()});

        if (!bovinoEliminado) {
            return res.status(404).json({
                message: "bovino no encontrado"
            });
        }

        return res.status(200).json({
            message: "bovino eliminado correctamente",
            bovinoEliminado
        });

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al eliminar el bovino",
            error: error.message
        });
    }
}

/* eliminar literal */
const eliminadoLinteral = async (req, res) => {
    try {
        const bovinoId = req.params.id;
        const bovinoEliminado=await findByIdAndDelete(bovinoId)

        if (!bovinoEliminado) {
            return res.status(404).json({
                message: "bovino no encontrado"
            });
        }

        return res.status(200).json({
            message: "bovino eliminado correctamente",
            bovinoEliminado
        });

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al eliminar el bovino",
            error: error.message
        });
    }
}

/* para poder usar esto es mucho pedo desde front tambien */
/* es para obtener todos los bovinos que tengan ciertas estados */
const obtenerBovinosFiltrados = async (req, res) => {
    try {
        const { switchTipo, switchEstado, switchEdad } = req.query;

        const filtro = { deleted: false };

        // Filtro por Tipo (Toros, Vacas, Todas)
        if (switchTipo === "Toros") {
            filtro.genero = "Toro";
        } else if (switchTipo === "Vacas") {
            filtro.genero = "Vaca";
        } /* else if (switchTipo === "Todas") {
            filtro.$or = [{ genero: "Toro" }, { genero: "Vaca" }];
        }
        borrado temportalmente por si acaso
*/

        // Filtro por Estado (Enferma, Favorito, FueraDeFinca, Cargada, etc.)
        const estadosFiltrados = [];
        if (Array.isArray(switchEstado)) {
            switchEstado.forEach((estado) => {
                estadosFiltrados.push({ Titulo: estado });
            });
        } else if (switchEstado) {
            estadosFiltrados.push({ Titulo: switchEstado });
        }

        if (estadosFiltrados.length > 0) {
            filtro.$or = estadosFiltrados;
        }

        // Filtro por Edad
        if (switchEdad === "Joven") {
            const fechaJoven = new Date();
            fechaJoven.setFullYear(fechaJoven.getFullYear() - 2);
            filtro.fechaNacimiento = { $gt: fechaJoven };
        } else if (switchEdad === "Adulto") {
            const fechaAdulto = new Date();
            fechaAdulto.setFullYear(fechaAdulto.getFullYear() - 2);
            filtro.fechaNacimiento = { $lte: fechaAdulto, $gt: new Date() };
        } else if (switchEdad === "Viejo") {
            const fechaViejo = new Date();
            fechaViejo.setFullYear(fechaViejo.getFullYear() - 5);
            filtro.fechaNacimiento = { $lte: fechaViejo };
        }

        const bovinos = await bovinoModelo.find(filtro);

        if (bovinos.length === 0) {
            return res.status(404).json({ message: "No se encontraron bovinos con los filtros seleccionados." });
        }

        res.status(200).json({ message: "Se obtuvieron los bovinos correctamente", data: bovinos });
    } catch (error) {
        res.status(500).json({
            message: "Ocurrió un error al obtener los bovinos con los filtros seleccionados",
            error: error.message,
        });
    }
};

// Consulta para buscar todos los eventos relacionados con un bovino
const obtenerEventosDeBovino = async (req, res) => {
    const bovinoId = req.params.idBovino;
    try {
        const eventos = await find({ idBovino: bovinoId, deleted: false });
        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrió un error al obtener los eventos del bovino', error: error.message });
    }
}

module.exports = {
    index,
    obtenerID,
    crearBovino,
    actualizacionParcial,
    eliminadoLogico,
    eliminadoLinteral,
    obtenerBovinosFiltrados,
    obtenerEventosDeBovino,
};