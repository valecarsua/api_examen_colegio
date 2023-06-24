const {Schema, model} = require('mongoose')

const HurtoSchema = Schema(
    {

        nombre: {
            type: String,
            required: [true, 'El campo nombre es requerido'],
        },
        direccion: {
            type: String,
            required: [true, 'El campo direccion es requerido'],
        },

        latitud: {
            type: Number,
            required: [true, 'El campo latitud es requerido'],
        },

        longitud: {
            type: Number,
            required: [true, 'El campo longitud es requerido'],
        },

        descripcion: {
            type: String,
            required: [true, 'El campo descripción es requerido'],
        },

        fecha: {
            type: Date,
            required: true,
            default: new Date()
        }
    }
)

module.exports = model('Hurto', HurtoSchema) //Exportar el modelo