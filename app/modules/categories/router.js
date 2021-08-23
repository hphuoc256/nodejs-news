const express = require('express');
var router = express.Router();
var AuthCheck = require('../../middlewares/AuthCheck');
const { route } = require('../users/router');
var CategoryController = require('./categoryController');

router.get('/list-category', CategoryController.index);

router.get('/add-category', CategoryController.addCategory);

router.post('/add-category', CategoryController.CreateAsync);

router.get('/category/:id', CategoryController.detailCategory);

router.post('/update-category/:id', CategoryController.UpdateAsync);

router.get('/delete-category/:id', CategoryController.DeleteAsync);

router.get('/list-category-hasparentid', CategoryController.GetListCategoryHasParentIdAsync);

module.exports = router;