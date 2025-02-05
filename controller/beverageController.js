const Beverages = require("../models/BeveragesModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchBeverages = catchAsync(async (req, resizeBy, next) => {
  const beverage = await Beverages.find({});

  res.status(200).json({
    status: "Success",
    beverage,
  });
});

exports.createBeverage = catchAsync(async (req, res, next) => {
  const photoBase = req.file ? req.file.buffer.toString("base64") : null;
  const newBeverage = await Beverages.create({ ...req.body, image: photoBase });

  res.status(201).json({
    status: "Success",
    newBeverage,
  });
});

exports.fetchBeverageById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const beverage = await Beverages.findById(id);

  res.status(200).json(beverage);
});

exports.updateBeverage = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedBeverage = await Beverages.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "Success",
    updatedBeverage,
  });
});
