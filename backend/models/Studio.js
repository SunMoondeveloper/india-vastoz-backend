const mongoose = require("mongoose");

const studioSchema = mongoose.Schema({
  studioname: {
    type: String,
    unique: true,
    required: true,
  },
  ownerid: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  seotittle: {
    type: String,
    required: true,
  },
  adult: {
    type: Boolean,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  studiopagebio: {
    type: String,
    required: true,
  },
  aboutstudio: {
    type: String,
    required: true,
  },
  bannerimageUrl: {
    type: String,
    //required: true,
  },
  profileimageUrl: {
    type: String,
    //required: true,
  },
},{
  timestamps: true,
});

const Studio = mongoose.model("studiomanager", studioSchema);

module.exports = Studio;
