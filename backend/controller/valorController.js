const Stripe = require("../models/Stripepayment");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Transaction = require("../models/Transaction");

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

const valorcomplete = async (req, res) => {
  var { payment_intent, tid, status } = req.body;
  console.log(tid);
  console.log("))))))))))))))");
  const userid = tid.split('-')[0];
  // const ownerid = '6509dc89db26d97545f59dac'
  // const ownerid = '653eadbc2ac162683ea0bf57'
  // const addressid = '653fde44179ab898b9a42be2'
  // tid = '653eadbc2ac162683ea0bf57-1698790786'
  // const userid = ownerid
  const paymentgateway = "valorpayment"
  try {
    const restrans  = await Transaction.find({transactionid:tid});
    console.log(restrans)
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
        $unwind: "$pdata",
      },
      // {
      //   $lookup: {
      //     from: "addresses",
      //     let: { aid: mongoose.Types.ObjectId(addressid) },
      //     pipeline: [
      //         {
      //           $match: {
      //             $expr: { $eq: ["$_id", "$$aid"] }, // Compare the _id field with the `aid` variable
      //           }
      //         }
      //     ],
      //     as: "addressdata"
      //   }
      // },
      {
        $project: {
          _id:0,
          productid: 1,
          quantity: 1,
          paymentid:payment_intent,
          ownerid: 1,
          productthumbnail: 1,
          invoiceid:restrans[0].invoiceid,
          studioid:"$pdata.ownerid",
          taxrate:restrans[0].taxrate,
          deliverycharge:restrans[0].deliverycharge,
          deliveryaddress:restrans[0].deliveryaddress,
          paymentgateway:paymentgateway,
          returnduration: "$pdata.returnduration",
          productname: "$pdata.productname",
          productcategory:"$pdata.productcategory",
          brandname: "$pdata.brandname",
          price: "$pdata.price",
          currency: "US",
          discount: "$pdata.discount",
          saleprice: "$pdata.saleprice",
          price: "$pdata.price",
          salestax:"$addressdata.zipcode",
          // totalprice: {  $sum: { $multiply: ["$pdata.saleprice", "$quantity"]} },
          // taxamount: {  $sum: { $multiply: ["$pdata.saleprice", "$quantity"]} },
          // taxamount: {  $divide:[{ $multiply: [  { $sum: { $multiply: ["$pdata.saleprice", "$quantity"]}}, "$salestaxdata.statetaxrate"]},100]},
          
          // totalSum: {  $sum: { $multiply: [ $arrayElemAt: ["$pdata.saleprove", 0], "$quantity"]} },
        },
      },
    ];

    await Cart.aggregate(pipeline)
      .exec()
      .then((result) => {
        console.log(result);
        // res.json(result);
        Order.create(result);
        res.status(201).send({ status: 201, msg: "Order Successfull" }); // created the studio
      })
      .catch((error) => {
        console.error(error);
      });
      // remove the values from cart
      // await Cart.deleteMany({ownerid: mongoose.Types.ObjectId(userid)});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const valorSubscription = async (req, res) => {
  // var { ownerid } = req.body;
  //  const ownerid = '6528e7ce6a84874313303f38'
  // console.log(ownerid);
  console.log("valorSubscription");
  // const UID= ownerid+"-"+uuidv4();
  console.log("=================================++++++++++++++++++");
  try {
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
          // ownerid: mongoose.Types.ObjectId(ownerid),
        },
      },
      {
        $unwind: "$pdata",
      },
      {
        $group: {
          _id: 0,
          //totalSum: { $sum: "$pdata.price" },
        },
      },
      {
        $project: {
          _id: 0,
          appid: "917cec83af22cd3d38a08fcc1b26dacd", // it chairman store
          appkey: "xdYFgtCWW51mF6A3E0JR5C41d9z5Indz", // chairman store
          epi: "2328219382", // chairman store
          // appid: "LLyFs6TnKOQax1njpGDrngIhZqFW7MJb", // ylift
          // appkey: "DsY1vZgX7YHlTvjx0trOFmtYk8qSWW68", // ylift
          // epi: "2225008366", //ylift
          redirect_url:
            "http://indev.vastoz.com:5454/api/Checkout/valorsuccess",
          ignore_surcharge_calc: "0",
          success_url:
            "http://incms.vastoz.com:5454/cmslogin",
          failure_url:
            "http://indev.vastoz.com:5454/homePage/Cart/Checkout/failure",
          txn_type: "sale",
          // amount: "$totalSum", // Change this to the actual total sum
          amount: "10", // Change this to the actual total sum
          invoicenumber:"Invtest420",
          orderdescription: "sample products",
          surcharge: "0",
          tax: "0",
          epage: "1",
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

const testvalorcomplete = async (req, res) => {
  var { payment_intent, uid, status } = req.body;
  console.log(uid);
  const userid = uid.split('-')[0];
  const paymentgateway = "valorpayment"
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
  valorcomplete,
  testvalorcomplete,
  valorSubscription,
};
