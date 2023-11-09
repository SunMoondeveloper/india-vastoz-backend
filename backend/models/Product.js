const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  ownerid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  brandname: {
    type: String,
    required: true,
  },
  vendorname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  saleprice: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  productcategory: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
  },
  currency: {
    type: String,
    default: 'usd',

  },
  details: {
    type: String,
    required: true,
  },
  deliverymethod: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  returnduration: {
    type: String,
    required: true,
  },
  returnmethod: {
    type: String,
    required: true,
  },
  warehousezipcode:{
    type: Number,
    required: true,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  length: {
    type: Number,
  },
  weightlb: {
    type: Number,
  },
  weightoz: {
    type: Number,
  },
  vastlink: {
    type: String,
  },
  isimageupload: {
    type: Boolean,
    default: true,
  },
  imageUrl: [{
    imageorder: Number,
    imagepath:String,
    viewstatus:Boolean,
  }],
},{
  timestamps: true,
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
