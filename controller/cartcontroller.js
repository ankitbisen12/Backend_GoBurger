const Cart = require("../models/CartModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchCartByUser = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  console.log("id",id);

  const cartItems = await Cart.find({ user: id }).populate("items");
  res.status(200).json(cartItems);
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const newItemToCart = await Cart.create({ ...req.body, user: id });
  const result = await newItemToCart.populate("items");
  res.status(201).json(result);
});

exports.deleteFromCart = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const doc = await Cart.findByIdAndDelete(id);
  res.status(200).json(doc);
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const updatedCart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
  const result = await updatedCart.populate("items");

  res.status(200).json(result);
});
