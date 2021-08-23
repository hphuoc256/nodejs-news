let Sequelize = require("sequelize");
let sequelize = require("../../cors/databaseConn");

let New = sequelize.define("news", {
    user_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    slug: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    image: Sequelize.TEXT,
    status: Sequelize.INTEGER,
    hot: Sequelize.INTEGER,
    views: Sequelize.INTEGER,
    meta_keyword: Sequelize.STRING,
    meta_description: Sequelize.STRING
    
}, {
    tableName: "news",
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
        {
            unique: true,
            fields: ["id"],
        },
    ],
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
});


module.exports = {
    New,
};