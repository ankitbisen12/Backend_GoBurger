const express = require("express");
const FAQSupportController = require("../controller/FAqSuppportController");

const router = express.Router();
router
  .route("/")
  .get(FAQSupportController.fetchFaqSupport)
  .post(FAQSupportController.createFaqSupport);

module.exports = router;
