const express = require("express");
const router = express.Router();
const { getProducts, newProduct, getProductById, updateProduct } = require("../controllers/productsController");

//traemos la respuesta json desde el controlador
//establecemos desde que ruta queremos ver el getproducts
router.route('/productos').get(getProducts)
router.route('/producto/nuevo').post(newProduct)//Establecemos ruta
router.route('/producto/:id').get(getProductById);//ruta para consultar ID 
router.route('/producto/:id').put(updateProduct);//creacion de la ruta de actualizacion

module.exports = router;

