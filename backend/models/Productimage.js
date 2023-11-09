const mongoose = require("mongoose");

const productimageSchema = mongoose.Schema({
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

  imageUrl: {
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

const Productimage = mongoose.model("productimage", productimageSchema);

module.exports = Productimage;
