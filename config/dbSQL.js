require('dotenv').config();
const Sequelize = require('sequelize');
// const pg = require('pg');
const { 
    DB_SQL_ENGINE,
    DB_SQL_FREEZETABLENAME,
    DB_SQL_HOST,
    DB_SQL_LOGGING,
    DB_SQL_NAME,
    DB_SQL_PASSWORD,
    DB_SQL_POOL_ACQUIRE,
    DB_SQL_POOL_IDLE,
    DB_SQL_POOL_MAX,
    DB_SQL_POOL_MIN,
    DB_SQL_PORT,
    DB_SQL_SCHEMA,
    DB_SQL_TIMESTAMPS,
    DB_SQL_USER    
} = process.env;

module.exports = new Sequelize(DB_SQL_NAME, DB_SQL_USER, DB_SQL_PASSWORD, {
    host: DB_SQL_HOST,
    port: +DB_SQL_PORT,
    dialect: DB_SQL_ENGINE,
    pool: {
        max: +DB_SQL_POOL_MAX,
        min: +DB_SQL_POOL_MIN,
        acquire: +DB_SQL_POOL_ACQUIRE,
        idle: +DB_SQL_POOL_IDLE
    },
    define: {
        freezeTableName: DB_SQL_FREEZETABLENAME === 'true',
        schema: DB_SQL_SCHEMA,
        timestamps: DB_SQL_TIMESTAMPS === 'true'
    },
    logging: DB_SQL_LOGGING === 'true'
});

// Configuración para conectar a la base de datos en Heroku
// const dbConnectionHeroku = new pg.Client({
//     user: DB_USER,
//     password: DB_PASSWORD,
//     database: DB_NAME,
//     port: DB_PORT,
//     host: DB_HOST,
//     ssl: true
// }); 

// dbConnectionHeroku.connect();
