const express = require("express");
const mealController = require("../controller/mealController");
const upload = require("../utils/multerStorage");

const router = express.Router();
router
  .route("/")
  .get(mealController.fetchMeal)
  .post(upload.single("image"), mealController.createMeal);

router
  .route("/:id")
  .get(mealController.fetchMealById)
  .patch(mealController.updateMeal);

module.exports = router;
