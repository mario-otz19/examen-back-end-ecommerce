const { returnsResponse } = require('../helpers/returnsResponse');
const { CODE_200, CODE_201, CODE_400, CODE_404, CODE_500, BAD_REQUEST, CREATED, NOT_FOUND, OK } = require('../config');
const { Test } = require('../models');

exports.getRecords = async (req, res) => {
    try {
        const { status } = req.query;
        const validStates = [0, 1];

        if (!validStates.includes(+status))
            return returnsResponse(res, CODE_400, { msg: BAD_REQUEST });

        const records = await Test.findAll({
            where: { status: (+status === 1) }
        });
        
        if (!records.length)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });
        
        return returnsResponse(res, CODE_200, { msg: OK, data: records });  
    } 
    
    catch (error) {
        return returnsResponse(res, CODE_500);  
    }
}

exports.getRecordByID = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(+id))
            return returnsResponse(res, CODE_400, { msg: BAD_REQUEST });

        const record = await Test.findOne({ where: { id } });
        
        if (!record)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });
        
        return returnsResponse(res, CODE_200, { msg: CREATED, data: record });  
    } 
    
    catch (error) {
        return returnsResponse(res, CODE_500);  
    }
}

exports.createRecord = async (req, res) => {
    try {        
        if (!req.body.name)
            return returnsResponse(res, CODE_400, { msg: BAD_REQUEST });

        const record = await Test.create(req.body);
        
        return returnsResponse(res, CODE_201, { msg: CREATED, data: record });  
    } 
    
    catch (error) {
        return returnsResponse(res, CODE_500);  
    }
}

exports.updateRecord = async (req, res) => {
    try {
        const { name, status } = req.body;
        const { id } = req.params;
        
        if (!name)
            return returnsResponse(res, CODE_400, { msg: BAD_REQUEST });

        const record = await Test.findOne({ where: { id }});
            
        if (!record)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });
            
        record.name = name;
        record.status = (status === undefined) ? record.status : status;
        
        const updatedRecord = await record.save();        
        return returnsResponse(res, CODE_200, { msg: OK, data: updatedRecord });  
    } 
    
    catch (error) {
        return returnsResponse(res, CODE_500);  
    }
}

exports.deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (isNaN(+id))
            return returnsResponse(res, CODE_400, { msg: BAD_REQUEST });

        const record = await Test.findOne({ where: { id }});
            
        if (!record)
            return returnsResponse(res, CODE_404, { msg: NOT_FOUND });
        
        await record.destroy();        
        return returnsResponse(res, CODE_200, { msg: OK });  
    } 
    
    catch (error) {
        return returnsResponse(res, CODE_500);  
    }
}