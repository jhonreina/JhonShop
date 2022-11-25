const express = require("express");
const app = express();
const errorMiddlewere= require("./middleware/errors")
const cookieParse = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

//configurar un archivo file
if (process.env.NODE_ENV==="PRODUCTION")require("dotenv").config(({path:'back/config/config.env'})) 
    


//uso de constantes impoetadas
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParse());
app.use(fileUpload());


// importar rutas
const productos = require("./routes/products");
const usuarios = require("./routes/auth");
const ordenes = require("./routes/orders");

app.use('/api',productos) //sujeto a decision (ruta del nevegador)
app.use('/api', usuarios) 
app.use('/api', ordenes)

if (process.env.NODE_ENV==="PRODUCTION") {
    app.use(express.static(path.join(__dirname,'../front/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'../front/build/index.html'))
    })
}

// Middlewere para menejar errores
app.use(errorMiddlewere)

module.exports = app