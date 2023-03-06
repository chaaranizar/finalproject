const express = require("express") ;
const { loginAdmin, updateAdminInfos, updateAdminPassword } = require("../controllers/admin");
const { getusers, deleteUser } = require("../controllers/user");
const isAuthAdmin = require("../Middleware/isAuthAdmin");
const isAdmin = require("../Middleware/isAdmin");
const { validation, loginValidator } = require("../Middleware/validator");
const upload = require("../utils/multer");
const { updateProduct, deleteproduct, addproduct } = require("../controllers/product");


const router = express.Router();

router.post('/loginAdmin', validation , loginValidator(), loginAdmin)
router.get ("/currentAdmin" , isAuthAdmin , (req,res) =>{res.send(req.admin)})


router.get ("/allusers" , getusers)
router.delete("/user/:id", deleteUser);
router.put('/:_id',updateAdminInfos) 
router.put('/password/:_id',updateAdminPassword) 


router.delete('/product/:_id',  deleteproduct);
router.post('/products/addProduct', upload.single("product_img"), addproduct);
module.exports = router;