const Sequelize = require('sequelize');
const db = require('../config/dbSQL');

const Test = db.define('test', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Test;