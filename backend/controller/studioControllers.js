const Studio = require("../models/Studio");
const mongoose = require('mongoose');

const getallStudio = async (req, res) => {
  try {
    const studios = await Studio.find({}).sort({ _id: -1 });
    console.log(studios);
    res.json(studios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getStudiobyuserById = async (req, res) => {
  var { ownerid } = req.body;

  // const products = await Product.find(filter);
  try {
    const studios = await Studio.find({ ownerid }).sort({ _id: -1 });
    res.json(studios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// This is for nonCMS user
// view the available Studio information
const getbasicStudio = async (req, res) => {
  try {
    // const studios = await Studio.find({},{studioname,seotittle,adult,}).sort({"_id":-1});
    const studios = await Studio.find({}).sort({ _id: -1 });

    // console.log(studios)
    res.json(studios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addStudio = async (req, res) => {
  var {
    studioname,
    ownerid,
    category,
    language,
    seotittle,
    adult,
    firstname,
    lastname,
    email,
    telephone,
    companyname,
    address,
    city,
    country,
    zipcode,
    autoshipping,
    studiopagebio,
    aboutstudio,
    bannerimage,
    profileimage,
  } = req.body;
  try {
    const resstudio = await Studio.findOne({ studioname });
    if (resstudio) {
      res.status(209).send({ status: 209 }); // already studio available
    } else {
      await Studio.create({
        studioname,
        ownerid,
        category,
        language,
        seotittle,
        adult,
        firstname,
        lastname,
        email,
        telephone,
        companyname,
        address,
        city,
        country,
        zipcode,
        autoshipping,
        studiopagebio,
        aboutstudio,
        bannerimage,
        profileimage,
      });
      res.status(201).send({ status: 201, msg: "Successfull Created" }); // created the studio
      return;
    }
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};

const manageStudio = async (req, res) => {
  var {
    studioid,
    studioname,
    ownerid,
    category,
    language,
    seotittle,
    adult,
    firstname,
    lastname,
    email,
    telephone,
    companyname,
    address,
    city,
    state,
    country,
    zipcode,
    autoshipping,
    studiopagebio,
    aboutstudio,
    bannerimage,
    profileimage,
  } = req.body;

  if (!studioid) studioid = mongoose.Types.ObjectId();

  console.log(req.body);
  try {
    const result = await Studio.findByIdAndUpdate(
      studioid,
      {
        studioname,
        ownerid,
        category,
        language,
        seotittle,
        adult,
        firstname,
        lastname,
        email,
        telephone,
        companyname,
        address,
        city,
        state,
        country,
        zipcode,
        autoshipping,
        studiopagebio,
        aboutstudio,
        bannerimage,
        profileimage,
      },
      { new: true, upsert: true }
    );
    console.log(result);
    const insertedId = result._id;
    console.log("Inserted product ID:", insertedId);
    res.status(201).send({ status: 201, id: insertedId }); // created the studio
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};
module.exports = {
  getallStudio,
  manageStudio,
  addStudio,
  getbasicStudio,
  getStudiobyuserById,
};
