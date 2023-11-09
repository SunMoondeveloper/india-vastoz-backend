const express = require("express");
const {
  getSalestaxbyzipcode,
} = require("../controller/salestaxController");
const { verifyUser } = require("../middleware/middleware");
const router = express.Router();

router.post("/getussalestax", getSalestaxbyzipcode);
router.get("/getussalestax", getSalestaxbyzipcode);

module.exports = router;
