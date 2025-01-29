const { version } = require("mongoose");

const mongoose = reuire("mongoose");

const BurgerMealSchema = mongoose.Schema(
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
    ingredients: {
      type: [String],
      required: true,
    },
    packagingCharge: {
      type: Number,
    },
    addons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addon",
      },
    ],
    veggies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addon",
      },
    ],
    chesse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addon",
      },
    ],
    sauces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addon",
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

BurgerMealSchema.virtual("id").get(function () {
  return this._id;
});

BurgerMealSchema.virtual("discountedPrice").get(function () {
  return this.discountPercentage
    ? Math.round(this.price * (1 - this.discountPercentage / 100))
    : this.price;
});

BurgerMealSchema.set("toJSON").set({
  virtuals: true,
  versionkey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const BurgerMeal = mongoose.model("BurgerMeal", BurgerMealSchema);
module.exports = BurgerMeal;
