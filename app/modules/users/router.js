const express = require('express');
var router = express.Router();
var UserController = require('./userController');
var AuthCheck = require('../../middlewares/AuthCheck');

router.get('/login', AuthCheck.verifyUser, (req, res) => { res.render('pages/users/login') });

router.post('/login', UserController.login);

router.get('/logout', UserController.logout);

router.get('/profile', AuthCheck.checkLogin, UserController.profile);

router.get('/list-user', AuthCheck.checkLogin, UserController.getAll);

router.get('/user/:id', AuthCheck.checkLogin, UserController.detailUser);

router.get('/delete-user/:id', AuthCheck.checkLogin, UserController.deleteUser);

router.post('/update-profile/:id', AuthCheck.checkLogin, UserController.updateProfile);

router.post('/ajax-block/:id', AuthCheck.checkLogin, UserController.AjaxupdateProfile);

router.post('/update-password/:id', AuthCheck.checkLogin, UserController.updatePassword);

router.get('/add-user', AuthCheck.checkLogin, (req, res) => { res.render('pages/users/register') });

router.post('/register', UserController.register);

module.exports = router;