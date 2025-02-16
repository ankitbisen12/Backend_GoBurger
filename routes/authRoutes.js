const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controller/authController");

router.route("/signup").post(authController.creatUser);

router
  .route("/login")
  .post(passport.authenticate("local"), authController.loginUser);


router.route("/logout").get(authController.logOut);

router
  .route("/check")
  .get(passport.authenticate("jwt"), authController.checkAuth);

module.exports = router;
