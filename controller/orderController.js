const Order = require("../models/OrderModel");
const catchAsync = require("../utils/catchAsync");

exports.fetchOrderByUserId = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const orders = await Order.find({ user: id });
  res.status(200).json(orders);
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create(req.body);
  //TODO:here we have to update stocks

  for (let item of order.items) {
    let product = await Product.findById({ _id: item.product.id });
    product.$inc("stock", -1 * item.quantity);
    await product.save();
  }
  //   const user = User.findById(order.user);
  res.status(201).json(order);
});

exports.deletOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);
  res.status(200).json(order);
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(order);
});

exports.fetchAllOrders = catchAsync(async (req, res, next) => {
  //here we need all query string.

  // sort= {_sort:"price",_order="desc"}
  //pagination = {_page:1,_limit=10};

  let query = Order.find({ deleted: { $ne: true } });
  let totalOrdersQuery = Order.find({ deleted: { $ne: true } });

  //TODO: How to get sort on discounted Price not on Actual Price
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalOrdersQuery.count().exec();
  // console.log({totalDocs});

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  const docs = await query.exec();

  res.set("X-Total-Count", totalDocs);
  res.status(200).json(docs);
  // console.log(docs);
});
