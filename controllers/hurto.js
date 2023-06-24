//Importar paquetes requeridos de node
const {response} = require('express')

//Importación de los modelos
const Hurto = require('../models/hurto') // la importación de modelos no se instancia con llaves para evitar errores

//Consultar
const hurtoGet = async(req, res = response) => {
    const {direccion} = req.query //Desestructurción

    //Consultar todos los usuarios
    const hurtos = await Hurto.find() // cuando algo es asincronico debe ejecutarse con await(espera)

    res.json({
        hurtos
    })
}

//Registrar o insertar
const hurtoPost = async(req,res = response) => {
    const body = req.body //Captura de atributos
    let mensaje = ''



    try {
        const hurto = new Hurto(body) //Instanciar el objeto


        // Validar latitud
        const latitudValor = parseFloat(hurto.latitud);
        if (latitudValor < 6.13 || latitudValor > 6.217) {
        return res.status(400).json({
            msg: 'La latitud está fuera del rango permitido (6.13 - 6.217)',
        });
        }

        // Validar longitud
        const longitudValor = parseFloat(hurto.longitud);
        if (longitudValor < -75.567 || longitudValor > -75.34) {
        return res.status(400).json({
            msg: 'La longitud está fuera del rango permitido (-75.567 - -75.34)',
        });
        }

        await hurto.save()
        mensaje = 'La inserción del hurto se realizó exitosamente'

    } catch (error) {
            if(error.name === 'ValidationError'){
                console.error(Object.values(error.errors).map(val => val.message))
                mensaje = Object.values(error.errors).map(val => val.message)
            } else {
                console.error('Ocurrió un error al guardar el hurto:', error.message);
                mensaje = 'Ocurrió un error al guardar el hurto';
            }
    }

    res.json({
        msg: mensaje
    })
}

//Modificar
const hurtoPut = async(req,res = response) => {
  
    const {nombre,direccion,latitud,longitud,descripcion,fecha} = req.body
    let mensaje = ''

    try {
        const hurto = await Hurto.findOneAndUpdate({direccion: direccion},{nombre:nombre, latitud: latitud,longitud: longitud, 
            descripcion: descripcion, fecha: fecha, direccion: direccion}) //Buscar por dirección y modificar
        mensaje = 'La modificación se realizo exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas en la modificación'
    }

    res.json({
        msg: mensaje
    })
}

//Eliminar
const hurtoDelete = async(req,res = response) => {
  
    const {_id} = req.body
    let mensaje = ''

    try {
        const hurto = await Hurto.deleteOne({_id: _id}) //Buscar por el id y eliminar el registro
        mensaje = 'La eliminación se realizo exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas en la eliminación'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    hurtoGet,
    hurtoPost,
    hurtoPut,
    hurtoDelete
}