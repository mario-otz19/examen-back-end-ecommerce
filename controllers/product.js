const { Category, Product } = require('../models');
const { returnsResponse } = require('../helpers/returnsResponse');
const { 
    CODE_200, CODE_201, CODE_400, CODE_404, CODE_500, 
    MSG_PRODUCT_NOT_FOUND, MSG_PRODUCT_EXISTS, MSG_PRODUCT_CREATED, MSG_PRODUCT_UPDATED, OK, MSG_PRODUCT_DELETED, MSG_CATEGORY_NOT_FOUND
} = require('../config');

const getProducts = async (req, res) => {
    try {
        const { from = 0, limit = 5 } = req.query;
        const validStates = [0, 1];
        const state = (req.query.state === undefined) ? true : (validStates.includes(+req.query.state) && +req.query.state === 1);
        const query = { state };

        const [totalRecords, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip( Number(from) )
                .limit( Number(limit) )
                .populate('category', 'name')
        ]);
                  
        return returnsResponse(res, CODE_200, { 
            msg: OK, 
            totalRecords, 
            data: products 
        });  
    } 

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

const getProductByID = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
            .populate('category', 'name');

        if (!product)
            return returnsResponse(res, CODE_404, { msg: MSG_PRODUCT_NOT_FOUND });

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

const createProduct = async (req, res) => {
    try {
        const { category: idCategory, name, state, ...body } = req.body;

        const productExists = await Product.findOne({ name });

        if(productExists)
            return returnsResponse(res, CODE_400, { msg: MSG_PRODUCT_EXISTS });
        
        const category = await Category.findById(idCategory);

        if (!category)
            return returnsResponse(res, CODE_404, { msg: MSG_CATEGORY_NOT_FOUND });
    
        const data = { category, name, ...body }

        const product = new Product(data);
        await product.save();

        returnsResponse(res, CODE_201, { 
            msg: MSG_PRODUCT_CREATED, 
            data: product
        }); 
    } 

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { category: idCategory, name } = req.body;
        const validStates = [true, false];

        const productExists = await Product.findById(id);

        if (!productExists)
            return returnsResponse(res, CODE_404, { msg: MSG_PRODUCT_NOT_FOUND });
        
        const category = await Category.findById(idCategory);
    
        if (!category)
            return returnsResponse(res, CODE_404, { msg: MSG_CATEGORY_NOT_FOUND });

        const state = ((validStates.includes(req.body.state) && (req.body.state !== null)) ? req.body.state : productExists.state)
        const data = { name, ...req.body, state, category: idCategory };

        const product = await Product.findByIdAndUpdate(id, data, { new: true });

        return returnsResponse(res, CODE_200, { 
            msg: MSG_PRODUCT_UPDATED, 
            data: product
        }); 
    } 

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

const deleteProductByID = async (req, res) => {
    try {
        const { id } = req.params;

        const productExists = await Product.findById(id);

        if (!productExists)
            return returnsResponse(res, CODE_404, { msg: MSG_PRODUCT_NOT_FOUND });

        await Product.findByIdAndDelete(id);

        returnsResponse(res, CODE_200, { 
            msg: MSG_PRODUCT_DELETED
        });
    } 

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

module.exports = {
    getProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProductByID
}