const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    itemType: {
      type: String,
      required: true,
      enum: ["BurgerMeal", "BurgerWrap", "Burger", "Beverages", "Dessert"], // Allowed models
    },
    items: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "itemType",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

CartSchema.virtual("id").get(function () {
  return this._id;
});

CartSchema.set("toJSON", {
  virtuals: true,
  versionkey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
