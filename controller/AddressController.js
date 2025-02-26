const Address = require("../models/AddressModel");
const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");

exports.addAddress = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const newAddress = await Address.create({ userId: id, ...req.body });

  await User.findByIdAndUpdate(id, { $push: { addresses: newAddress._id } });
  res.status(201).json({ status: "success", newAddress });
});

exports.fetchAddress = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const addresses = await Address.find({ userId: id });

  res.status(200).json({ Status: "Success", addresses });
});

exports.fetchAddressById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const address = await Address.findById(id);

  res.status(200).json({ status: "Success", address });
});

exports.updateAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedAddress = await Address.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "Success",
    updatedAddress,
  });
});
