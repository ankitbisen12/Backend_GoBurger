const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: Buffer},
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "User",
  },
  addresses: { type: [mongoose.Schema.Types.Mixed], default: [] }, //TODO: we can create separate schema for this.
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
