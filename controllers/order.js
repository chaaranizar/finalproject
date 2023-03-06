const Order = require('../models/Order')



exports.postOrder = async(req,res) => {

    const { email , productitle , address , phone  } = req.body
    
        try {
           
            const newOrder = new Order ({...req.body })
            
    
            await newOrder.save()
            
   
            res.status(200).send({success : [{msg:"Commande envoyée...veuillez attendre un appel de confirmation"}] , newOrder })

        } catch (error) {
            res.status(400).send({ errors : [{ msg : "Commande non envoyée ... "}]})   
        }
    }
    

    exports.getOrders = async (req,res) => {
        try {
            const listOrder = await Order.find();
            res.status(200).send({msg : 'Orders',  listOrder})
            
        } catch (error) {
            res.status(400).send({msg : 'cannot get all Orders', error})
        }
      }


      exports.deleteOrder = async (req,res) => {
        try {
            const{_id}= req.params;
            await Order.findOneAndDelete({_id})
            res.status(200).send({msg : "Order deleted"})
        } catch (error) {
            res.status(400).send({msg : "cannot delete this Order", error})      
        }
    }           