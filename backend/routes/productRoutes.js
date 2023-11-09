const express = require("express");
const router = express.Router();
// product related functionalities
const {
  getProducts,
  getProductById,
  addProduct,
  manageProduct,
  getallProducts,
  addimageProduct,
  getProductimageurlById,
  getProductBycategoryname,
  getProductbyuserById

} = require("../controller/productControllers");

// product images related functionalities

const {
  getallProductimages,
  getProductimagesById,
  addProductimages,
  updateProductimagesById,
  updateallProductsmultimediaById
} = require("../controller/productimageControllers");

// media controls
const {
  addProductmedia,
  getProductmediaById,
} = require("../controller/productmultimediaControllers");
router.get("/", getProducts);
router.get("/getall", getallProducts);
// router.get("/:id", getProductById);
router.get("/getpdetails/:id", getProductById);
router.post("/add", addProduct);
router.post("/manage", manageProduct);
router.post("/addimage", addProductimages);
router.post("/addmedia", addProductmedia);
router.get("/getpimages/:id", getProductimagesById);
router.get("/getpmediabyuid/:id", getProductmediaById);
router.post("/getpbyc", getProductBycategoryname);
router.post("/getpbyuserid", getProductbyuserById);
router.post("/updatepimage", updateProductimagesById);
router.post("/updateallpm", updateallProductsmultimediaById);



module.exports = router;
