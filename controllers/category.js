const { 
    CODE_500, CODE_404, CODE_200, OK, CODE_400, CODE_201, 
    MSG_CATEGORY_CREATED, MSG_CATEGORY_UPDATED, MSG_CATEGORY_DELETED, MSG_CATEGORY_EXISTS, MSG_CATEGORY_NOT_FOUND 
} = require('../config');
const { returnsResponse } = require('../helpers/returnsResponse');
const { Category } = require('../models');

const getCategories = async (req, res) => {
    try {
        const { from = 0, limit = 5 } = req.query;
        const validStates = [0, 1];
        const state = (req.query.state === undefined) ? true : (validStates.includes(+req.query.state) && +req.query.state === 1);
        const query = { state };

        const [totalRecords, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(from)
                .limit(limit)
        ]);
                  
        return returnsResponse(res, CODE_200, { 
            msg: OK, 
            totalRecords, 
            data: categories 
        });    
    }

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

const getCategoryByID = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category)
            return returnsResponse(res, CODE_404, { msg: MSG_CATEGORY_NOT_FOUND });

        return returnsResponse(res, CODE_200, { 
            msg: OK, 
            data: category 
        }); 
    } 

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

const createCategory = async (req, res) => {
    try {
        const name = req.body.name;
        
        const categoryExists = await Category.findOne({ name });
    
        if(categoryExists) 
            return returnsResponse(res, CODE_400, { msg: MSG_CATEGORY_EXISTS });
    
        const category = new Category({ name });
        await category.save();

        returnsResponse(res, CODE_201, { 
            msg: MSG_CATEGORY_CREATED, 
            data: category
        }); 
    }

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const validStates = [true, false];

        const categoryExists = await Category.findById(id);

        if (!categoryExists)
            return returnsResponse(res, CODE_404, { msg: MSG_CATEGORY_NOT_FOUND });
        
        const categoryName = await Category.findOne({ name });
    
        if(categoryName) 
            return returnsResponse(res, CODE_400, { msg: MSG_CATEGORY_EXISTS });

        const state = ((validStates.includes(req.body.state) && (req.body.state !== null)) ? req.body.state : categoryExists.state)
        const data = { name, state };

        const category = await Category.findByIdAndUpdate(id, data, { new: true });

        return returnsResponse(res, CODE_200, { 
            msg: MSG_CATEGORY_UPDATED, 
            data: category 
        }); 
    }

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

const deleteCategoryByID = async (req, res) => {
    try {
        const { id } = req.params;

        const categoryExists = await Category.findById(id);

        if (!categoryExists)
            return returnsResponse(res, CODE_404, { msg: MSG_CATEGORY_NOT_FOUND });

        await Category.findByIdAndDelete(id);

        returnsResponse(res, CODE_200, { 
            msg: MSG_CATEGORY_DELETED
        });
    }

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

module.exports = {
    createCategory,
    deleteCategoryByID,
    getCategoryByID,
    getCategories,
    updateCategory
}