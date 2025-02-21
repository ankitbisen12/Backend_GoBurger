const express = require("express");
const passport = require("passport");
const userController = require("../controller/userController");

const router = express.Router();
router.route("/own").get(userController.fetchUserById);
router.route("/:id").post(userController.updateUser);

module.exports = router;
