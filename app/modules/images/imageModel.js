const Sequelize = require("sequelize");
const sequelize = require("../../cors/databaseConn");

const Image = sequelize.define("images", {
    name: Sequelize.STRING,
    parent_id: Sequelize.INTEGER,
    url: Sequelize.STRING,
    product_id: Sequelize.INTEGER,
    news_id: Sequelize.INTEGER,
    service_id: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    slider: Sequelize.STRING,
}, {
    tableName: "images",
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
        {
            unique: true,
            fields: ["id"],
        },
    ],
});

module.exports = Image;