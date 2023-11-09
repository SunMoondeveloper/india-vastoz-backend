const express = require("express");
const {
  signUpUser,
  signInUser,
  getUser,
  loginUser,
  registerUser,
} = require("../controller/userController");
const { verifyUser } = require("../middleware/middleware");
const router = express.Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);

// Below for NonCMS users
router.post("/login", loginUser);
router.post("/register", registerUser);

router.route("/me").get([verifyUser], getUser);

module.exports = router;
