const{ Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../cors/databaseConn");

const Service = sequelize.define("services", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    parent_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 0),
    sell: DataTypes.DECIMAL(10, 0),
    slug: DataTypes.STRING,
    image: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    meta_keyword: DataTypes.STRING,
    meta_description: DataTypes.STRING,
}, {
    tableName: "services",
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = Service;