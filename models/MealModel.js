const mongoose = require("mongoose");

const MealSchema = mongoose.Schema(
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
    },
    rating: {
      type: mongoose.Schema.Types.Decimal128,
      min: [0, "Wrong min rating"],
      max: [5, "Wrong max rating"],
    },
    foodlabel: {
      type: String,
      enum: ["Veg", "NonVeg"],
    },
    image: {
      type: String,
    },
    foodlabel: {
      type: String,
      enum: ["Veg", "NonVeg"],
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
    drinks: [
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

MealSchema.virtual("id").get(function () {
  return this._id;
});

MealSchema.virtual("discountedPrice").get(function () {
  return this.discountPercentage
    ? Math.round(this.price * (1 - this.discountPercentage / 100))
    : this.price;
});

MealSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Meal = mongoose.model("Meal", MealSchema);
module.exports = Meal;
