const Snacks = require("../models/SnacksModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchSnacks = catchAsync(async (req, res, next) => {
  const snacks = await Snacks.find({});

  res.status(200).json({
    status: "Success",
    snacks,
  });
});

exports.createSnack = catchAsync(async (req, res, next) => {
  const photoBase = req.file ? req.file.buffer.toString("base64") : null;
  const newSnack = await Snacks.create({ ...req.body, image: photoBase });

  res.status(201).json({
    status: "Success",
    newSnack,
  });
});

exports.fetchSnackById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const Snack = await Snacks.findById(id);

  res.status(200).json(Snack);
});

exports.updateSnack = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedSnack = await Snacks.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "Success",
    updatedSnack,
  });
});
