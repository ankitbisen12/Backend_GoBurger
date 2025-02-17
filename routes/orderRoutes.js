const express = require("express");
const router = express.Router();
const orderController= require("../controller/orderController");

router.route("/").get(orderController.fetchAllOrders).post(orderController.createOrder);

router.route('/own').get(orderController.fetchOrderByUser);

router.route("/:id").delete(orderController.deletOrder).patch(orderController.updateOrder);

module.exports = router;