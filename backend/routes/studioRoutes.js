const express = require("express");
const router = express.Router();
const {
  getallStudio,
  addStudio,
  getbasicStudio,
  getStudiobyuserById,
  manageStudio,
  
} = require("../controller/studioControllers");

router.post("/getstudiobyuserid", getStudiobyuserById);
 router.get("/getall", getallStudio);
router.get("/getbasicstudio", getbasicStudio);
router.post("/add", addStudio);
router.post("/manage", manageStudio);

module.exports = router;
