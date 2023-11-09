const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const CMSUser = require("../models/CMSUser");
const { sendResponseError } = require("../middleware/middleware");
const { checkPassword, newToken } = require("../utils/utility.function");


// This is for CMS user login
// create the new user
const signUpUser = async (req, res) => {
  var { email, fullname, password, cpassword } = req.body;
  try {
    const hash = await bcrypt.hash(password, 8);
    password = hash;
    const user = await CMSUser.findOne({ email });
    console.log(user);
    if (user) {
      console.log(user);
      res.status(209).send({ status: 209 });
    } else {
      await CMSUser.create({ email, fullname, password });
      res.status(201).send({ status: 201, msg: "Successfull Created" });
      return;
    }
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something wrong please try again", res);
    return;
  }
};
// This is for CMS user login
const signInUser = async (req, res) => {
  const { password, email } = req.body;
  console.log(req.body);
  console.log(req.params);
  try {
    const user = await CMSUser.findOne({ email });
    console.log(user);
    if (!user) {
      console.log(user);
      res.status(404).send({ status: 404 });
      //      sendResponseError(400, 'You have to Sign up first !', res)
    } else {
      const same = await checkPassword(password, user.password);
      if (same) {
        let token = newToken(user);
        res.status(200).send({ status: 200, uid:user._id,uname:user.fullname,token:token,token });
        return;
      }
      sendResponseError(400, "InValid password !", res);
    }
  } catch (err) {
    console.log("EROR", err);
    sendResponseError(500, `Error ${err}`, res);
  }
};



// The register user for non CMS users
const registerUser = async (req, res) => {
  var { email, fullname, password, cpassword } = req.body;
  try {
    const hash = await bcrypt.hash(password, 8);
    password = hash;
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      console.log(user);
      res.status(209).send({ status: 209 });
    } else {
      await User.create({ email, fullname, password });
      res.status(201).send({ status: 201, msg: "Successfull Created" });
      return;
    }
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something wrong please try again", res);
    return;
  }
};

//This is non CMS users
const loginUser = async (req, res) => {
  const { password, email } = req.body;
  console.log(password)
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      console.log(user);
      res.status(404).send({ status: 404 });
      //      sendResponseError(400, 'You have to Sign up first !', res)
    } else {
      const same = await checkPassword(password, user.password);
      if (same) {
        let token = newToken(user);
        res.status(200).send({ status: 200, uid:user._id,uname:user.fullname,token });
        return;
      }
      sendResponseError(400, "InValid password !", res);
    }
  } catch (err) {
    console.log("EROR", err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const getUser = async (req, res) => {
  res.status(200).send({ user: req.user });
};
module.exports = { signUpUser, signInUser, getUser,loginUser, registerUser };
