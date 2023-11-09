const Cart = require("../models/Cart");
const mongoose = require("mongoose");

const getCartProducts = async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.user._id }).populate(
      "productId"
    );
    // console.log(carts)
    res.status(200).send({ status: "ok", carts });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const getCartcountbyuserId = async (req, res) => {
  var { ownerid } = req.body;

  try {
    const cartscount = await Cart.countDocuments({ ownerid: ownerid });
    res.status(200).send({ count: cartscount });
    // res.json(cartscount);
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

// const getCartbyuserId = async (req, res) => {
//   var {
//     ownerid,
//   } = req.body;

// try {
//   const carts = await Cart.find({ ownerid: ownerid })
//   res.json(carts);
// } catch (err) {
//   console.log(err);
//   sendResponseError(500, `Error ${err}`, res);
// }
// };

const getCartbyuserId = async (req, res) => {
  var { ownerid } = req.body;
  // console.log(ownerid);
  try {
    const pipeline = [
      {
        $lookup: {
          from: "products",
          localField: "productid",
          foreignField: "_id",
          as: "images",
        },
      },
      {
        $match: {
          ownerid: mongoose.Types.ObjectId(ownerid),
        },
      },
      {
        $project: {
          productid: 1,
          quantity: 1,
          ownerid: 1,
          productthumbnail: 1,
          productname: "$images.productname",
          productcategory: "$images.productcategory",
          brandname: "$images.brandname",
          price: "$images.price",
          discount: "$images.discount",
          saleprice: "$images.saleprice",
          price: "$images.price",
        },
      },
    ];

    await Cart.aggregate(pipeline)
      .exec()
      .then((result) => {
        // console.log(result);
        res.json(result);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const getCheckoutcartbyUserID = async (req, res) => {
  var { ownerid } = req.body;
  console.log(ownerid);
  console.log("=================================++++++++++++++++++");
  try {

    const pipeline = [
      {
        $lookup: {
          from: "carts",
          localField: "_id",
          foreignField: "productid",
          as: "images",
        },
      },
      {
        $match: {
          ownerid: mongoose.Types.ObjectId(ownerid),
        },
      },
      {
        $project: {
          productid: 1,
          quantity: 1,
          ownerid: 1,
          productthumbnail: 1,
          productname: "$images.productname",
          productcategory: "$images.productcategory",
          brandname: "$images.brandname",
          price: "$images.price",
          discount: "$images.discount",
          saleprice: "$images.saleprice",
          price: "$images.price",
        },
      },
    ];

    await Cart.aggregate(pipeline)
      .exec()
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const addProductInCart = async (req, res) => {
  const { productid, ownerid, quantity, productthumbnail } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { productid },
      { productid, ownerid, productthumbnail, $inc: { quantity: quantity } },
      { upsert: true }
    );

    res.status(201).send({ status: "ok", cart });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const cartcount = async (req, res) => {
  const { productid, ownerid, quantity } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { productid },
      { $inc: { quantity: quantity } }
    );
    res.status(201).send({ status: "ok", cart });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    await Cart.findByIdAndRemove(req.params.id);
    res.status(200).send({ status: "ok" });
  } catch (e) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};
module.exports = {
  addProductInCart,
  deleteProductInCart,
  getCartProducts,
  getCartbyuserId,
  getCartcountbyuserId,
  cartcount,
  getCheckoutcartbyUserID,
};
