require("dotenv").config();
const Sequelize = require('sequelize');

const ConnectionDatabase = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    port: process.env.DB_PORT,
    pool: {
        max: Number(process.env.DB_POOL_MAX),
        min: Number(process.env.DB_POOL_MIN),
        acquire: Number(process.env.DB_POOL_ACQUIRE),
        idle: Number(process.env.DB_POOL_IDLE),
        evict: Number(process.env.DB_POOL_EVICT)
    }
};

const sequelize = new Sequelize(ConnectionDatabase.database, ConnectionDatabase.username, ConnectionDatabase.password, ConnectionDatabase);

console.log('Connection Database!!');

module.exports = sequelize;
global.sequelize = sequelize;