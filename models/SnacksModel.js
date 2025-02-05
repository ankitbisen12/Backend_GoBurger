const mongoose = require("mongoose");

const SnacksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      maxLength: [30, "Name is too long"],
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
    foodlabel: {
      type: String,
      enum: ["Veg", "NonVeg"],
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

SnacksSchema.virtual("id").get(function () {
  return this._id;
});

SnacksSchema.virtual("discountPrice").get(function () {
  return this.discountPercentage
    ? Math.round(this.price * (1 - this.discountPercentage / 100))
    : this.price;
});

SnacksSchema.set("toJSON", {
  virtuals: true,
  versionkey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Snacks = mongoose.model("Snacks", SnacksSchema);
module.exports = Snacks;
