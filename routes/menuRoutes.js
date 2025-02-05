const express = require("express");
const MenuController = require("../controller/menuController");
const router = express.Router();
const upload = require("../utils/multerStorage");

router
  .route("/")
  .get(MenuController.fetchMenu)
  .post(upload.single("image"), MenuController.createMenu);

router.route("/:id").patch(MenuController.updateMenu);

module.exports = router;
