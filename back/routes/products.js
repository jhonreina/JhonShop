const express = require("express");
const router = express.Router();
const { getProducts, newProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/productsController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

//traemos la respuesta json desde el controlador
//establecemos desde que ruta queremos ver el getproducts
router.route('/productos').get(getProducts)
router.route('/producto/nuevo').post(isAuthenticateUser, authorizeRoles("admin"), newProduct)//Establecemos ruta
router.route('/producto/:id').get(getProductById);//ruta para consultar ID 
router.route('/producto/:id').put(isAuthenticateUser, authorizeRoles("admin"),updateProduct);//creacion de la ruta de actualizacion
router.route('/producto/:id').delete(isAuthenticateUser, authorizeRoles("admin"),deleteProduct);//creacion de la ruta de eliminacion

module.exports = router;

