const express = require("express");
const router = express.Router();
const { newOrder, getOneOrder, myOrders, allOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticateUser, newOrder);
router.route("/order/:id").get(isAuthenticateUser, getOneOrder);
router.route("/orders/youOrders").get(isAuthenticateUser, myOrders);


//rutas de admin
router.route("/admin/Orders").get(isAuthenticateUser, authorizeRoles("admin"), allOrders);
router.route("/admin/Orders/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateOrder);
router.route("/admin/deleteOrders/:id").delete(isAuthenticateUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;