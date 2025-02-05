const express = require("express");
const burgerWrapsController = require("../controller/burgerWrapsController");
const router = express.Router();
const upload = require("../utils/multerStorage");

router
  .route("/")
  .get(burgerWrapsController.fetchBurgerWraps)
  .post(upload.single("image"), burgerWrapsController.createBurgerWrap);

router
  .route("/:id")
  .get(burgerWrapsController.fetchBurgerWrapById)
  .post(burgerWrapsController.updateBurgerWrap);

module.exports = router;
