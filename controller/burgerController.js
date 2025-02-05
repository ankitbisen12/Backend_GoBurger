const Burger = require("../models/BurgerModel");
const catchAsync = require("../utils/catchAsync");

exports.createBurger = catchAsync(async (req, res, next) => {
  const photoBase = req.file ? req.file.buffer.toString("base64") : null;
  const newBurger = await Burger.create({ ...req.body, image: photoBase });

  res.status(201).json({
    status: "Success",
    newBurger,
  });
});

exports.fetchBurger = catchAsync(async (req, res, next) => {
  const burgers = await Burger.find({});

  res.status(200).json({
    status: "Success",
    burgers,
  });
});

exports.fetchBurgerById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const burger = await Burger.findById(id);
  res.status(200).json(burger);
});

exports.updateBurger = catchAsync(async (req, res, next) => {
  const updatedBurger = await Burger.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    updatedBurger,
  });
});
