const BurgerWraps = require("../models/BurgerWrapsModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchBurgerWraps = catchAsync(async (req, resizeBy, next) => {
  const BurgerWrap = await BurgerWraps.find({});

  res.status(200).json({
    status: "Success",
    BurgerWrap,
  });
});

exports.createBurgerWrap = catchAsync(async (req, res, next) => {
  const photoBase = req.file ? req.file.buffer.toString("base64") : null;
  const newBurgerWrap = await BurgerWraps.create({
    ...req.body,
    image: photoBase,
  });

  res.status(201).json({
    status: "Success",
    newBurgerWrap,
  });
});

exports.fetchBurgerWrapById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const BurgerWrap = await BurgerWraps.findById(id);

  res.status(200).json(BurgerWrap);
});

exports.updateBurgerWrap = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedBurgerWrap = await BurgerWraps.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "Success",
    updatedBurgerWrap,
  });
});
