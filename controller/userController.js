const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const {userInfo }= require("../utils/common");

exports.fetchUserById = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);

  res.status(200).json(userInfo(user));
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const photoBase = req.file ? req.file.buffer.toString("base64") : null;
  const updatedData = { ...req.body };

  if (photoBase) {
    updatedData.avatar = photoBase;
  }

  const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  res.status(200).json(updatedUser);
});
