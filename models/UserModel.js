const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: Buffer },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "User",
  },
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }], // Reference to Address model
  salt: Buffer,
  mobileNo: { type: Number },
});

UserSchema.virtual("id").get(function () {
  return this._id;
});

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
