const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { MSG_TOKEN_NOT_FOUND, CODE_401, MSG_INVALID_TOKEN, MSG_USER_NOT_FOUND, MSG_USER_BLOCKED } = require('../config');
const { returnsResponse } = require('../helpers/returnsResponse');

const { User } = require('../models');

const jwtValidator = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token) 
        return returnsResponse(res, CODE_401, { msg: MSG_TOKEN_NOT_FOUND });

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        const user = await User.findById(uid);
        
        if(!user) 
            return returnsResponse(res, CODE_401, { 
                msg: `${ MSG_INVALID_TOKEN } - ${ MSG_USER_NOT_FOUND }` 
            });
            
        if(!user.state) 
            return returnsResponse(res, CODE_401, { 
                msg: `${ MSG_INVALID_TOKEN } - ${ MSG_USER_BLOCKED }` 
            });

        req.user = user;
    
        next();
    } 
    
    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_401, { msg: MSG_INVALID_TOKEN });
    }
}

module.exports = {
    jwtValidator
}