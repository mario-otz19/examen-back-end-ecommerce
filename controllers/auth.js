const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');
const { CODE_400, MSG_USER_WRONG, MSG_USER_BLOCKED, CODE_200, OK, CODE_500 } = require('../config');
const { jwtGenerator } = require('../helpers/jwtGenerator');
const { returnsResponse } = require('../helpers/returnsResponse');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });

        if(!user) 
            return returnsResponse(res, CODE_400, { msg: MSG_USER_WRONG });  
            
        if(!user.state) 
            return returnsResponse(res, CODE_400, { msg: `${ MSG_USER_WRONG } ${ MSG_USER_BLOCKED }` });
            
        validatePassword =  bcryptjs.compareSync(password, user.password);
            
        if(!validatePassword)
            return returnsResponse(res, CODE_400, { msg: MSG_USER_WRONG }); 
            
        const token = await jwtGenerator(user.id);
        
        return returnsResponse(res, CODE_200, { msg: OK, user, token }); 
    } 

    catch (error) {
        console.log(error);
        return returnsResponse(res, CODE_500);  
    }
}

module.exports = {
    login
}