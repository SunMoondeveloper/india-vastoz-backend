const mongoose = require("mongoose");

const studiomultimediaSchema = mongoose.Schema({
  studioid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  ownerid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  dislikes: {
    type: Number,
    default: false,
  }
},{
  timestamps: true,
});
const Studiomultimedia = mongoose.model("studiomultimediaSchema", studiomultimediaSchema);
module.exports = Studiomultimedia;
