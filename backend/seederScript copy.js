require('dotenv').config()

const productData = require('./data/products')
const {connectDB} = require('./config/db')
const Product = require('./models/Product')
const Salestax = require('./models/Salestax')
const salestaxData = require('./data/saletax')

const categoryData = require('./data/category')
const Category = require('./models/Category')

connectDB()

const importData = async () => {
  try {
    // await Product.deleteMany({})

    // await Product.insertMany(productData)

    await Category.deleteMany({})
    await Category.insertMany(categoryData)
    
    await Salestax.deleteMany({})
    await Salestax.insertMany(salestaxData)

    console.log('Data Import Success')

    process.exit()
  } catch (error) {
    console.error('Error with data import', error)
    process.exit(1)
  }
  
}

importData()
