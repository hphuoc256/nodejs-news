const express = require('express');
var router = express.Router();
var NewController = require('./newController');
var AuthCheck = require('../../middlewares/AuthCheck');
const upload = require('../../middlewares/uploadMiddleware');

router.get('/list-news', NewController.GetAllAsync);

router.get('/add-news', (req, res) =>  { res.render('pages/news/add-news') });

router.post('/add-news', upload.single('image'), NewController.CreatedAsync);

router.get('/news/:id', NewController.GetByIdAsync);

router.post('/update-news/:id', upload.single('image'), NewController.UpdateAsync);

router.get('/delete-news/:id', NewController.DeleteAsync)


module.exports = router;