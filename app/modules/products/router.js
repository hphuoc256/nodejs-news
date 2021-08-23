const express = require('express');
let router = express.Router();
let AuthCheck = require('../../middlewares/AuthCheck');
const { route } = require('../users/router');
let ProductController = require('./productController');
const upload = require('../../middlewares/uploadMiddleware');

router.get('/list-product', ProductController.allProduct);

router.get('/product/:id', ProductController.detaiProduct);

router.get('/add-product', ProductController.getAddProduct);

router.post('/add-product', upload.single('image'), ProductController.addProduct);

router.post('/update-product/:id', upload.single('image'), ProductController.updateProduct);

router.get('/delete-product/:id', ProductController.deleteProduct);


module.exports = router;