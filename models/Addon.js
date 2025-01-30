const mongoose = require("mongoose");

const AddonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      maxLength: [20, "Name is too long"],
    },
    category: {
      type: String,
      enum: ["addon", "veggies", "chesse", "sauces"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      min: [0, "Wrong min discount"],
      max: [100, "Wrong max discount"],
      default: 5, // Default discount is 5% if not provided
    },
    images: {
      type: [String],
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

AddonSchema.virtual("id").get(function () {
  return this._id;
});

AddonSchema.virtual("discountedPrice").get(function () {
  return this.discountPercentage
    ? Math.round(this.price * (1 - this.discountPercentage / 100))
    : this.price;
});

AddonSchema.set("toJSON", {
  virtuals: true,
  versionkey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Addon = mongoose.model("Addon", AddonSchema);
module.exports = Addon;