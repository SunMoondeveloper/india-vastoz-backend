const Address = require("../models/Address");
const mongoose = require("mongoose");
const Cart = require("../models/Cart");


//non cms users
const calculatecartDCbyuserid = async (req, res) => {
  var { ownerid,deliveryaddressid } = req.body;
  // console.log(ownerid);
  // var ownerid='6528e7ce6a84874313303f38'
  // var deliveryaddressid='653cf386b81d142055017038'
  const deliverpipeline = [
    {
      $match: {
        _id: mongoose.Types.ObjectId(deliveryaddressid),
      },
    },
    {
      $project: {
        _id: 0,  
        address: {
          postalCode: "$zipcode",
          countryCode: "US",
        },
      }
    }
  ];

  try {
    const deliverydata = await Address.aggregate(deliverpipeline)

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
          accountNumber:{
            value: "202337354",
          },
          _id: 0,
          quantity:1,
          shipper:{
            address:{
          postalCode:  { $arrayElemAt: ["$pdata.warehousezipcode", 0] },
          countryCode: "US",

            }
          },
          weight: {
            units: "LB",
            value:{
            $multiply: [
              { $arrayElemAt: ["$pdata.weightlb", 0] }, // Extract the first element of the array
              "$quantity", // Replace 2 with the value you want to multiply by
            ],
          },
            // value: { $arrayElemAt: ["$pdata.weightlb", 0] },
            // value: '10',
          },
        },
      },
    ];

    await Cart.aggregate(pipeline)
      .exec()
      .then((result) => {
        console.log(result);
    res.status(200).json({ seller:result,buyer: deliverydata});
        
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }


};

const setdeliveryAddressbyuserId = async (req, res) => {
  var { ownerid } = req.body;
  try {
    // const address = await Address.find({ownerid}).sort({ _id: -1 });
    const address = await Address.find().sort({ _id: -1 });
    res.json(address);

  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};


module.exports = {
  calculatecartDCbyuserid,
};
