const express = require("express");
const router = express.Router();
const {
  getallStudioSubscriptionType,
  addStudioSubscriptionType,
  getSelectedStudioSubscriptionType,
  manageStudioSubscriptionByStudioId,
  
} = require("../controller/studiosubscriptionTypeController");

router.post("/getselectedstudiosubscriptiontype", getSelectedStudioSubscriptionType);
router.get("/getall", getallStudioSubscriptionType);
router.post("/add", addStudioSubscriptionType);
router.post("/manage", manageStudioSubscriptionByStudioId);

module.exports = router;
