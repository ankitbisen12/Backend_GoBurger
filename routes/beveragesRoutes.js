const express = require("express");
const beverageController = require("../controller/beverageController");
const upload = require("../utils/multerStorage");

const router = express.Router();
router
  .route("/")
  .get(beverageController.fetchBeverages)
  .post(upload.single("image"), beverageController.createBeverage);

router
  .route("/:id")
  .get(beverageController.fetchBeverageById)
  .patch(beverageController.updateBeverage);

module.exports = router;
