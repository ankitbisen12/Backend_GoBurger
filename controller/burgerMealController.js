const BurgerMeal = require("../models/BurgerMealModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchBurgerMeal = catchAsync(async (req, res, next) => {
  const burgerMeal = await BurgerMeal.find();
  console.log("BurgerMeal",burgerMeal);

  res.status(200).json({
    status: "Success",
    burgerMeal,
  });
});

exports.createBurgerMeal = catchAsync(async (req, res, next) => {
  const photoBase = req.file ? req.file.buffer.toString("base64") : null;
  const newBurgerMeal = await BurgerMeal.create({
    ...req.body,
    image: photoBase,
  });

  res.status(201).json({
    status: "Success",
    newBurgerMeal,
  });
});

exports.fetchBurgerMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const burgerMeal = await BurgerMeal.findById(id);

  res.status(200).json(burgerMeal);
});

exports.updateBurgerMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedBurgerMeal = await BurgerMeal.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "Success",
    updatedBurgerMeal,
  });
});
