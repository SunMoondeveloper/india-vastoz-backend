const Studiosubscriptiontype = require("../models/StudioSubscriptionType");
const mongoose = require("mongoose");
const { sendResponseError } = require("../middleware/middleware");

const getallStudioSubscriptionType = async (req, res) => {
  try {
    console.log('getallStudioSubscriptionType');
    const allstudiosubscriptiontype = await Studiosubscriptiontype.find({}).sort({ type: 1 });
    res.json(allstudiosubscriptiontype);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getSelectedStudioSubscriptionType = async (req, res) => {
    var {
      type
    } = req.params;
    try {
      type = "Basic";
      // console.log(subscriptiontype);
      const studiosubscriptiontype = await Studiosubscriptiontype.find({type});
      // console.log()
      res.json(studiosubscriptiontype);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
};

const addStudioSubscriptionType = async (req, res) => {
  var {
    type,
    amt_month,
    amt_month_val,
    amt_year,
    amt_year_val,
    sell_product,
    video_duration_month,
    video_duration_month_val,
    video_duration_year,
    video_duration_year_val,
    storage_month,
    storage_month_val,
    storage_year,
    storage_year_val,
    live_participant_count_month,
    live_participant_count_month_val,
    live_participant_count_year,
    live_participant_count_year_val
  } = req.body;

  console.log(req.body);
  try {
    await Studiosubscriptiontype.create({
      type,
      amt_month,
      amt_month_val,
      amt_year,
      amt_year_val,
      sell_product,
      video_duration_month,
      video_duration_month_val,
      video_duration_year,
      video_duration_year_val,
      storage_month,
      storage_month_val,
      storage_year,
      storage_year_val,
      live_participant_count_month,
      live_participant_count_month_val,
      live_participant_count_year,
      live_participant_count_year_val
    });
    res.status(201).send({ status: 201, msg: "Successfully Created" }); // created the studio multi media
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};

const manageStudioSubscriptionByStudioId = async (req, res) => {
  var {
    type,
    amt_month,
    amt_month_val,
    amt_year,
    amt_year_val,
    sell_product,
    video_duration_month,
    video_duration_month_val,
    video_duration_year,
    video_duration_year_val,
    storage_month,
    storage_month_val,
    storage_year,
    storage_year_val,
    live_participant_count_month,
    live_participant_count_month_val,
    live_participant_count_year,
    live_participant_count_year_val
  } = req.body;

  const filter = { type: type }; // Define the filter to match the document you want to update
  const update = {
    type,
    amt_month,
    amt_month_val,
    amt_year,
    amt_year_val,
    sell_product,
    video_duration_month,
    video_duration_month_val,
    video_duration_year,
    video_duration_year_val,
    storage_month,
    storage_month_val,
    storage_year,
    storage_year_val,
    live_participant_count_month,
    live_participant_count_month_val,
    live_participant_count_year,
    live_participant_count_year_val
  };

  try {
    await Studiosubscriptiontype.updateOne(filter, update)
    res.status(201).send({ status: 201, msg: "Successfull Updated" }); // update the studio multi media
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};

module.exports = {
  getallStudioSubscriptionType,
  addStudioSubscriptionType,
  getSelectedStudioSubscriptionType,
  manageStudioSubscriptionByStudioId
};