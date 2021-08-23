const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const timeout = require('connect-timeout');
require('dotenv').config();
const http = require('http');
const {APP_PORT, SECRET_KEY} = process.env;
require('./app/cors/databaseConn');
const AuthCheck = require('./app/middlewares/AuthCheck');
const server = http.createServer(app);
const multer = require('multer');
const { Dir } = require('fs');

app.use(timeout(5 * 60 * 1000));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/public')));
app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: process.env.SECRET_KEY, 
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(function(req, res, next) {
    user = req.session.user;
    next();
});

app.use('/image/:image', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/uploads/'+`${req.params.image}`))
})

app.use(require('./app/modules/images/router'));
app.use(require('./app/modules/users/router'));
app.use(AuthCheck.checkLogin, require('./app/modules/dashboard/router'));
app.use(AuthCheck.checkLogin, require('./app/modules/products/router'));
app.use(AuthCheck.checkLogin, require('./app/modules/news/router'));
app.use(AuthCheck.checkLogin, require('./app/modules/services/router'));
app.use(AuthCheck.checkLogin, require('./app/modules/contacts/router'));
app.use(AuthCheck.checkLogin, require('./app/modules/categories/router'));


server.listen(process.env.APP_PORT, function () {
    console.log(`App listening at port:${process.env.APP_PORT}`)
});
