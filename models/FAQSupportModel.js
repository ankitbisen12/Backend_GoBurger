const mongoose = require('mongoose');

const FAQSupportSchema = mongoose.Schema({
    question:{type: String, required:true, unique:true},
    answer: {type: String, require:true, unique:true}
},{ timestamps: true });


FAQSupportSchema.virtual("id").get(function () {
    return this._id;
  });

 FAQSupportSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
});

const FAQSupport = mongoose.model("FAQSupport",FAQSupportSchema );
module.exports = FAQSupport;
