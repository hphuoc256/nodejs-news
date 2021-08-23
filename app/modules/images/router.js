const express = require('express');
const router = express.Router();
const ImageController = require('./imageController');
const upload = require('../../middlewares/uploadMiddleware');

router.post('/upload', upload.single('image'), ImageController.upload)

router.get('/upload', (req, res) => {res.render('upload')})


module.exports = router;