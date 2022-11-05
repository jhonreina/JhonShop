const express = require("express");
const { registroUsuario, loginUser, logOut, forgotPassword, resetPassword } = require("../controllers/authControllers");
const { isAuthenticateUser } = require("../middleware/auth");
const router = express.Router();

router.route('/usuario/registro').post(registroUsuario);
router.route('/login').get(loginUser);
router.route('/logout').get(isAuthenticateUser, logOut);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').post(resetPassword);

module.exports = router;