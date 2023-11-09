const express = require("express");
const router = express.Router();
const {
  getOrdersbyuserId,
  getOrdersbyuserId1,
  getstudioOrders,
  getOrderByStudioId,
} = require("../controller/orderControllers");

router.post("/getbyuid",getOrdersbyuserId );
router.post("/getbyuid1",getOrdersbyuserId1 );
router.post("/getstudioorders",getstudioOrders );
router.post("/getorderbystudioid",getOrderByStudioId );

module.exports = router;
