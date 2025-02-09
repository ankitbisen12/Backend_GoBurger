const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController  = require("../controller/userController");

router.route("/own").get(userController.fetchUserById);

router.route("/:id").post(userController.updateUser);

module.exports = router;