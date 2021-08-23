const express = require('express');
var router = express.Router();
var AuthCheck = require('../../middlewares/AuthCheck')
const ContactController = require('./contactController')

router.get('/list-contact', ContactController.getListcontacts);

router.get('/contact/:id', ContactController.getDetailcontact);

router.get('/add-contact', (req, res) => {res.render('pages/contacts/add-contact')});

module.exports = router;