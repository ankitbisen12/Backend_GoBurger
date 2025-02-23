const FAQSupport = require("../models/FAQSupportModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchFaqSupport = catchAsync(async (req, res, next) => {
  const faqSupport = await FAQSupport.find();
  res.status(200).json({ status: "Success", faqSupport });
});

exports.createFaqSupport = catchAsync(async (req, res, next) => {
  const newFaqSupport = await FAQSupport.create(req.body);
  res.status(201).json({ status: "Success", newFaqSupport });
});

exports.updateFaqSupport = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedFaqSupport = await Meal.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "Success",
    updatedFaqSupport,
  });
});
