const express = require("express");
const Salestax = require("../models/Salestax");

// const getSalestaxbyzipcode = async (req, res) => {
//   var { dzipcode } = req.body;
//   const zipcode = parseInt(dzipcode)
// console.log('====================================');
// console.log(zipcode);
// console.log('====================================');
//   try {
//     const pipeline = [
//       {
//         $match: {
//           $expr: {
//             $and: [
//               { $gte: [zipcode, "$zipstart"] }, // Greater than or equal to zipstart
//               { $lte: [zipcode, "$zipend"] }, // Less than or equal to zipend
//             ],
//           },
//         },
//       },
//       {
//         $project: {
//           _id:0,
//           statetaxrate:1,
//           state:1,
//         },
//       },
      
//     ];

//     await Salestax.aggregate(pipeline)
//       .exec()
//       .then((result) => {
//         console.log(result[0]);
//         res.json(result[0]);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   } catch (err) {
//     console.log(err);
//     sendResponseError(500, `Error ${err}`, res);
//   }
// };

const getSalestaxbyzipcode = async (req, res) => {
  var { state } = req.body;
  console.log(req.body)
  try{
  const result = await Salestax.findOne({ state });
        console.log(result);
        res.json(result);
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};
module.exports = { getSalestaxbyzipcode, };
