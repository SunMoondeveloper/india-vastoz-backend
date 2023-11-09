const express = require("express");
const router = express.Router();
const {
  getallStudioSubscription,
  addStudiosubscription,
  getStudioSubscriptionByStudioId,
  manageStudiosubscriptionByStudioId,
  
} = require("../controller/studiosubscriptionController");

router.get("/getstudiosubscriptionbystudioid", getStudioSubscriptionByStudioId);
router.get("/getall", getallStudioSubscription);
router.post("/add", addStudiosubscription);
router.post("/manage", manageStudiosubscriptionByStudioId);

module.exports = router;
