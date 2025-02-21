const express = require("express");
const addonController = require("../controller/addonController");
const upload = require("../utils/multerStorage");

const router = express.Router();
router
  .route("/")
  .get(addonController.fetchAddon)
  .post(upload.single("image"), addonController.createAddon);

router
  .route("/:id")
  .get(addonController.fetchAddonById)
  .patch(addonController.updateAddon);

module.exports = router;
