const cloudinary = require("../configs/cloudinaryConfig");
const Product = require("../models/productModel");

const uploadProductImage = async (req, res)=>{
    try{
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if(!product) return res.status(404).json({message: "Product not found"});

        if(product.imageId){
            await cloudinary.uploader.destroy(product.imageId);
        } 

        product.image = req.file.path;
        product.imageId = req.file.filename;

        await product.save();

        res.json({
            message: "Image updated",
            product,
        })
    } catch(error){
        res.status(500).json({ error: error.message});
    }
}


module.exports = uploadProductImage;