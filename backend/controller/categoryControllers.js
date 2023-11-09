const Category = require("../models/Category");

const getCategory = async (req, res) => {
  try {
    const products = await Category.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addCategory = async (req, res) => {
  var { name, description, imageUrl } = req.body;
  try {
    const rescategory = await Category.findOne({ name });
    console.log(rescategory);
    if (rescategory) {
      res.status(209).send({ status: 209 });
    } else {
      await Category.create({ name,description, imageUrl });
      res.status(201).send({ status: 201, msg: "Successfull Created" });
      return;
    }
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something wrong please try again", res);
    return;
  }
};

module.exports = {
  getCategory,
  addCategory,
};
