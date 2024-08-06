// import model
const products=require('../MODEL/productschema')





// add product
exports.addProduct = async (req, res) => {
    // Extract the uploaded files
    const files = req.files;
  
    // Log file information for debugging
    console.log(files);
  
    // If no files were uploaded, return an error
    if (!files || files.length === 0) {
      return res.status(400).json('No files uploaded.');
    }
  
    // Extract filenames of uploaded images
    const image= files.map(file => file.filename); 
  
    // Log filenames for debugging
    console.log(image);
  
    // Extract product data from the request body
    const { productname, description } = req.body;
    console.log(`${productname}, ${description}`);
  
    try {
      // Check if the product already exists
      const existingProduct = await products.findOne({ productname });
      if (existingProduct) {
        return res.status(406).json('Product already exists. Please upload a new product.');
      }
  
      // Create a new product with the image filenames
      const newProduct = new products({
        productname,
        description,
        image // Save the array of image filenames
      });
  
      // Save the new product to the database
      await newProduct.save();
      res.status(200).json(newProduct);
    } catch (err) {
      res.status(401).json(`Request failed due to ${err}`);
    }
  };


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


