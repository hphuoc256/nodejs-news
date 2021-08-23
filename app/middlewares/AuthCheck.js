let checkLogin = async function (req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('login');
    }
}

let verifyUser = async function (req, res, next) {
    if (req.session && req.session.user) {
        res.redirect('/');
    } else {
        return next();
    }
}

module.exports = {
    checkLogin,
    verifyUser
}