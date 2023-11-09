const express = require("express");
const router = express.Router();
const {
  getCategory,
  addCategory,
} = require("../controller/categoryControllers");

router.get("/get", getCategory);
router.post("/add", addCategory);

module.exports = router;
