const mongoose = require("mongoose");

const categorySchema =  mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
},{
  timestamps: true,
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
