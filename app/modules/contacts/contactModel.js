let Sequelize = require("sequelize");
let sequelize = require("../../cors/databaseConn");

let Contact = sequelize.define("contacts", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    status: Sequelize.INTEGER,
    key: Sequelize.INTEGER
    
}, {
    tableName: "contacts",
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
    Contact,
};