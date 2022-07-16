const { dbNoSQLConnection } = require('./dbNoSQL');
// const dbSQLConnection = require('./dbSQL');
const constants = require('./constants');

module.exports = {
    dbNoSQLConnection,
    // dbSQLConnection,
    ...constants
}