const Address = require("../models/Address");
const mongoose = require("mongoose");

const addAddress = async (req, res) => {
  var {
    ownerid,
    studioid,
    firstname,
    lastname,
    email,
    telephone,
    address,
    city,
    state,
    country,
    zipcode,
    defaultaddress,
    billing,
  } = req.body;

  console.log(req.body);
  try {
    await Address.create({
      ownerid,
      studioid,
      firstname,
      lastname,
      email,
      telephone,
      address,
      city,
      state,
      country,
      zipcode,
      defaultaddress,
      billing,
    });
    res.status(201).send({ status: 201, msg: "Successfull Created" }); // created the studio
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};


const getAddressbyuserId = async (req, res) => {
  var { ownerid } = req.body;
  try {
    // const address = await Address.find({ownerid}).sort({ _id: -1 });
    const address = await Address.find().sort({ _id: -1 });
    res.json(address);
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const setdeliveryAddressbyuserId = async (req, res) => {
  var { ownerid } = req.body;
  try {
    // const address = await Address.find({ownerid}).sort({ _id: -1 });
    const address = await Address.find().sort({ _id: -1 });
    res.json(address);
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

module.exports = {
  addAddress,
  getAddressbyuserId
};
