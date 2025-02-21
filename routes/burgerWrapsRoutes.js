const express = require("express");
const burgerWrapsController = require("../controller/burgerWrapsController");
const upload = require("../utils/multerStorage");

const router = express.Router();
router
  .route("/")
  .get(burgerWrapsController.fetchBurgerWraps)
  .post(upload.single("image"), burgerWrapsController.createBurgerWrap);

router
  .route("/:id")
  .get(burgerWrapsController.fetchBurgerWrapById)
  .post(burgerWrapsController.updateBurgerWrap);

module.exports = router;
