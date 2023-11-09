const Productmedia = require("../models/Productmultimedia");
const mongoose = require("mongoose");


const getallProductmedia = async (req, res) => {
  try {
    const products = await Productmedia.find({}).sort({ _id: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductmediaById = async (req, res) => {
  var {
    id
  } = req.params;
  try {
    //const product = await Productimage.findById(req.params.id);
    console.log(id);
    const productimages = await Productmedia.find({productid: mongoose.Types.ObjectId(id)}).sort({order:1});
    // console.log(productimages)
    res.json(productimages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateProductvideosById = async (req, res) => {
  var {
    selectedpid,
    imageid,
    ispublished,
    aiapproved,
    order,
  } = req.body;

  const filter = { _id: imageid }; // Define the filter to match the document you want to update
  const update = {
    order: order,
    ispublished: ispublished,
  };

  try {
    await Productmedia.updateOne(filter, update)
    res.status(201).send({ status: 201, msg: "Successfull Created" }); // created the studio
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};

const addProductmedia = async (req, res) => {
  var {
    medialist
  } = req.body;
  console.log(req.body);

  try {
    await Productmedia.insertMany(medialist);
    res.status(201).send({ status: 201, msg: "Successfull Created" }); // created the studio
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};

module.exports = {
  addProductmedia,
  getProductmediaById
};
