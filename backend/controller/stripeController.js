const Stripe = require("../models/Stripepayment");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const mongoose = require("mongoose");

const addStripedata = async (req, res) => {
  var {
    id,
    amount,
    amountreceived,
    capturemethod,
    clientsecret,
    currency,
    latestcharge,
    paymentmethod,
    status,
  } = req.body;

  console.log(req.body);
  try {
    await Stripe.create({
      stripeid: id,
      amount,
      amountreceived,
      capturemethod,
      clientsecret,
      currency,
      latestcharge,
      paymentmethod,
      status,
    });
    res.status(201).send({ status: 201, msg: "Successfull Created" }); // created the studio
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};

const stripecomplete = async (req, res) => {
  var { payment_intent, metadata, status } = req.body;
  console.log(metadata.userid);
  const userid = metadata.userid;
  const paymentgateway = "stripe"
  try {
    // const products = await Product.find(filter);
    const pipeline = [
      {
        $lookup: {
          from: "products",
          localField: "productid",
          foreignField: "_id",
          as: "pdata",
        },
      },
      {
        $match: {
          ownerid: mongoose.Types.ObjectId(userid),
        },
      },
      {

        $project: {
          _id:0,
          productid: 1,
          quantity: 1,
          paymentid:payment_intent,
          ownerid: 1,
          productthumbnail: 1,
          paymentgateway:paymentgateway,
          returnduration: { $arrayElemAt: ["$pdata.returnduration", 0] },
          productname: { $arrayElemAt: ["$pdata.productname", 0] },
          productcategory:{ $arrayElemAt: [ "$pdata.productcategory", 0] },
          brandname:{ $arrayElemAt: [ "$pdata.brandname", 0] },
          price:{ $arrayElemAt: [ "$pdata.price", 0] },
          currency: { $arrayElemAt: ["$pdata.sellingcurrency", 0] },
          discount: { $arrayElemAt: [ "$pdata.discount", 0] },
          saleprice:{ $arrayElemAt: [ "$pdata.saleprice", 0] },
          price:{ $arrayElemAt: [ "$pdata.price", 0] },
        },
      },
    ];

    await Cart.aggregate(pipeline)
      .exec()
      .then((result) => {
        console.log(result);
        Order.create(result);
        res.status(201).send({ status: 201, msg: "Order Successfull" }); // created the studio
      })
      .catch((error) => {
        console.error(error);
      });
      // remove the values from cart
      await Cart.deleteMany({ownerid: mongoose.Types.ObjectId(userid)});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addStripedata,
  stripecomplete,
};
