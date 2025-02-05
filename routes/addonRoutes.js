const express = require("express");
const addonController = require("../controller/addonController");
const router = express.Router();
const upload = require("../utils/multerStorage");

router
  .route("/")
  .get(addonController.fetchAddon)
  .post(upload.single("image"), addonController.createAddon);

router
  .route("/:id")
  .get(addonController.fetchAddonById)
  .patch(addonController.updateAddon);

module.exports = router;
