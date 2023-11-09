const Product = require("../models/Product");
const Productmedia = require("../models/Productmultimedia");

const mongoose = require('mongoose');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ name });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getallProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// const getProductById = async (req, res) => {
//   try {
//     // const product = await Product.findById(req.params.id);
//     const product = await Product.findById(req.params.id);
//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

const getProductById = async (req, res) => {
  var {
    id,
  } = req.params;
 console.log(req.params)
  const filter = { _id: id}; // Define the filter to match the document you want to update

  try {
    const pipeline = [
      {
        $lookup: {
          from: "productmedias",
          localField: '_id',  
          foreignField: 'productid',  
          as: "images"  
        }
      },
      {
        $match: {
          "_id": mongoose.Types.ObjectId(id) 
        }
      },
      {
        $project: {
          "productname": 1,
          "productcategory":1,
          "brandname":1,
          "vendorname":1,
          "description":1,
          "price":1,
          "discount":1,
          "stock":1,
          "details":1,
          "saleprice":1,
          "commission":1,
          "warehousezipcode":1,
          "images": "$images",
        }
      }
    ];

    await Product.aggregate(pipeline)
  .exec()
  .then((result) => {
    console.log(result)
    res.json(result[0]);
  })
  .catch((error) => {
    console.error(error);
  });
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}; 

const getProductBycategoryname = async (req, res) => {
  var {
    categoryname,
  } = req.body;

  const filter = { productcategory: categoryname}; // Define the filter to match the document you want to update

  try {
    const pipeline = [
      {
        $lookup: {
          from: "productmedias",
          localField: '_id',  
          foreignField: 'productid',  
          as: "images"  
        }
      },
      {
        $match: {
          "productcategory": categoryname 
        }
      },
      {
        $project: {
          "productname": 1,
          "productcategory":1,
          "brandname":1,
          "price":1,
          "discount":1,
          "saleprice":1,
          "commission":1,
          "warehousezipcode":1,
          "images": "$images.url",
        }
      }
    ];

    await Product.aggregate(pipeline)
  .exec()
  .then((result) => {
    // console.log(result)
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


const getProductbyuserById = async (req, res) => {
  var {
    ownerid,
  } = req.body;

    // const products = await Product.find(filter);
    try {
      const products = await Product.find({ownerid}).sort({ _id: -1 });
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
   
}; 


const getProductimageurlById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(JSON.stringify(product.imageUrl));

    res.json(product.imageUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


const addProduct = async (req, res) => {
  var {
    productname,
    vendorname,
    brandname,
    ownerid,
    stock,
    sku,
    price,
    discount,
    saleprice,
    description,
    width,
    warehousezipcode,
    height,
    length,
    vastlink,
    productcategory,
    returnduration,
    details,
    weightoz,
    weightlb,
    deliverymethod,
    returnmethod,
  } = req.body;
  
  console.log(req.body);
  try {
    const result = await Product.create({
      productname,
      brandname,
      ownerid,
      vendorname,
      stock,
      sku,
      warehousezipcode,
      price,
      discount,
      saleprice,
      description,
      width,
      height,
      length,
      weightoz,
      weightlb,
      vastlink,
      productcategory,
      returnduration,
      details,
      deliverymethod,
      returnmethod,
    });
    console.log(result)
    const insertedProductId = result._id;
    console.log('Inserted product ID:', insertedProductId);
    res.status(201).send({ status: 201, id: insertedProductId }); // created the studio
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};



const manageProduct = async (req, res) => {
  var {
    productid,
    productname,
    vendorname,
    brandname,
    ownerid,
    stock,
    sku,
    price,
    discount,
    saleprice,
    description,
    width,
    height,
    length,
    vastlink,
    productcategory,
    warehousezipcode,
    returnduration,
    details,
    weightoz,
    weightlb,
    deliverymethod,
    returnmethod,
  } = req.body;

  if(!productid)
    productid=mongoose.Types.ObjectId()

  console.log(req.body);
  try {
    // findOneAndUpdate(
    //   { productid },
    //   { productid, ownerid, productthumbnail, $inc: { quantity: quantity } },
    //   { upsert: true }
    // );
    const result = await Product.findByIdAndUpdate( productid,{
      productname,
      brandname,
      ownerid,
      vendorname,
      stock,
      sku,
      price,
      discount,
      saleprice,
      description,
      warehousezipcode,
      width,
      height,
      length,
      weightoz,
      weightlb,
      vastlink,
      productcategory,
      returnduration,
      details,
      deliverymethod,
      returnmethod,
    },{ new: true,upsert: true });
    console.log(result)
    const insertedProductId = result._id;
    console.log('Inserted product ID:', insertedProductId);
    res.status(201).send({ status: 201, id: insertedProductId }); // created the studio
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};
const addimageProduct = async (req, res) => {
  var {
    productid,
    imageurllist
  } = req.body;
  const filter = { _id: productid }; // Define the filter to match the document you want to update
  const update = {
    isimageupload: true,
     imageUrl: imageurllist  // Specify the field and its new value
  };
  console.log(req.body);
  try {
    await Product.updateOne(filter, update)
    res.status(201).send({ status: 201, msg: "Successfull Created" }); // created the studio
    return;
  } catch (err) {
    console.log("Eorror : ", err);
    sendResponseError(500, "Something went wrong please try again", res);
    return;
  }
};
module.exports = {
  getProducts,
  getProductById,
  addProduct,
  manageProduct,
  getallProducts,
  addimageProduct,
  getProductimageurlById,
  getProductBycategoryname,
  getProductbyuserById
};
