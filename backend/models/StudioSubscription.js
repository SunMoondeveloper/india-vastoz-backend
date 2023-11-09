const mongoose = require("mongoose");

const studiosubscriptionSchema = mongoose.Schema({
  studioid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  ownerid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  sub_start_date:{
    type: Date,
    required: true,
  },
  sub_end_date:{
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  sell_product: {
    type: Boolean,
    required: true,
  },
  video_duration: {
    type: Number,
    required: true,
  },
  live_participant_count: {
    type: String,
    required: true,
  },
  storage: {
    type: Number,
    default: false,
  }
},{
  timestamps: true,
});
const Studiosubscription = mongoose.model("studiosubscriptionSchema", studiosubscriptionSchema);
module.exports = Studiosubscription;
