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


// get product by id
exports.GetProductById = async (req, res) => {
  try {
      const productId = req.params.id;
     
      
      const product = await products.findById(productId);
      
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product);
  } catch (err) {
      res.status(500).json({ message: `Request failed due to ${err}` });
  }
};




    // edit project
    exports.editProduct = async (req, res) => {
      const { id } = req.params;
      const { productname, description } = req.body;
  
      // Extract the uploaded files
      const files = req.files;
  
      // Log file information for debugging
      console.log(files);
  
      // If no new files are uploaded, use the existing images
      let updatedImages;
      if (files && files.length > 0) {
          updatedImages = files.map(file => file.filename); // New images
      } else {
          updatedImages = req.body.image; // Existing images from the request body
      }
  
      try {
          // Update the product with the new data and images
          const updatedProduct = await products.findByIdAndUpdate(
              { _id: id },
              {
                  productname,
                  description,
                  image: updatedImages
              },
              { new: true }
          );
  
          // Save the updated product to the database
          await updatedProduct.save();
          res.status(200).json(updatedProduct);
      } catch (err) {
          res.status(401).json(`Request failed due to ${err}`);
      }
  };

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


