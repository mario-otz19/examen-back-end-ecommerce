const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');
const { returnsResponse } = require('../helpers/returnsResponse');
const { 
    CODE_404, CODE_200, CODE_201, CODE_500, 
    MSG_USER_CREATED, MSG_USER_DELETED, MSG_USER_NOT_FOUND, OK
} = require('../config');

const getUsers = async (req = request, res = response) => {
    try {
        const { from = 0, limit = 5 } = req.query;
        const validStates = [0, 1];
        const state = (req.query.state === undefined) ? true : (validStates.includes(+req.query.state) && +req.query.state === 1);
        const query = { state };

        const [totalRecords, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(+from)
                .limit(+limit)
        ]);

        returnsResponse(res, CODE_200, { 
            msg: OK, 
            totalRecords, 
            data: users 
        });        
    } 
    
    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

const addUser = async (req, res = response) => {
    try {
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, password, role });

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
        await user.save();

        returnsResponse(res, CODE_201, { 
            msg: MSG_USER_CREATED, 
            data: user
        }); 
    } 
    
    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

const updateUser = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, email, password, google, ...rest } = req.body;

        const userExists = await User.findById(id);
        
        if (!userExists)
            return returnsResponse(res, CODE_404, { msg: MSG_USER_NOT_FOUND });

        if(password) {
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync(password, salt);
        }

        const user = await User.findByIdAndUpdate(id, rest, { new: true });

        returnsResponse(res, CODE_200, { 
            msg: MSG_USER_UPDATED, 
            data: user 
        });   
    } 
    
    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

const deleteUserByID = async (req, res) => {
    try {
        const { id } = req.params;

        const userExists = await User.findById(id);
        
        if (!userExists)
            return returnsResponse(res, CODE_404, { msg: MSG_USER_NOT_FOUND });

        // const user = await User.findByIdAndDelete(id); // INFO: Opcional, si se quiere borrar definitívamente        
        const user = await User.findByIdAndUpdate(id, { state: false }, { new: true }); // INFO: Borrado lógico para no perder trazabilidad

        returnsResponse(res, CODE_200, { 
            msg: MSG_USER_DELETED
        });
    }

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUserByID
}