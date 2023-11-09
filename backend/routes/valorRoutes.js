const express = require("express");
const {
  addStripedata,
  valorcomplete,
  testvalorcomplete,
  valorSubscription,
} = require("../controller/valorController");
const { verifyUser } = require("../middleware/middleware");
const router = express.Router();

router.post("/addsuccess", addStripedata);
router.post("/completed", valorcomplete);
router.get("/test", testvalorcomplete);
router.get("/valorsubcription", valorSubscription);

module.exports = router;
