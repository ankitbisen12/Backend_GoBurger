const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const User = require("../models/UserModel");
const { sanitizeUser } = require("../utils/common");
const jwt = require("jsonwebtoken");

exports.creatUser = catchAsync(async (req, res, next) => {
  const salt = crypto.randomBytes(16);
  const photoBase = req.file ? req.file.buffer.toString("base64") : null;

  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      const newUser = await User.create({
        ...req.body,
        avatar: photoBase,
        password: hashedPassword,
        salt,
      });

      req.login(sanitizeUser(newUser), function (err) {
        if (err) {
          res.send(400).json(err);
        } else {
          const token = jwt.sign(sanitizeUser(newUser), process.env.SECRET_KEY);
          res.status(200).json(sanitizeUser(newUser));
        }
      });
    }
  );
});

exports.loginUser = catchAsync(async (req, res, next) => {
  console.log("Request reached");
  const user = req.user;

  const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KEY, {
    expiresIn: "30d", //optional
  });

  res.status(201).json({
    user: sanitizeUser(user),
    token, //send token to client
  });
});

//logic for checking user is already logged in when app refreshed or closed for some time.
exports.checkAuth = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.sendStatus(401); //Unauthorized if token is missing
  }

  const token = req.headers.authorization.split(" ")[1];
  // console.log("Token inside authController", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password -salt");

    if (!user) {
      res.sendStatus(401);
      console.log("User not found");
    } else {
      res.status(200).json(sanitizeUser(user));
    }
  } catch (error) {
    res.sendStatus(401);
  }
});

exports.logOut = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "Success",
    message: "User successfully logged out.",
  });
});
