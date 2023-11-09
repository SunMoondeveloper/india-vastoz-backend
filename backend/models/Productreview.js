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
  starrating: {
    type: Number,
    required: true,
  },
  reviewdetail: {
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
