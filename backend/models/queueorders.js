const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  ownerid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shipoingcharge: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  fedexoption: {
    type: String,
    required: true,
  },
  tempinvoiceid: {
    type: String,
    required: true,

  }
},{
  timestamps: true,
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
