const express = require("express");
const router = express.Router();
const {
    addStudiomultimedia,
    getallStudiomultimedia,
    getStudioMultimediabyuserById,
    manageStudiomultimediaById
} = require("../controller/studiomultimediaController");

router.post("/getStudioMultimediabyuserById", getStudioMultimediabyuserById);
router.get("/getall", getallStudiomultimedia);
router.post("/add", addStudiomultimedia);
router.post("/manage", manageStudiomultimediaById);

module.exports = router;