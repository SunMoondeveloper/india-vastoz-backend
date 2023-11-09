const express = require("express");
const {
  addStripedata,
  stripecomplete
} = require("../controller/stripeController");
const { verifyUser } = require("../middleware/middleware");
const router = express.Router();

router.post("/addsuccess", addStripedata);
router.post("/completed", stripecomplete);

module.exports = router;
