const mongoose = require('mongoose')

const cmsuserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const CMSUser = mongoose.model('cmsuser', cmsuserSchema)
module.exports = CMSUser
