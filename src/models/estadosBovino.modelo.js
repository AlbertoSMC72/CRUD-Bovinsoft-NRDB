
const { Schema, model } = require('mongoose'); 

const estadosSchema = new Schema({
    idBovino: {
        type: Schema.Types.ObjectId, 
        ref: 'Bovino',
        required: true,
    },
    Titulo: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        required: false,
        default: false
    },
    created_by: {
        type: Schema.Types.ObjectId, // Cambiar a ObjectId si es una referencia a usuario
        ref: 'Usuario', // Cambiar a la colección de usuarios correcta
        required: true,
    },
    created_at: {
        type: Date,
        required: false,
        default: new Date()
    },
});

module.exports = model('Estados', estadosSchema); 
