const Cart = require("../models/Cart");
const Salestax = require("../models/Salestax");
const Address = require("../models/Address");

const mongoose = require("mongoose");
const axios = require('axios');

const { v4: uuidv4 } = require('uuid');
const Transaction = require("../models/Transaction");
const { sendResponseError } = require("../middleware/middleware");


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

// const getCartbyuserId = async (req, res) => {
//   var { ownerid } = req.body;
//   //console.log(ownerid);

//   try {
//     const pipeline = [
//       {
//         $lookup: {
//           from: "products",
//           localField: "productid",
//           foreignField: "_id",
//           as: "pdata",
//         },
//       },
//       {
//         $match: {
//           ownerid: mongoose.Types.ObjectId(ownerid),
//         },
//       },
//       {
//         $lookup: {
//           from: "salestaxes",
//           let: { warehouseZipCode: "$warehousezipcode" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $gte: ["$$warehouseZipCode", "$zipstart"] }, // Greater than or equal to zipstart
//                     { $lte: ["$$warehouseZipCode", "$zipend"] }   // Less than or equal to zipend
//                   ]
//                 }
//               }
//             }
//           ],
//           as: "salestaxdata"
//         }
//       },
//       {
//         $project: {
//           productid: 1,
//           quantity: 1,
//           ownerid: 1,
//           productthumbnail: 1,
//           warehousezipcode:1,
//           productname: "$pdata.productname",
//           productcategory: "$pdata.productcategory",
//           brandname: "$pdata.brandname",
//           price: "$pdata.price",
//           discount: "$pdata.discount",
//           saleprice: "$pdata.saleprice",
//           price: "$pdata.price",
//           salestaxdata:"$salestaxdata.statetaxrate",
//         },
//       },
//     ];

//     await Cart.aggregate(pipeline)
//       .exec()
//       .then((result) => {
//          console.log(result);
//         res.json(result);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   } catch (err) {
//     console.log(err);
//     sendResponseError(500, `Error ${err}`, res);
//   }
// };

const getCartbyuserId = async (req, res) => {
  var { ownerid } = req.body;
  //console.log(ownerid);

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
          ownerid: mongoose.Types.ObjectId(ownerid),
        },
      },
      {
        $lookup: {
          from: "salestaxes",
          let: { warehouseZipCode: "$warehousezipcode" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $gte: ["$$warehouseZipCode", "$zipstart"] }, // Greater than or equal to zipstart
                    { $lte: ["$$warehouseZipCode", "$zipend"] }   // Less than or equal to zipend
                  ]
                }
              }
            }
          ],
          as: "salestaxdata"
        }
      },
      {
        $project: {
          productid: 1,
          quantity: 1,
          ownerid: 1,
          productthumbnail: 1,
          warehousezipcode:1,
          productname: "$pdata.productname",
          productcategory: "$pdata.productcategory",
          brandname: "$pdata.brandname",
          price: "$pdata.price",
          discount: "$pdata.discount",
          saleprice: "$pdata.saleprice",
          price: "$pdata.price",
          salestaxdata:"$salestaxdata.statetaxrate",
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
const getCheckoutcartbyUserID = async (req, res) => {
  var { ownerid } = req.body;
  console.log(ownerid);
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
          ownerid: mongoose.Types.ObjectId(ownerid),
        },
      },
      {
        $project: {
          _id: 0,
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: { $arrayElemAt: ["$pdata.productname", 0] },
            },
            unit_amount: {
              $multiply: [
                { $arrayElemAt: ["$pdata.saleprice", 0] }, // Extract the first element of the array
                100, // Replace 2 with the value you want to multiply by
              ],
            },
          },
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

const test = async (req, res) => {
  var { ownerid } = req.body;
  //  const ownerid = '6528e7ce6a84874313303f38'
  console.log(ownerid);
  const UID= ownerid+"-"+uuidv4();
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
          ownerid: mongoose.Types.ObjectId(ownerid),
        },
      },
      {
        $unwind: "$pdata",
      },
      {
        $group: {
          _id: 0,
          totalSum: { $sum: "$pdata.price" },
        },
      },
      {
        $project: {
          _id: 0,
          // appid: "917cec83af22cd3d38a08fcc1b26dacd", // it chairman store
          // appkey: "xdYFgtCWW51mF6A3E0JR5C41d9z5Indz", // chairman store
          // epi: "2328219382", // chairman store
          appid: "LLyFs6TnKOQax1njpGDrngIhZqFW7MJb", // ylift
          appkey: "DsY1vZgX7YHlTvjx0trOFmtYk8qSWW68", // ylift
          epi: "2225008366", //ylift
          redirect_url:
            "http://indev.vastoz.com:5454/api/Checkout/valorsuccess?uid="+UID,
          ignore_surcharge_calc: "0",
          success_url:
            "http://indev.vastoz.com:5454/homePage/Cart/Checkout/success",
          failure_url:
            "http://indev.vastoz.com:5454/homePage/Cart/Checkout/failure",
          txn_type: "sale",
          // amount: "$totalSum", // Change this to the actual total sum
          amount: "1", // Change this to the actual total sum
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





// const testvalorpayCheckoutcartbyUserID = async (req, res) => {
  // const test= async (req, res) => {
const valorpayCheckoutcartbyUserID = async (req, res) => {
  try{
    // var { ownerid } = req.body;
    //  const ownerid = '6509dc89db26d97545f59dac'
    console.log('valorpayCheckoutcartbyUserID');
     const ownerid = '653eadbc2ac162683ea0bf57'
     const deliveryaddress = '653fde44179ab898b9a42be2'
     const deliverycharge = 35
     const deliverymethod = "FedexGround"
    //const ownerid = '6528e7ce6a84874313303f38'
  
   
    const address = await Address.findById(deliveryaddress);
      console.log(address)
     const url= 'https://api.api-ninjas.com/v1/salestax?zip_code=' + address.zipcode;
       const restaxrate = await axios.get(url,{
      headers: {
        'X-Api-Key': 'X5LfkERpjwlKqN9SiDT6Rw==J6lfwHXUhRzPKS8e'
      }}
      );
  
      console.log('====================================');
      console.log(url);
      const taxrate = Number(restaxrate.data[0].total_rate).toFixed(2);
      console.log(taxrate);
      console.log('====================================');
  
    console.log(ownerid);
    const epochtime = Math.floor(+new Date() / 1000)
    // const transactionid= ownerid+"-"+uuidv4();
    const transactionid= ownerid+"-"+epochtime;
  
    const invoiceid = "VZ-"+epochtime+"-"+ownerid
    
    console.log(invoiceid);
    console.log("=================================++++++++++++++++++");
    //   deliveryaddress: {
  
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
            ownerid: mongoose.Types.ObjectId(ownerid),
          },
        },
        {
          $unwind: "$pdata",
        },
        {
          $group: {
            _id: 0,
  
            // totalSum: { $sum: "$pdata.saleprice" },
            // percentage: { $multiply: [{ $divide: ["$totalSales", "$total"] }, 100] }
            // percentage: { $multiply: [{ $divide: ["$totalSales", "$total"] }, 100] }
            // totaltax: {  $sum: { $multiply: ["$salestaxdata.statetaxrate", "$quantity"] } },
  
            totalSum: { $sum: { $multiply: ["$pdata.saleprice", "$quantity"] } }
            // percentage : { $multiply: [{ $divide: ["$total", "$total"] }, 100] }
  
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
              "http://indev.vastoz.com:5454/api/Checkout/valorsuccess?tid="+transactionid,
            ignore_surcharge_calc: "0",
            success_url:
              "http://indev.vastoz.com:5454/homePage/Cart/Checkout/success",
            failure_url:
              "http://indev.vastoz.com:5454/homePage/Cart/Checkout/failure",
            txn_type: "sale",
            amount: "$totalSum", // Change this to the actual total sum
            salestaxdata:"$salestaxdata",
            totaltax:"$totaltax",
            // amount: "1", // Change this to the actual total sum
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
        .then(async (result) => {
          console.log(result[0].amount)
          console.log(result);
          const totalamount = result[0].amount
          const taxamount = (totalamount*taxrate)/100
          await Transaction.create({ invoiceid, transactionid, totalamount,taxamount,taxrate,deliverycharge,deliverymethod,deliveryaddress});
          
          res.json(result);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.log(err);
      sendResponseError(500, `Error ${err}`, res);
    }

  }catch(err){
    sendResponseError(500, `Error ${err}`, res);
  }
};

const addProductInCart = async (req, res) => {
  const { productid, ownerid, quantity, warehousezipcode,productthumbnail } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { productid },
      { productid, ownerid, warehousezipcode,productthumbnail, $inc: { quantity: quantity } },
      { upsert: true }
    );
    res.status(201).send({ status: "ok", cart });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

// increase decrease the count
const cartcount = async (req, res) => {
  const { cartid, ownerid, quantity } = req.body;
  console.log(cartid);
  try {
    const cart = await Cart.findByIdAndUpdate(cartid, {
      $inc: { quantity: quantity },
    });
    res.status(201).send({ status: "ok", cart });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const deleteProductInCart = async (req, res) => {
  const { cartid, ownerid } = req.body;
  try {
    await Cart.findByIdAndRemove(cartid);
    res.status(200).send({ status: "ok" });
  } catch (e) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

module.exports = {
  test,
  addProductInCart,
  deleteProductInCart,
  getCartProducts,
  getCartbyuserId,
  getCartcountbyuserId,
  cartcount,
  getCheckoutcartbyUserID,
  valorpayCheckoutcartbyUserID,
};
