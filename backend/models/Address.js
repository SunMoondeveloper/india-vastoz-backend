const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema(
  {
    ownerid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    studioid: {
      type: mongoose.Schema.Types.ObjectId,
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
    defaultaddress: {
      type: Boolean,
    },
    billing: {
      type: Boolean,
    }
  },{
    timestamps: true,
  });

const Address = mongoose.model('address', addressSchema)
module.exports = Address
