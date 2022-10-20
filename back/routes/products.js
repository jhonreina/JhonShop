const express = require("express");
const router = express.Router();
const { getProducts, newProduct } = require("../controllers/productsController");

//traemos la respuesta json desde el controlador
//establecemos desde que ruta queremos ver el getproducts
router.route('/productos').get(getProducts)
router.route('/producto/nuevo').post(newProduct)

module.exports = router;

