const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    productid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    ownerid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    warehousezipcode:{
      type: Number,
      required: true,
    },
    productthumbnail: {
      type: String,
      required: true,
    },
  },{
    timestamps: true,
  });

const Cart = mongoose.model('cart', cartSchema)
module.exports = Cart
