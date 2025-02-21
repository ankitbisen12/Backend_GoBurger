const mongoose = require("mongoose");

const BurgerWrapsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    maxLength: [20, "Name is too long"],
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
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
  image: {
    type: String,
  }, // store base64 encoded data
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
});

BurgerWrapsSchema.virtual("id").get(function () {
  return this._id;
});

BurgerWrapsSchema.virtual("discountPrice").get(function () {
  return this.discountPercentage
    ? Math.round(this.price * (1 - this.discountPercentage / 100))
    : this.price;
});

BurgerWrapsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const BurgerWraps = mongoose.model("BurgerWraps", BurgerWrapsSchema);
module.exports = BurgerWraps;
