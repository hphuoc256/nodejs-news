const express = require('express');
let router = express.Router();
let AuthCheck = require('../../middlewares/AuthCheck');
const { route } = require('../users/router');
let ServiceController = require('./serviceController');
const upload = require('../../middlewares/uploadMiddleware');

router.get('/list-service', ServiceController.allService);

router.get('/service/:id', ServiceController.detailService);

router.get('/child_service', ServiceController.childService);

router.get('/add-service', ServiceController.addService);

router.post('/add-service', upload.single('image'), ServiceController.CreateAsync);

router.post('/update-service/:id', upload.single('image'), ServiceController.updateService);

module.exports = router;