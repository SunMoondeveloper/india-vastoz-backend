const StudioSubscription = require("../models/StudioSubscription");
const mongoose = require("mongoose");
const { sendResponseError } = require("../middleware/middleware");

const getallStudioSubscription = async (req, res) => {
  try {
    const allstudiosubscription = await StudioSubscription.find({}).sort({ _id: -1 });
    res.json(allstudiosubscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getStudioSubscriptionByStudioId = async (req, res) => {
    var {
        studioid
    } = req.params;
    try {
        console.log("studioid",studioid);
        // studioid = "653ea18c1cf6e363b9e6d349";
        console.log("studioid",studioid);
      const getStudioSubscription = await StudioSubscription.find({ studioid: mongoose.Types.ObjectId(studioid) }).sort({order:1});
      // console.log()
      res.json(getStudioSubscription);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
};

const addStudiosubscription = async (req, res) => {
  var {
    studioid,
    ownerid,
    type,
    sub_start_date,
    sub_end_date,
    amount,
    sell_product,
    video_duration,
    live_participant_count,
    storage
  } = req.body;

  console.log(req.body);
  try {
    await StudioSubscription.create({
      studioid,
      ownerid,
      type,
      sub_start_date,
      sub_end_date,
      amount,
      sell_product,
      video_duration,
      live_participant_count,
      storage
    });
    res.status(201).send({ status: 201, msg: "Successfully Created" }); // created the studio multi media
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};

const manageStudiosubscriptionByStudioId = async (req, res) => {
  var {
    studioid,
    ownerid,
    type,
    sub_start_date,
    sub_end_date,
    amount,
    sell_product,
    video_duration,
    live_participant_count,
    storage
  } = req.body;

  const filter = { studioid: studioid }; // Define the filter to match the document you want to update
  const update = {
    studioid,
    ownerid,
    type,
    sub_start_date,
    sub_end_date,
    amount,
    sell_product,
    video_duration,
    live_participant_count,
    storage
  };

  try {
    await StudioSubscription.updateOne(filter, update)
    res.status(201).send({ status: 201, msg: "Successfull Updated" }); // update the studio multi media
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};

module.exports = {
    getallStudioSubscription,
    addStudiosubscription,
    getStudioSubscriptionByStudioId,
    manageStudiosubscriptionByStudioId
};