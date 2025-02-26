const express = require("express");
const addressController = require("../controller/AddressController");

const router = express.Router();

router
  .route("/")
  .get(addressController.fetchAddress)
  .post(addressController.addAddress);
router
  .route("/:id")
  .get(addressController.fetchAddressById)
  .patch(addressController.updateAddress);

module.exports = router;
