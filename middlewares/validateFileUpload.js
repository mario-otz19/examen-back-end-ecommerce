const { CODE_400 } = require('../config');
const { returnsResponse } = require('../helpers/returnsResponse');

const validateFileUpload = (req, res, next) => {
    console.log(req.files);

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return returnsResponse(res, CODE_400, {
            msg: 'No hay archivos para subir.'
        });
    }

    return next();
}

module.exports = {
    validateFileUpload
}