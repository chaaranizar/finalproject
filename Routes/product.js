const express = require("express") ;
const router = express.Router();
const { getproducts, getOneProduct} = require("../controllers/product");










router.get ("/allproducts",   getproducts)

router.get('/:_id',  getOneProduct) 



module.exports = router;