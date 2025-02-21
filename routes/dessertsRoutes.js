const express = require("express");
const dessertController = require("../controller/dessertsController");
const upload = require("../utils/multerStorage");

const router = express.Router();
router
  .route("/")
  .get(dessertController.fetchDesserts)
  .post(upload.single("image"), dessertController.createdesserts);

router
  .route("/")
  .get(dessertController.fetchdessertsById)
  .patch(dessertController.updatedesserts);

module.exports = router;
