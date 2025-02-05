const Meal = require("../models/MealModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchMeal = catchAsync(async (req, resizeBy, next) => {
  const meal = await Meal.find({});

  res.status(200).json({
    status: "Success",
    meal,
  });
});

exports.createMeal = catchAsync(async (req, res, next) => {
  const photoBase = req.file ? req.file.buffer.toString("base64") : null;
  const newMeal = await Meal.create({ ...req.body, image: photoBase });

  res.status(201).json({
    status: "Success",
    newMeal,
  });
});

exports.fetchMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findById(id);

  res.status(200).json(meal);
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedMeal = await Meal.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "Success",
    updatedMeal,
  });
});
