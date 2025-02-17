const mongoose = require("mongoose");

const paymentMethods = {
  value: ["cash", "card"],
  message: "enum validator failed for paymentMethod`",
};

const OrderSchema = mongoose.Schema(
  {
    items: { type: [mongoose.Schema.Types.Mixed], required: true },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: { type: String, required: true, enum: ["cash", "card"] },
    paymentStatus: { type: String, required: true, default: "Pending" },
    status: { type: String, default: "Pending", required: true },
    selectedAddress: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

OrderSchema.virtual("id").get(function () {
  return this._id;
});

OrderSchema.set("toJSON", {
  virtuals: true,
  versionkey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
