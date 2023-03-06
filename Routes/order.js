const express = require("express") ;
const { postOrder, getOrders, deleteOrder } = require("../controllers/order");
const router = express.Router();


router.post('/postOrder', postOrder)

router.get('/allOrders', getOrders)

router.delete('/:_id', deleteOrder);

module.exports = router;