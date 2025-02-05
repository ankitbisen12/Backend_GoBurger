const Desserts = require("../models/DessertsModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchDesserts = catchAsync(async (req, resizeBy, next) => {
  const desserts = await Desserts.find({});

  res.status(200).json({
    status: "Success",
    desserts,
  });
});

exports.createdesserts = catchAsync(async (req, res, next) => {
  const photoBase = req.file ? req.file.buffer.toString("base64") : null;
  const newDesserts = await Desserts.create({ ...req.body, image: photoBase });

  res.status(201).json({
    status: "Success",
    newDesserts,
  });
});

exports.fetchdessertsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const dessert = await Desserts.findById(id);

  res.status(200).json(dessert);
});

exports.updatedesserts = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedDesserts = await Desserts.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "Success",
    updatedDesserts,
  });
});
