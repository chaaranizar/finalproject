const express = require("express") ;
const app = express();



require("dotenv").config();

app.use(express.json());

const connectDB = require ('./config/connectDB')
connectDB();


app.use(express.urlencoded({
    extended: true
  }));


app.use('/api/gameuniverse/user' , require ('./Routes/user'))

app.use('/api/gameuniverse/admin' , require ('./Routes/admin'))

app.use('/api/gameuniverse/product' , require ('./Routes/product'))

app.use ('/api/gameuniverse/order' , require ('./Routes/order'))



const PORT = process.env.PORT 


app.listen(PORT , error =>{
    
    error? console.error(`Fail to connect , ${error}`)
    :
    console.log(`Server is running on port ${PORT}`)
}) 
