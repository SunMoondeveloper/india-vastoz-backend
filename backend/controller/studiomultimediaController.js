const Studiomultimedia = require("../models/StudioMultiMedia");
const mongoose = require("mongoose");
const { sendResponseError } = require("../middleware/middleware");

const getallStudiomultimedia = async (req, res) => {
  try {
    const allstudiomultimedia = await Studiomultimedia.find({}).sort({ _id: -1 });
    res.json(allstudiomultimedia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getStudioMultimediabyuserById = async (req, res) => {
    var {
      id
    } = req.params;
    try {
      console.log(id);
      const studioimages = await Studiomultimedia.find({studioid: mongoose.Types.ObjectId(id)}).sort({order:1});
      // console.log()
      res.json(studioimages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
};

const addStudiomultimedia = async (req, res) => {
  var {
    studioid,
    title,
    description,
    views,
    likes,
    dislikes,
  } = req.body;

  console.log(req.body);
  try {
    await Studiomultimedia.create({
      studioid,
      title,
      description,
      views,
      likes,
      dislikes,
    });
    res.status(201).send({ status: 201, msg: "Successfully Created" }); // created the studio multi media
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};

const manageStudiomultimediaById = async (req, res) => {
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
    await Studiomultimedia.updateOne(filter, update)
    res.status(201).send({ status: 201, msg: "Successfull Updated" }); // update the studio multi media
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};

module.exports = {
  getallStudiomultimedia,
  addStudiomultimedia,
  getStudioMultimediabyuserById,
  manageStudiomultimediaById
};