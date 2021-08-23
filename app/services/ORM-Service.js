/* 
 * Require models need handling.
 */
const Product = require('../modules/products/productModel');
const Service = require('../modules/services/serviceModel');
const User = require('../modules/users/userModel');
const Category = require('../modules/categories/categoryModel');

/* 
 * ORM Method.
 */
Service.hasMany(Product, { as: "products", foreignKey: "service_id" });
Product.belongsTo(Service, { as: "services", foreignKey: "service_id" });

User.hasMany(Product, { as: "products", foreignKey: "user_id" });
Product.belongsTo(User, { as: "users", foreignKey: "user_id" });

Category.hasMany(Product, { as: "products", foreignKey: "category_id" });
Product.belongsTo(Category, { as: "categories", foreignKey: "category_id" });

Category.hasMany(Category,{as: "child", foreignKey: "parent_id" })


module.exports = {
    services: async (req, res) => {
        let services = await Service.findAll({
            where: {
                status: '1',
                parent_id: '11'
            },
            include: [{
                model: Product,
                as: "products"
            }]
        });
        return services;
    },

    // All User Pagination ?page=&size=
    All_User: async (req, res) => {

        let listUser = await User.findAndCountAll({
        });
        if (listUser === null) {
            return false;
        }
        return listUser
        
        // const pageNumber = Number.parseInt(req.query.page);
        // const sizeNumber = Number.parseInt(req.query.size);

        // let page = 0;
        // if (!Number.isNaN(pageNumber) && pageNumber > 0) {
        //     page = pageNumber;
        // }

        // let size = 10;
        // if (!Number.isNaN(sizeNumber) && sizeNumber > 0 && sizeNumber < 10) {
        //     size = sizeNumber;
        // }


        // let listUser = await User.findAndCountAll({
        //     limit: size,
        //     offset: page * size,
        //     where: {
        //         status: '1'
        //     }
        // });
        // if (listUser === null) {
        //     return false;
        // }
        // return {
        //     listUser,
        //     currentPage: Math.ceil(req.query.page),
        //     totalPages: Math.ceil(listUser.count / size)
        // }
    },

    All_Service: async (req, res) => {
        let listService = await Service.findAll({
            attributes: ['name', 'id', 'parent_id'],
            where: {
                status: '1',
            }
        })
        return listService;
    },

    All_Category: async (req, res) => {
        let allCategory = await Category.findAll({
            attributes: ['name', 'id', 'parent_id'],
            where: {
                status: '1',
            }
        })
       
        return allCategory;
    },

    product_service: async (req, res) => {
        // let limit = 30
        // let offset = 0 + (req.query.page - 1) * limit
        let result = await Product.findAll({
            // limit: limit,
            // offset: offset,
            include: [{
                model: Service,
                as: "services",
            }, {
                model: User,
                as: "users"
            }, {
                model: Category,
                as: "categories"
            }],
        })
        return result;
    },

    _productID: async (req, res) => {
        let result = await Product.findAll({
            where: {
                id: req.params.id
            },
            include: [{
                model: Service,
                as: "services",
            }, {
                model: Category,
                as: "categories",
            }],
        })

        return result;
    },


    
};
