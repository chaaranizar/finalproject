const Product = require("../models/Product")
const cloudinary = require("../utils/cloudinary");


exports.addproduct = async(req,res)=> {

    try {
       
       // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "gameuniverse"
    });
    // Create new user
    let newProduct = new Product({
        title: req.body.title,
        release_date: req.body.release_date,
        description: req.body.description,
        ratings: req.body.ratings,
        price: req.body.price,
        product_img: result.secure_url,
        cloudinary_id: result.public_id,
        device: req.body.device,
        category: req.body.category,
        stock: req.body.stock,
        
    });
    // save user details in mongodb
    await newProduct.save({validateBeforeSave: false})
        
    res.status(200).send({ success : [{msg : 'Product added'}] , newProduct})
        
    } catch (error) {
        res.status(400).send({msg : 'Sorry cannot add product', error})   
    }
}




exports.deleteproduct = async (req,res) => {
    try {
        const{_id}= req.params;
        // Find user by id
    let product = await Product.findById({_id});
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(product.cloudinary_id);
    // Delete user from db
    await product.remove({validateBeforeSave: false});
        res.status(200).send({msg : "Product deleted"})
    } catch (error) {
        res.status(400).send({msg : "cannot delete this Product", error})      
    }
}


exports.getproducts = async (req,res) => {
    try {
        const listProducts = await Product.find();
        res.status(200).send({msg : 'Products list',listProducts})
        
    } catch (error) {
        res.status(400).send({msg : 'cannot get all Products', error})
    }
  }


  exports.getOneProduct = async (req,res) => {
    const{_id}= req.params;

   try{ 
    const productToGet = await Product.findOne(req.params);
    res.status(200).send({msg : 'get product ',productToGet})
    
} catch (error) {
    res.status(400).send({msg : 'fail to get product ', error})
} }

