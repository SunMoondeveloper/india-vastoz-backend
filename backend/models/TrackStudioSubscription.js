const mongoose = require("mongoose");

const trackstudiosubscriptionSchema = mongoose.Schema({
  studioid: {
    type: String,
    required: true,
  },
  sub_type: {
    type: String,
    required: true,
  },
  sub_amount: {
    type: Number,
    required: true,
  },
  sub_sell_product: {
    type: Boolean,
    required: true,
  },
  sub_video_duration: {
    type: Number,
    required: true,
  },
  sub_live_participant_count: {
    type: String,
    required: true,
  },
  sub_storage: {
    type: Number,
    default: false,
  },// below fields are payments
  ownerid: {
    type: String,
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
const Trackstudiosubscription = mongoose.model("trackstudiosubscriptionSchema", trackstudiosubscriptionSchema);
module.exports = Trackstudiosubscription;
