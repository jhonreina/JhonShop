const express = require("express");
const app = express();
const errorMiddlewere= require("./middleware/errors")
const cookieParse = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload= require('express-fileupload')

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

// Middlewere para menejar errores
app.use(errorMiddlewere)

module.exports = app