const Product = require('../models/Products');
const dotenv = require("dotenv");
const connectDB = require('../config/connectDB');

const products = require('../data/product.json');

// setting Dotenv file
dotenv.config();

connectDB();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log ('Products are deleted');

        await Product.insertMany(products);
        console.log('All products are added');
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();