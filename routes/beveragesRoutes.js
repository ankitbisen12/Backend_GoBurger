const express = require("express");
const beverageController = require("../controller/beverageController");
const router = express.Router();
const upload = require("../utils/multerStorage");

router
  .route("/")
  .get(beverageController.fetchBeverages)
  .post(upload.single("image"), beverageController.createBeverage);

router
  .route("/:id")
  .get(beverageController.fetchBeverageById)
  .patch(beverageController.updateBeverage);

module.exports = router;
