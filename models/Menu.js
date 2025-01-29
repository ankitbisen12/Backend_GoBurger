const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  images: {
    type: [String],
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

MenuSchema.virtual("id").get(function () {
  return this._id;
});

MenuSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Menu = mongoose.model("Menu", MenuSchema);
module.exports = Menu;
