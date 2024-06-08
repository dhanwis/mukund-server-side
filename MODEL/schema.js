// import mongoose
const mongoose=require('mongoose')

// create scheme
const userscheme=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,'Must be atleast 3 character but got {VALUE} ']

    },
   
    password:{
        type:String,
        require:true
    },
   





})


// create model
 const users=mongoose.model("users",userscheme)
// note:users is the name of the collection


// export
module.exports=users



