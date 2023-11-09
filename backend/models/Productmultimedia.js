const mongoose = require("mongoose");

const productmediaSchema = mongoose.Schema({
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  ownerid: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  ispublished: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  aiapproved: {
    type: String,
    default: false,
  }
},{
  timestamps: true,
});
const Productmedia = mongoose.model("productmedia", productmediaSchema);
module.exports = Productmedia;
