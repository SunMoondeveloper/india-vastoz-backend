const Order = require("../models/Order");
const Product = require("../models/Product");

const mongoose = require("mongoose");

const getOrdersbyuserId = async (req, res) => {
  var { ownerid } = req.body;
  // console.log(ownerid);
  try {
    const products = await Order.find({ ownerid }).sort({ _id: -1 });
    console.log(products);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// const aggregationPipeline = [
//   {
//     $lookup: {
//       from: 'products',
//       localField: 'productId',
//       foreignField: '_id',
//       as: 'productDetails'
//     }
//   },
//   {
//     $unwind: '$productDetails'
//   },
//   {
//     $lookup: {
//       from: 'customers',
//       localField: 'customerId',
//       foreignField: '_id',
//       as: 'customerDetails'
//     }
//   },
//   {
//     $unwind: '$customerDetails'
//   },
//   {
//     $project: {
//       _id: 0, // Exclude the "_id" field
//       orderNumber: 1,
//       productName: '$productDetails.name',
//       customerName: '$customerDetails.name',
//       // Add other fields you want to include in the result
//     }
//   }
// ];


const getstudioOrders = async (req, res) => {
  var { ownerid } = req.body;
  console.log("%%%%%%%%%%%%")
  console.log('ownerid: ',ownerid);
  ownerid = '653ea18c1cf6e363b9e6d349';
  console.log('ownerid: ',ownerid);
  try {
    const pipeline = [
      {
        $lookup: {
          from: "addresses",
          localField: 'deliveryaddress',  
          foreignField: '_id',  
          as: "adata"  
        }
    },
      {
        $match: {
          studioid: mongoose.Types.ObjectId(ownerid),
        },
      },
      {
        $group: {
          _id: "$paymentid", // Group by the "payment_id" field
          totalAmount: {  $sum: { $multiply: ['$price', '$quantity']} },
          totalMPrice: {  $sum: { $multiply: ['$saleprice', '$quantity']} },
          totalquantity: { $sum: '$quantity' },
          orders: {
            $push: "$$ROOT" // Store the original documents in an array
          },
          addressdata: {
            $push: "$adata" // Store the original documents in an array
          }
        }
      },
      {
        $project: {
          _id: 0,          // Exclude the "_id" field
          createdAt:"$orders.createdAt",
          totalAmount:"$totalAmount",
          totalMPrice:"$totalMPrice",
          totalQty:"$totalquantity",
          paymentid: "$_id", // Rename "_id" to "payment_id"
          orders: 1        // Include the "orders" field
        }
      },
      {
        $sort: { createdAt: -1 }, // Sort the result by date in ascending order
      },
    ];

    // await Product.aggregate(pipeline)
    await Order.aggregate(pipeline)
      .exec()
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Orders by using studio Orderid
const getOrderByStudioId = async (req, res) => {
  var { studioid } = req.body;
  console.log("%%%%%%%%%%%%")
  console.log('studioid: ',studioid);
  studioid = '653ea18c1cf6e363b9e6d349';
  console.log('studioid: ',studioid);
  try {
    const pipeline = [
      {
        $lookup: {
          from: "addresses",
          localField: 'deliveryaddress',  
          foreignField: '_id',  
          as: "adata"  
        }
    },
      {
        $match: {
          studioid: mongoose.Types.ObjectId(studioid),
        },
      },
      {
        $group: {
          _id: "$paymentid", // Group by the "payment_id" field
          totalAmount: {  $sum: { $multiply: ['$price', '$quantity']} },
          totalMPrice: {  $sum: { $multiply: ['$saleprice', '$quantity']} },
          totalquantity: { $sum: '$quantity' },
          orders: {
            $push: "$$ROOT" // Store the original documents in an array
          },
          addressdata: {
            $push: "$adata" // Store the original documents in an array
          }
        }
      },
      {
        $project: {
          _id: 0,          // Exclude the "_id" field
          createdAt:"$orders.createdAt",
          totalAmount:"$totalAmount",
          totalMPrice:"$totalMPrice",
          totalQty:"$totalquantity",
          paymentid: "$_id", // Rename "_id" to "payment_id"
          orders: 1        // Include the "orders" field
        }
      },
      {
        $sort: { createdAt: -1 }, // Sort the result by date in ascending order
      },
    ];

    // await Product.aggregate(pipeline)
    await Order.aggregate(pipeline)
      .exec()
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// const getstudioOrders = async (req, res) => {
//   var { ownerid } = req.body;

//   try {
//     const pipeline = [
//       {
//         $lookup: {
//           from: "orders",
//           localField: "_id",
//           foreignField: "productid",
//           as: "orders",
//         },
//       },
//       {
//         $match: {
//           ownerid: mongoose.Types.ObjectId(ownerid),
//         },
//       },
//       {
//         $project: {
//           ownerid: 1,
//           productid: { $arrayElemAt: ["$orders.productid", 0] },
//           productname: { $arrayElemAt: ["$orders.productname", 0] },
//           productcategory: { $arrayElemAt: ["$orders.productcategory", 0] },
//           studioid: { $arrayElemAt: ["$orders.studioid", 0] },
//           orderid: { $arrayElemAt: ["$orders.orderid", 0] },
//           quantity: { $arrayElemAt: ["$orders.quantity", 0] },
//           price: { $arrayElemAt: ["$orders.price", 0] },
//           productthumbnail: { $arrayElemAt: ["$orders.productthumbnail", 0] },
//           saleprice: { $arrayElemAt: ["$orders.saleprice", 0] },
//           currency: { $arrayElemAt: ["$orders.currency", 0] },
//           status: { $arrayElemAt: ["$orders.status", 0] },
//           returnstatus: { $arrayElemAt: ["$orders.returnstatus", 0] },
//           returnduration: { $arrayElemAt: ["$orders.returnduration", 0] },
//           paymentgateway: { $arrayElemAt: ["$orders.paymentgateway", 0] },
//           paymentid: { $arrayElemAt: ["$orders.paymentid", 0] },
//           paymentstatus: { $arrayElemAt: ["$orders.paymentstatus", 0] },
//           paymentrefundstatus: {
//             $arrayElemAt: ["$orders.paymentrefundstatus", 0],
//           },
//           deliveryaddressid: { $arrayElemAt: ["$orders.deliveryaddressid", 0] },
//           paymentid: { $arrayElemAt: ["$orders.paymentid", 0] },
//           createdAt: { $arrayElemAt: ["$orders.createdAt", 0] },
//           // { $arrayElemAt: ["$pdata.returnduration", 0] }
//           commission: 1,
//         },
//       },
//     ];

//     await Product.aggregate(pipeline)
//       .exec()
//       .then((result) => {
//         console.log(result);
//         res.json(result);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

const getOrdersbyuserId1 = async (req, res) => {
  var { ownerid } = req.body;

  try {
    const pipeline = [
      {
          $lookup: {
            from: "addresses",
            localField: 'deliveryaddress',  
            foreignField: '_id',  
            as: "adata"  
          }
      },
      {
        $match: {
          ownerid: mongoose.Types.ObjectId(ownerid),
        },
      },
      {
        $group: {
          _id: "$paymentid", // Group by the "payment_id" field
          totalAmount: {  $sum: { $multiply: ['$price', '$quantity']} },
          totalMPrice: {  $sum: { $multiply: ['$saleprice', '$quantity']} },
          // totalAmount: { $sum: '$price' },
          // totalMPrice: { $sum: '$saleprice' },
          totalquantity: { $sum: '$quantity' },
          orders: {
            $push: "$$ROOT" // Store the original documents in an array
          },
          addressdata: {
            $push: "$adata" // Store the original documents in an array
          }
        }
      },
      
       
      {
        $project: {
          _id: 0,          // Exclude the "_id" field
          createdAt:"$orders.createdAt",
          totalAmount:"$totalAmount",
          totalMPrice:"$totalMPrice",
          totalQty:"$totalquantity",
          paymentid: "$_id", // Rename "_id" to "payment_id"
          orders: 1,      // Include the "orders" field
          invoiceid:1,
        }
      },
      {
        $sort: { createdAt: -1 }, // Sort the result by date in ascending order
      },
    ];

    await Order.aggregate(pipeline)
      .exec()
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  getOrdersbyuserId,
  getOrdersbyuserId1,
  getstudioOrders,
  getOrderByStudioId,
};
