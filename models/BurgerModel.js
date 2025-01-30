const mongoose = require("mongoose");

const BurgerSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      maxLength: [20, "Name is too long"],
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      min: [0, "Wrong min discount"],
      max: [100, "Wrong max discount"],
      default: 5, // Default discount is 5% if not provided
    },
    rating: {
      type: mongoose.Schema.Types.Decimal128,
      min: [0, "Wrong min rating"],
      max: [5, "Wrong max rating"],
    },
    images: {
      type: [String],
      required: true,
    },
    foodlabel: {
      type: String,
      enum: ["Veg", "NonVeg"],
    },
    discountPrice: { type: Number },
    packagingCharge: {
      type: Number,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

BurgerSchema.virtual("id").get(function () {
  return this._id;
});

BurgerSchema.virtual("discountedPrice").get(function () {
  return this.discountPercentage
    ? Math.round(this.price * (1 - this.discountPercentage / 100))
    : this.price;
});

BurgerSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Burger = mongoose.model("Burger", BurgerSchema);
module.exports = Burger;
