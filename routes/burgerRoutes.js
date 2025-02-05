const express = require("express");
const burgerController = require("../controller/burgerController");
const router = express.Router();
const upload = require("../utils/multerStorage");

router
  .route("/")
  .get(burgerController.fetchBurger)
  .post(upload.single("image"), burgerController.createBurger);

router
  .route("/:id")
  .get(burgerController.fetchBurgerById)
  .patch(burgerController.updateBurger);

module.exports = router;
