// import mongoose
const mongoose=require('mongoose')

const productschema=new mongoose.Schema({
    productname:{
        type:String,
        require:true

    },
    description:{
        type:String,
        require:true

    },
    image:{
        type:[String],
        require:true

    }
    
    
})

const products=mongoose.model
("products",productschema)

module.exports=products



