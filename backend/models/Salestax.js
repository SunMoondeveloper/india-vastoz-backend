const mongoose = require("mongoose");

const salestaxSchema = mongoose.Schema({
  zip_code: {
    type: String,
    // required: true,
  },
  total_rate: {
    type: Number,
    // required: true,
  },
  city_rate: {
    type: Number,
    // required: true,
  },
  state_rate: {
    type: Number,
    // required: true,
  },
  county_rate: {
    type: Number,
    // required: true,
  },
  additional_rate: {
    type: Number,
    // required: true,
  },
},{
  timestamps: true,
});

const Salestax = mongoose.model("salestax", salestaxSchema);

module.exports = Salestax;
