let ProductRepository = require("./productRepository");
const categoryRepository = require('../categories/categoryRepository');
const ORM_Service = require('../../services/ORM-Service');
const serviceRepository = require('../services/serviceRepository');

let allProduct = async function (req, res) {
    try {
        let list_products = await ProductRepository._allProduct(req);
        res.render('pages/products/list-product', {data: list_products})

    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
}

let detaiProduct = async (req, res) => {
    try {
        let detaiProduct = await ProductRepository._detailProduct(req);
       
        res.render('pages/products/edit-product', {
            data: detaiProduct.result,
            all_service: detaiProduct.all_service,
            all_catalogry: detaiProduct.all_catalogry
        })

    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
}

let getAddProduct = async (req, res) => {
    let list_category = await categoryRepository.GetListCategoryHasParentId();
    let list_services = await serviceRepository.GetListServiceHasParentId();
   
    res.render('pages/products/add-product', {
        'data': list_category,
        'list_services' : list_services
    })
}

let addProduct = async (req, res) => {
    console.log(res.body);
    try {
        let result = await ProductRepository._addProduct(req);

        if (result == false) { res.redirect('/add-product') }

        res.redirect('/list-product');

    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
}

let updateProduct = async (req, res) => {
    try {
        // validte
        let result = await ProductRepository._updateProduct(req);
       
        if (result == false) { res.redirect('back') }

        res.redirect('/list-product');
        
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
}

let deleteProduct = async (req, res) => {
    try {
        let result = await ProductRepository._deleteProduct(req);
        res.redirect('/list-product')
       
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
}

module.exports = {
    allProduct,
    detaiProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getAddProduct
}