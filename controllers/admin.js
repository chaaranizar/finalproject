const Admin = require("../models/Admin")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


exports.loginAdmin = async(req,res) =>{
    try {
        const {email , password } = req.body ;
        
        //check email existance : 
        const foundAdmin = await Admin.findOne({email})
        if (!foundAdmin){
            return res.status(400).send({errors : [{ msg : "bad credential !!"}]})
        }
        const checkPassword = await bcrypt.compare(password,  foundAdmin.password)
        if (!checkPassword){
        return res.status(400).send({errors : [{ msg : "bad credential !!"}]})
    }
    const token = jwt.sign({
        id : foundAdmin._id,  isAdmin : foundAdmin.isAdmin 
    },
    process.env.SECRET_KEY,{expiresIn: "72h"}
    )
    res.status(200).send ({msg : "Login sucess... welcome back" , user : foundAdmin , token})



    } catch (error) {
        res.status(400).send({errors : [{ msg : "Can not find user !!"}]})
        
    }
}


exports.updateAdminInfos = async(req,res) =>{
    try {
        const{_id}= req.params;
        const { firstname , name , email }  = req.body;      

        const updatedAdmin = await Admin.findOneAndUpdate(req.params, {$set:{...req.body}})     
        
      
        const updateddAdmin = new Admin({...req.body})
      
        const token = jwt.sign({
            id : updatedAdmin._id,
        },
        process.env.SECRET_KEY,{expiresIn: "72h"}
        )
        
        await updatedAdmin.save()
        

        res.status(200).send({msg : "Updated successfully..." , admin : updatedAdmin, token })
 
    } catch (error) {
        res.status(400).send({ errors : [{ msg : "Can not update ... Try again"}]})
    }
 }



 

 exports.updateAdminPassword = async (req, res) => {
    const { oldPassword, password } = req.body;
    const{_id}= req.params;
    try {
      // get user
      const admin = await Admin.findById(req.params);
      if (!admin) {
          return res.status(400).send('User not found');
      }
  
      // validate old password
      const isValidPassword = await bcrypt.compare(oldPassword, admin.password);
      if (!isValidPassword) {
          return res.status(400).send('Please enter correct old password');
      }
  
      // hash new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // update user's password
      admin.password = hashedPassword;
      

      const updatedAdminPassword = await admin.save();
  
      return res.json({ admin : updatedAdminPassword});
    } catch (err) {
      return res.status(400).send('Something went wrong. Try again');
    }
  };