
const { Schema, model } = require('mongoose'); 

const eventosSchema = new Schema({
    idBovino: {
        type: Schema.Types.ObjectId, 
        ref: 'Bovino',
        required: true,
    },
    Titulo: {
        type: String,
        required: true,
    },
    Asunto : {
        type: String,
        required: true,
    },
    Descripcion: {
        type: String,
        required: false,
    },
    FechaFin: {
        type: Date,
        required: true,
    },
    Terminado: {
        type: Boolean,
        default: false,
        required: true,
    },
    /* creado por este administrador */
    created_by: {
        type: Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true,
    },
    /* creado en esta fecha */
    created_at: {
        type: Date,
        required: false,
        default: new Date()
    },
    /* si se modifico algun dato se guarda que dia se actulizo */
    updated_at: {
        type: Date,
        required: false,
        default: null
    },
    /* borrado logico */
    deleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    /* fecha de borrado se guarda que dia se actulizo */
    deleted_at: {
        type: Date,
        required: false,
        default: null,
    },
});

module.exports = model('Eventos', eventosSchema);