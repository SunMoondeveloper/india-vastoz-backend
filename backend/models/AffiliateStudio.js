const mongoose = require("mongoose");

const affiliateproductSchema = mongoose.Schema({
  studioid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  ownerid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  promotorid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  commission: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
},{
  timestamps: true,
});
const Affiliateproduct = mongoose.model("affiliateproduct", productmediaSchema);
module.exports = Affiliateproduct;
