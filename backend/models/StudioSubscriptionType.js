const mongoose = require("mongoose");

const subscriptiontypeSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  amt_month: {
    type: String,
    required: true,
  },
  amt_month_val: {
    type: Number,
    required: true,
  },
  amt_year: {
    type: String,
    required: true,
  },
  amt_year_val: {
    type: Number,
    required: true,
  },
  sell_product: {
    type: String,
    required: true,
  },
  video_duration_month: {
    type: String,
    required: true,
  },
  video_duration_month_val: {
    type: Number,
    required: true,
  },
  video_duration_year: {
    type: String,
    required: true,
  },
  video_duration_year_val: {
    type: Number,
    required: true,
  },
  storage_month: {
    type: String,
    required: true,
  },
  storage_month_val: {
    type: Number,
    required: true,
  },
  storage_year: {
    type: String,
    required: true,
  },
  storage_year_val: {
    type: Number,
    required: true,
  },
  live_participant_count_month: {
    type: String,
    required: true,
  },
  live_participant_count_month_val: {
    type: Number,
    required: true,
  },
  live_participant_count_year: {
    type: String,
    required: true,
  },
  live_participant_count_year_val: {
    type: Number,
    required: true,
  }
},{
  timestamps: true,
});
const subscriptiontype = mongoose.model("subscriptiontypeSchema", subscriptiontypeSchema);
module.exports = subscriptiontype;
