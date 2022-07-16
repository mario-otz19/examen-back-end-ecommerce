const fieldsValidator = require('./fieldsValidator');
const jwtValidator = require('./jwtValidator');
const validateFileUpload = require('./validateFileUpload');

module.exports = {
    ...fieldsValidator,
    ...jwtValidator,
    ...validateFileUpload
}