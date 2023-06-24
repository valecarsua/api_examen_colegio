const express = require('express')
const { dbConnection } = require('../database/config')//Si en el archivo config hago el exports con llaves aca tambien se llama con llaves
const cors = require('cors')//Implementar seguridad
const bodyParser = require('body-parser')//Recibir datos de formularios html

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT//capturando variabe
        this.hurtoPath = '/api/hurto'//ruta publica
        this.middlewares()
        this.routes()
        this.conectarDB()
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando por el puerto ${this.port}`)
        })
    }

    middlewares(){
        this.app.use(express.static(__dirname + "/public"));
        this.app.use(cors());
        this.app.use(bodyParser.json())
    }

    routes(){
        this.app.use(this.hurtoPath, require ('../routes/hurtos'))
    }

    async conectarDB(){ //async para trabajar de manera asincronica 
        await dbConnection() //Esperar la respuesta del servidor
    }
}

module.exports = { Server }