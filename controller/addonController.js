const Addon = require("../models/AddonModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchAddon = catchAsync(async (req, res, next) => {
  const addon = await Addon.find({});

  res.status(200).json({
    status: "Success",
    addon,
  });
});

exports.createAddon = catchAsync(async (req, res, next) => {
  const photoBase = req.file ? req.file.buffer.toString("base64") : null;
  const newAddon = await Addon.create({ ...req.body, image: photoBase });

  res.status(201).json({
    status: "Success",
    newAddon,
  });
});

exports.fetchAddonById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const addon = await Addon.findById(id);

  res.status(200).json(meal);
});

exports.updateAddon = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedAddon = await Addon.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "Success",
    updatedAddon,
  });
});
