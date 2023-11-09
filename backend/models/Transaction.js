const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    invoiceid: {
      type: String,
      required: true,
    },
    transactionid: {
      type: String,
      required: true,
    },
    totalamount: {
      type: String,
      required: true,
    },
    taxamount: {
      type: String,
      required: true,
    },
    taxrate: {
      type: String,
      required: true,
    },
    deliverycharge: {
      type: Number,
      default: 0,
    },
    deliverymethod: {
      type: String,
      required: true,
    },
    deliveryaddress: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
