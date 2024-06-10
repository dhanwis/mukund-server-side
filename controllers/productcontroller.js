// import model
const products=require('../MODEL/productschema')





// add product
exports.addproduct=async(req,res)=>{
    console.log('inside project add controller');
    const userid=req.payload
    console.log(userid);

 const  image=req.file.filename
 console.log(image);

 const {productname,description}=req.body
console.log(`${productname},${description}`);

try{
    const existingproduct= await products.findOne({productname})
    if(existingproduct){
        res.status(406).json('product already exists....please upload a new product')
    }
    else{
        const newproduct=new products({
            productname,description
        })
        await newproduct.save()
        res.status(200).json(newproduct)

        
    }

}catch(err){
    res.status(401).json(`resquest failed due to ${err}`)

}





 

}

// exports home project

// exports.gethomeproject=async(req,res)=>{
 

//     try{
//         const homeproject=await projects.find().limit(3)
//         res.status(200).json(homeproject)
//     }
//     catch(err){
//         res.status(401).json(`request failed due to ${err}`)
//     }
// }

// all project
exports.GetProduct=async(req,res)=>{
    try{
        const seeproduct=await Menu.find()
        res.status(200).json(seeproduct)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)

    }


}


// userproject
// exports.getuserprojects=async(req,res)=>{
//     const userid=req.payload
//     try{
//         const userproject=await projects.find({userid})
//        res.status(200).json(userproject)
//     }
//     catch(err){
//         res.status(401).json(`Request failed due to ${err}`)

//     }
//     }

    // edit project
    // exports.edituserproject=async(req,res)=>{
    //     const {id}=req.params
    //     const userid=req.payload
    //     const {title,language,github,website,overview,proimage}=req.body
    //     const uploadedprojectimage=req.file?req.file.filename:proimage

    //     try{
    //         const updateproject=await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,proimage:uploadedprojectimage,userid},{new:true})

    //         await updateproject.save()
    //         res.status(200).json(updateproject)

    //     }catch(err){
    //         res.status(401).json(err)
    //     }

    // }

    // delele project

    // exports.deleteproject=async(req,res)=>{
    //     const {id}=req.params

    //     try{
    //         const removeproject=await projects.findByIdAndDelete({_id:id})
    //         res.status(200).json(removeproject)


    //     }catch(err){
    //         res.status(401).json(err)

    //     }


    // }


