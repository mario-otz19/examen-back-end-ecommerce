require('dotenv').config();
const mongoose = require('mongoose');
const { 
    DB_NO_SQL_CONNECTION,
    DB_NO_SQL_AUTO_CREATE,
    DB_NO_SQL_AUTO_INDEX,
    DB_NO_SQL_MIN_POOL_SIZE,
    DB_NO_SQL_MAX_POOL_SIZE,
    DB_NO_SQL_TIMEOUT_MS
} = process.env;

const dbNoSQLConnection = async () => {
    try {
        mongoose.connect(DB_NO_SQL_CONNECTION, {
            // auth: true,
            autoCreate: DB_NO_SQL_AUTO_CREATE === 'true',
            autoIndex: DB_NO_SQL_AUTO_INDEX === 'true',
            minPoolSize: +DB_NO_SQL_MIN_POOL_SIZE,
            maxPoolSize: +DB_NO_SQL_MAX_POOL_SIZE,
            serverSelectionTimeoutMS: +DB_NO_SQL_TIMEOUT_MS
        });

        console.log('¡Conexión exitosa a base de datos MongoDB Atlas!');
    } 
    
    catch (error) {
        console.log(error); 
        throw new Error('¡Error a la hora de iniciar conexión a base de datos en MongoDB Atlas!');
    }
}

module.exports = {
    dbNoSQLConnection
}