const express = require("express");
const app = express();
const errorMiddlewere= require("./middleware/errors")
const cookieParse=require('cookie-parser')

//uso de constantes impoetadas
app.use(express.json());
app.use(cookieParse());

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