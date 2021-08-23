const Sequelize = require("sequelize");
const sequelize = require("../../cors/databaseConn");

const Product = sequelize.define("products", {
    // id: {
    //     type: Sequelize.INTEGER,
    //     autoIncrement: true,
    //     allowNull: false,
    //     primaryKey: true
    // },
    name: Sequelize.STRING,
    category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 'NULL'
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            referencesKey: 'id'
        },
    },
    service_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 'NULL'
    },
    slug: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    image: Sequelize.TEXT,
    status: Sequelize.INTEGER,
    hot: Sequelize.INTEGER,
    views: Sequelize.INTEGER,
    meta_keyword: Sequelize.STRING,
    meta_description: Sequelize.STRING,
}, {
    tableName: "products",
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
        {
            unique: true,
            fields: ["id"],
        },
    ],
});

module.exports = Product;