const { Schema, model } = require('mongoose');

const bovinoSchema = Schema({
    Siniiga: {
        type: String,
        required: true,
    },
    areteBovino: {
        type: String,
        required: true,
    },
    idVaca: {
        type: String,
        required: true,
    },
    idToro: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    raza: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    lugarMarca: {
        type: String,
        required: true,
    },
    fotoBovino: {
        type: String,
        required: true,
    },
    fotoPedire: {
        type: String,
        required: true,
    },
    /* creado por este administrador */
    created_by: {
        type: Schema.Types.ObjectId, // Cambiar a ObjectId si es una referencia a usuario
        ref: 'Usuario', // Cambiar a la colección de usuarios correcta
        required: true,
    },
    /* creado en esta fecha */
    created_at: {
        type: Date,
        required: false,
        default: new Date()
    },
    /* si se modificó algún dato se guarda qué día se actualizó */
    updated_at: {
        type: Date,
        required: false,
        default: null
    },
    /* borrado lógico */
    deleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    /* fecha de borrado se guarda qué día se actualizó */
    deleted_at: {
        type: Date,
        required: false,
        default: null,
    },
});

module.exports = model('Bovino', bovinoSchema);
