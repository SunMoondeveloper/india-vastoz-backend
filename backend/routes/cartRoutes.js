const express = require("express");
const {
  addProductInCart,
  deleteProductInCart,
  getCartProducts,
  getCartbyuserId,
  getCartcountbyuserId,
  cartcount,
  getCheckoutcartbyUserID,
  valorpayCheckoutcartbyUserID,
  test,
} = require("../controller/cartController");
const { verifyUser } = require("../middleware/middleware");
const router = express.Router();

// router
//   .route("/")
//   .get([verifyUser], getCartProducts)
//   .post([verifyUser], addProductInCart);
router.post("/addcart", addProductInCart);
router.post("/addcount", cartcount);
router.post("/getcart", getCartbyuserId);
router.post("/deletecart", deleteProductInCart);
router.post("/getccbyuserid", getCartcountbyuserId);
router.post("/getcartcheckoutbyuserid", getCheckoutcartbyUserID);
router.post("/valorpaycartcheckout", valorpayCheckoutcartbyUserID);
router.get("/valorpaycartcheckout", valorpayCheckoutcartbyUserID);
router.get("/test", test);
router.route("/:id").delete([verifyUser], deleteProductInCart);

module.exports = router;
