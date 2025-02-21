const express = require("express");
const burgerMealController = require("../controller/burgerMealController");
const upload = require("../utils/multerStorage");

const router = express.Router();
router
  .route("/")
  .get(burgerMealController.fetchBurgerMeal)
  .post(upload.single("image"), burgerMealController.createBurgerMeal);

router
  .route("/:id")
  .get(burgerMealController.fetchBurgerMealById)
  .patch(burgerMealController.updateBurgerMeal);

module.exports = router;
