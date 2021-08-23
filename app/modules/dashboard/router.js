const express = require('express');
var router = express.Router();
var AuthCheck = require('../../../app/middlewares/AuthCheck');
var DashboardController = require('./dashboardController');

router.get('/', DashboardController.index);

module.exports = router;