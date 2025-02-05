const express = require("express");
const burgerMealController = require("../controller/burgerMealController");
const router = express.Router();
const upload = require("../utils/multerStorage");

router
  .route("/")
  .get(burgerMealController.fetchBurgerMeal)
  .post(upload.single("image"), burgerMealController.createBurgerMeal);

router
  .route("/:id")
  .get(burgerMealController.fetchBurgerMealById)
  .patch(burgerMealController.updateBurgerMeal);

module.exports = router;
