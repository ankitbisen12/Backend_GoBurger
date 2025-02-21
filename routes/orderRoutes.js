const express = require("express");
const orderController = require("../controller/orderController");

const router = express.Router();
router
  .route("/")
  .get(orderController.fetchAllOrders)
  .post(orderController.createOrder);

router.route("/own").get(orderController.fetchOrderByUserId);

router
  .route("/:id")
  .delete(orderController.deletOrder)
  .patch(orderController.updateOrder);

module.exports = router;
