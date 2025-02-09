const mongoose = require("mongoose");

const DessertsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      maxLength: [40, "Name is too long"],
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
    foodlabel: {
      type: String,
      enum: ["Veg", "NonVeg"],
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
    image: {
      type: String,
    }, // store base64 encoded data
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

DessertsSchema.virtual("id").get(function () {
  return this._id;
});

DessertsSchema.virtual("discountedPrice").get(function () {
  return this.discountPercentage
    ? Math.round(this.price * (1 - this.discountPercentage / 100))
    : this.price;
});

const Desserts = mongoose.model("Desserts", DessertsSchema);
module.exports = Desserts;
