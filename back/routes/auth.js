const express = require("express");
const { registroUsuario } = require("../controllers/authControllers");
const router = express.Router();

router.route('/usuario/registro').post(registroUsuario);

module.exports = router;