const express = require("express");
const cartController = require("../controller/cartcontroller");
const router = express.Router();

router
  .route("/")
  .get(cartController.fetchCartByUser)
  .post(cartController.addToCart);

router
  .route("/:id")
  .delete(cartController.deleteFromCart)
  .patch(cartController.updateCart);

module.exports = router;
