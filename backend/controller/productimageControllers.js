const Productimage = require("../models/Productimage");
const Productmedia = require("../models/Productmultimedia");

const mongoose = require("mongoose");


const getallProductimages = async (req, res) => {
  try {
    const products = await Productimage.find({}).sort({ _id: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductimagesById = async (req, res) => {
  var {
    id
  } = req.params;
  try {
    //const product = await Productimage.findById(req.params.id);
    console.log(id);
    const productimages = await Productimage.find({productid: mongoose.Types.ObjectId(id)}).sort({order:1});
    // console.log(productimages)
    res.json(productimages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateProductimagesById = async (req, res) => {
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
    await Productimage.updateOne(filter, update)
    res.status(201).send({ status: 201, msg: "Successfull Created" }); // created the studio
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }

  // try {
  //   //const product = await Productimage.findById(req.params.id);
  //   const productimages = await Productimage.find({_id: imageid});
  //   console.log(productimages)
  //   res.json(productimages);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Server Error" });
  // }
};



const updateallProductsmultimediaById = async (req, res) => {
  // var {
  //   selectedpid,
  //   imageid,
  //   ispublished,
  //   aiapproved,
  //   order,
  // } = req.body;
  var {
    selectedpid,
    allproducts
  } = req.body;
  for (let i = 0; i < allproducts.length; i++) {
    
  const filter = { _id: allproducts[i]._id }; // Define the filter to match the document you want to update
  const update = {
    order: allproducts[i].order,
    ispublished: allproducts[i].ispublished,
  };

  console.log('====================================');
  console.log(update,filter);
  console.log('====================================');
  try {
    await Productmedia.updateOne(filter, update)
  } catch (err) {
    console.log("Eorror : ", err);
  }
}

res.status(201).send({ status: 201, msg: "Successfull Created" }); // created the studio
return;
};

const addProductimages = async (req, res) => {
  var {
    imageurllist
  } = req.body;
  console.log(req.body);

  try {
    await Productimage.insertMany(imageurllist);
    res.status(201).send({ status: 201, msg: "Successfull Created" }); // created the studio
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};
module.exports = {
  getallProductimages,
  getProductimagesById,
  addProductimages,
  updateProductimagesById,
  updateallProductsmultimediaById,
};
