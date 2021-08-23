const Product = require("./productModel");
let ORM_Product = require("../../services/ORM-Service");
const ServiceRepository = require('../services/serviceRepository');
const imageRepo = require("../images/imageRepository")

let _productID = async (req) => {
    let _detalID = await Product.findOne({
        where: {
            id: req.params.id
        }
    })
    return _detalID;
}

let _allProduct = async (req, res) => {
    let result = await ORM_Product.product_service(req);
    return result
}

let _detailProduct = async (req, res) => {
    let result = await ORM_Product._productID(req);
    let all_service = await ServiceRepository.GetListServiceHasParentId();
    let all_catalogry = await ORM_Product.All_Category(req);

    return {result, all_service, all_catalogry};
}

let _addProduct = async (req, res) => {
    let data = {
        name: req.body.name,
        category_id: (req.body.category_id=='0') ? null : req.body.category_id,
        user_id: user.id,
        service_id:  (req.body.service_id=='0') ? null : req.body.service_id,
        slug: req.body.slug,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        status: req.body.status,
        hot: req.body.hot,
        meta_keyword: req.body.meta_keyword,
        meta_description: req.body.meta_description
    }

    if(req.file != null){
        const fileName = await imageRepo.upload(req);
        data.image =  process.env.APP_URL + ':' + process.env.APP_PORT + '/image/' + fileName;
    }

    await Product.create(data);
    
    return true;
}

let _updateProduct = async (req, res) => {
    let product = await _detailProduct(req);
    if (product === null) {
        return false;
    }
    
    let data = {
        name: req.body.name,
        category_id: (req.body.category_id=='0') ? null : req.body.category_id,
        user_id: user.id,
        service_id: (req.body.service_id=='0') ? null : req.body.service_id,
        slug: req.body.slug,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        status: req.body.status,
        hot: req.body.hot,
        meta_keyword: req.body.meta_keyword,
        meta_description: req.body.meta_description
    }
    if(req.file != null){
        const fileName = await imageRepo.upload(req);
        data.image =  process.env.APP_URL + ':' + process.env.APP_PORT + '/image/' + fileName;
    }
   
    let result = await Product.update(data, {
        where: {
            id: req.params.id
        }
    });

    return result;
}

let _deleteProduct = async (req) => {
    await Product.destroy({
        where: {
            id: req.params.id
        }
    });
    return true;
}

module.exports = {
    _allProduct,
    _detailProduct,
    _addProduct,
    _updateProduct,
    _deleteProduct
}