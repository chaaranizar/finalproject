//1 require mongoose
const mongoose = require("mongoose");

//2 create schema
const schema = mongoose.Schema;

const productSchema = new schema ({
    title : {
        type : String,
        required : [true, "Please enter product title"],
        trim: true,
        maxLength: [100, "Product title cannot exceed 100 characters"]
    },
    release_date : {
        type: Date,
       
    },
    description : {
        type : String,
        required : [true, "Please enter product description"],
        
    },
    ratings: {
        type: Number,
        default: 0
    },
    price : {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [5, "Product price cannot esceed 5 characters"],
        default: 0
    },
    product_img: String,
    cloudinary_id: String,
    device : {
        type: String, 
        required: true
    },
    category: {
            type: String,
            required: [true, "Please select category for this product"],
            enum:{
                values: [
                    'Video Games',
                    'Console',
                    'Accessories',
                    
                ],
                message: "Please select correct category"
            }
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [5, "Product stock cannot exceed 5 characters"],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAT: {
        type: Date,
        default: Date.now
    }
});

module.exports = Product = mongoose.model("product", productSchema);