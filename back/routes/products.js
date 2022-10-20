const express = require("express");
const router = express.Router();
//traemos la respuesta json desde el controlador
const {getProducts}=require("../controllers/productsController")
//establecemos desde que ruta queremos ver el getproducts
router.route('/productos').get(getProducts)

module.exports = router;