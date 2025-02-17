const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchUserById = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);

  res.status(200).json({
    id: user.id,
    name: user.name,
    addresses: user.addresses,
    email: user.email,
    role: user.role,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(updatedUser);
});
