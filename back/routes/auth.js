const express = require("express");
const { registroUsuario, loginUser, logOut, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, getAllUsers, getUserDetails, upDateUser, deleteUser } = require("../controllers/authControllers");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route('/usuario/registro').post(registroUsuario);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticateUser, logOut);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').post(resetPassword);
router.route('/userLogin').get(isAuthenticateUser, getUserProfile);
router.route('/userLogin/updatePassword').put(isAuthenticateUser, updatePassword)
router.route('/userLogin/updateProfile').put(isAuthenticateUser, updateProfile)

//rutas ADMIN
router.route('/admin/allUsers').get(isAuthenticateUser, authorizeRoles("admin"), getAllUsers)
router.route('/admin/user/:id').get(isAuthenticateUser, authorizeRoles("admin"), getUserDetails)
router.route('/admin/updateUser/:id').put(isAuthenticateUser, authorizeRoles("admin"), upDateUser)
router.route('/admin/deleteUser/:id').delete(isAuthenticateUser, authorizeRoles("admin"), deleteUser)


module.exports = router;