const mongoose = require('mongoose')

const stripeSchema = new mongoose.Schema(
  {
    ownerid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    stripeid: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    amountreceived: {
      type: Number,
      required: true,
    },
    capturemethod: {
      type: String,
      required: true,
    },
    clientsecret: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    currency: {
      type: String,
    },
    latestcharge: {
      type: String,
    },
    type: {
      type: String,
    },
  },{
    timestamps: true,
  });

const Stripe = mongoose.model('stripepayment', stripeSchema)
module.exports = Stripe
