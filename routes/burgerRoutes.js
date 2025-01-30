const express = require("mongoose");
const burgerController = require("../controller/burgerController");

const router = express.Router();

router
  .route("/")
  .get(burgerController.fetchBurger)
  .post(burgerController.createBurger);

router
  .route("/:id")
  .get(burgerController.fetchBurgerById)
  .patch(burgerController.updateBurger);

module.exports = router;
