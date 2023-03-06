const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



//***   Register */
exports.register = async(req,res) =>{
   try {
       const { firstname , lastname , email , password} = req.body;
       
       const foundUser = await User.findOne({email})
       if(foundUser){
          return  res.status(400).send({errors: [{ msg : "E-mail déjà utilisé... Réessayez"}]})
       }
       const saltRounds = 10;
       const hashedPassword = await bcrypt.hash(password, saltRounds )
       const newUser = new User({...req.body})
       newUser.password = hashedPassword;

       //save
       await newUser.save()

       //token
       const token = jwt.sign({
           id : newUser._id
       },
       process.env.SECRET_KEY,{expiresIn: "72h"}
       )
       res.status(200).send({ success : [{msg : "Successfully signed up..."}] , user : newUser , token})

   } catch (error) {
       res.status(400).send({ errors : [{ msg : "cannot register ... "}]})
   }
}






//**  Login */


exports.login = async(req,res) =>{
    try {
        const {email , password } = req.body ;
        
        //check email existance : 
        const foundUser = await User.findOne({email})
        if (!foundUser){
            return res.status(400).send({errors : [{ msg : "User or Email not found"}]})
        }
        const checkPassword = await bcrypt.compare(password,  foundUser.password)
        if (!checkPassword){
        return res.status(400).send({errors : [{ msg : "Please check your password!!"}]})
    }
    const token = jwt.sign({
        id : foundUser._id,  isAdmin : foundUser.isAdmin 
    },
    process.env.SECRET_KEY,{expiresIn: "72h"}
    )
    res.status(200).send ({success : [{msg : "Welcome Back"}] , user : foundUser , token})



    } catch (error) {
        res.status(400).send({errors : [{ msg : "Sorry cannot found the user!!"}]})
        
    }
}


exports.updateInfos = async(req,res) =>{
    try {
        const{_id}= req.params;
        const { firstname , lastname , email }  = req.body;      

        const updatedUser = await User.findOneAndUpdate(req.params, {$set:{...req.body}})     
        
      
        const updateddUser = new User({...req.body})
      
        const token = jwt.sign({
            id : updatedUser._id,
        },
        process.env.SECRET_KEY,{expiresIn: "72h"}
        )
        
        await updatedUser.save()
        

        res.status(200).send({success : [{ msg : "Successfully updated..."}] , user : updatedUser, token })
        
    } catch (error) {
        res.status(400).send({ errors : [{ msg : "Cannot update... Try again"}]})
    }
 }

 

 exports.updatePassword = async (req, res) => {
    const { oldPassword, password } = req.body;
    const{_id}= req.params;
    try {
      // get user
      const user = await User.findById(req.params);
      if (!user) {
          return res.status(400).send({ errors : [{ msg : 'User not found' }]});
      }
  
      // validate old password
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {
          return res.status(400).send({ errors: [{ msg : "Please verify your current password" }]})
      }
     
      // hash new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // update user's password
      user.password = hashedPassword;
      

      const updatedUserPassword = await user.save();

      res.status(200).send({success : [{msg:"Sucessfully updated..."}] , user : updatedUserPassword })
  
     
    } catch (error) {
      return res.status(400).send({ errors : [{ msg :  "Try again later" }]});
    }
  };


  exports.getusers = async (req,res) => {
    try {
        const listusers = await User.find();
        res.status(200).send({msg : 'Users list',listusers})
        
    } catch (error) {
        res.status(400).send({msg : 'cannot get all Users', error})
    }
  }


  exports.getOneUser = async (req,res) => {
    const{_id}= req.params;
   try{ 
    const userToGet = await User.findOne(req.params);
    res.status(200).send({msg : 'got user ',userToGet})
    
} catch (error) {
    res.status(400).send({msg : 'failed to get user ', error})
} }

// Delete user  => /api/gameuniverse/admin/user/:id
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

          
        res.status(200).send({
            msg: "User deleted"
            
        });
        } catch (error) {
        res.status(400).send({msg:  "Cannot delete user", error});
    }
}

