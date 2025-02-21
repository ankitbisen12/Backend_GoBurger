const express = require("express");
const snacksController = require("../controller/snacksController");
const upload = require("../utils/multerStorage");

const router = express.Router();
router
  .route("/")
  .get(snacksController.fetchSnacks)
  .post(upload.single("image"), snacksController.createSnack);

router
  .route("/:id")
  .get(snacksController.fetchSnackById)
  .patch(snacksController.updateSnack);

module.exports = router;
