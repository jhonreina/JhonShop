const express = require("express");
const app = express();
const errorMiddlewere= require("./middleware/errors")

app.use(express.json());

// importar rutas
const productos = require("./routes/products");
const usuarios = require("./routes/auth");

app.use('/api',productos) //sujeto a decision (ruta del nevegador)
app.use('/api', usuarios) 

// Middlewere para menejar errores
app.use(errorMiddlewere)

module.exports = app