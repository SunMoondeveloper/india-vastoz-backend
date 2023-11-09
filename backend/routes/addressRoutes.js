const express = require("express");
const {
  addAddress,
  getAddressbyuserId
} = require("../controller/addressController");
const { verifyUser } = require("../middleware/middleware");
const router = express.Router();

router.post("/addnew", addAddress);
router.get("/getaddress", getAddressbyuserId); // need to change 

module.exports = router;
