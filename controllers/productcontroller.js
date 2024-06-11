// import model
const products=require('../MODEL/productschema')





// add product
exports.addproduct=async(req,res)=>{
    // console.log('inside project add controller');
    // const userid=req.payload
    // console.log(userid);

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
            productname,description,image
        })
        await newproduct.save()
        res.status(200).json(newproduct)

        
    }

}catch(err){
    res.status(401).json(`resquest failed due to ${err}`)

}





 

}



// all product
exports.GetProduct=async(req,res)=>{
    try{
        const seeproduct=await products.find()
        //console.log(req);
        res.status(200).json(seeproduct)
    }
    catch(err){
        res.status(401).json(`Request failed due to ${err}`)

    }


}




    // edit project
 
    exports.editproduct = async (req, res) => {
        const { id } = req.params;
        const { productname, description,image } = req.body;
        const uploadedproductimage = req.file ? req.file.filename : image; // Corrected assignment
    
        try {
            const updateproduct = await products.findByIdAndUpdate(
                { _id: id },
                { productname, description, image: uploadedproductimage },
                { new: true }
            );
    
            await updateproduct.save();
            res.status(200).json(updateproduct);
        } catch (err) {
            res.status(401).json(err);
        }
    }

    // delete project

    exports.deleteproduct=async(req,res)=>{
        const {id}=req.params

        try{
            const removeproduct=await products.findByIdAndDelete({_id:id})
            res.status(200).json(removeproduct)


        }catch(err){
            res.status(401).json(err)

        }


    }


