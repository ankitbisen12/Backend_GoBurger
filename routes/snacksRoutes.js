const express = require("express");
const snacksController = require("../controller/snacksController");
const router = express.Router();
const upload = require("../utils/multerStorage");

router
  .route("/")
  .get(snacksController.fetchSnacks)
  .post(upload.single("image"), snacksController.createSnack);

router
  .route("/:id")
  .get(snacksController.fetchSnackById)
  .patch(snacksController.updateSnack);

module.exports = router;
