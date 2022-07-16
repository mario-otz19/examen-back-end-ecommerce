const cloudinary = require('cloudinary').v2;
const { Product } = require('../models');
const { returnsResponse } = require('../helpers/returnsResponse');
const { CODE_500, MSG_PRODUCT_NOT_FOUND, CODE_200, CODE_404, OK } = require('../config');
cloudinary.config(process.env.CLOUDINARY_URL);

const updateCloudinaryImage = async(req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if(!product) 
            return returnsResponse(res, CODE_404, { msg: MSG_PRODUCT_NOT_FOUND });

        if(product.img) {
            const cloudinaryImageURL = product.img.split('/');
            const imageNameCloudinary = cloudinaryImageURL[cloudinaryImageURL.length - 1];
            const [publicIdCloudinary] = imageNameCloudinary.split('.');
            
            await cloudinary.uploader.destroy(publicIdCloudinary);
        }

        const { tempFilePath } = req.files.file;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        
        product.img = secure_url;
        await product.save();
        
        return returnsResponse(res, CODE_200, { 
            msg: OK, 
            data: product
        });     
    } 

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

module.exports = {
    updateCloudinaryImage
}