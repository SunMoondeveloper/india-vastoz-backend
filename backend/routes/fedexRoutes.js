const express = require("express");
const {
  calculatecartDCbyuserid,
} = require("../controller/fedexControllers");
const { verifyUser } = require("../middleware/middleware");
const router = express.Router();

router.post("/calcartDCbyuserID", calculatecartDCbyuserid); //  
router.get("/calcartDCbyuserID", calculatecartDCbyuserid); // need to remove

module.exports = router;
