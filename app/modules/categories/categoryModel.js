const Sequelize = require("sequelize");
const sequelize = require("../../cors/databaseConn");

const Category = sequelize.define("categories", {
    name: Sequelize.STRING,
    parent_id: Sequelize.INTEGER,
    slug: Sequelize.STRING,
    link: Sequelize.STRING,
    image: Sequelize.STRING,
    status: Sequelize.INTEGER,
}, {
    tableName: "categories",
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
        {
            unique: true,
            fields: ["id"],
        },
    ],
});

module.exports = Category;