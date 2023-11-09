const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    productid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productname: {
      type: String,
      required: true,
    },
    productcategory: {
      type: String,
      required: true,
    },
    ownerid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    studioid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    invoiceid: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalprice: {
      type: Number,
    },
    totalamount: {
      type: Number,
    },
    taxrate:{
      type: Number,
    },
    taxamount: {
      type: Number,
    },
    deliverycharge: {
      type: Number,
    },
    deliveryaddress: {
      type: mongoose.Schema.Types.ObjectId,
    },
    fedexid: {
      type: String,
    },
    deliverydiscount: {
      type: Number,
    },
    productthumbnail: {
      type: String,
    },
    saleprice: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "US"
    },
    status: {
      type: String,
    },
    returnstatus: {
      type: String,
    },
    returnduration: {
      type: String,
    },
    paymentgateway: {
      type: String,
    },
    paymentid: {
      type: String,
    },
    paymentstatus: {
      type: String,
      default:"success"
    },
    paymentrefundstatus: {
      type: String,
    },
  },{
    timestamps: true,
  });
const Order = mongoose.model('order', orderSchema)
module.exports = Order
