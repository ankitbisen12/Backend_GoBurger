const Menu = require("../models/MenuModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.find({});

  res.status(200).json({
    status: "Success",
    menu,
  });
});

exports.createMenu = catchAsync(async (req, res, next) => {
  const photoBase = req.file ? req.file.buffer.toString("base64") : null;
  const newMenu = await Menu.create({ ...req.body, image: photoBase });

  res.status(201).json({
    status: "Success",
    newMenu,
  });
});

exports.updateMenu = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedMenu = await Menu.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "Success",
    updatedMenu,
  });
});
