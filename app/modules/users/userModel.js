const Sequelize = require("sequelize");
const sequelize = require("../../cors/databaseConn");

const User = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    birthday: Sequelize.DATE,
    address: Sequelize.STRING,
    gender: Sequelize.INTEGER,
    phone: Sequelize.INTEGER,
    avatar: Sequelize.STRING,
    status: Sequelize.INTEGER,
    level: {
        type: Sequelize.INTEGER(1, 0),
    },
}, {
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
});

module.exports = User;

