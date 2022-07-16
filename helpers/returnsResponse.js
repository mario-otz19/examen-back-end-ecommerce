const { CODE_500 } = require('../config');

const returnsResponse = (res, responseCode, responseData) => {
    if (responseCode === CODE_500) {
        return res.status(responseCode).json({
            statusCode: CODE_500,
            msg: '¡Ha ocurrido un error inesperado, favor de contactar al admin! D:'
        });
    }

    return res.status(responseCode).json({
        statusCode: responseCode,
        ...responseData
    });
}

module.exports = {
    returnsResponse
}