const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  house: { type: String, required: true },
  floor: { type: String, required: true },
  apartment: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

AddressSchema.virtual("id").get(function () {
  return this._id;
});

AddressSchema.set("toJSON", {
  virtuals: true,
  versionkey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
