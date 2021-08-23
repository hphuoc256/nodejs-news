const {
    Validator
} = require('node-input-validator');
const UserRepository = require("./userRepository");
const ORM_Service = require('../../services/ORM-Service');


let login = async function (req, res) {
    try {
        const v = new Validator(req.body, {
            email: 'required|email',
            password: 'required'
        });
        v.check().then((matched) => {
            if (!matched) {
                res.render('pages/users/login', {
                    data: v.errors
                });
            }
        });

        let signIned = await UserRepository.signIn(req)
        // res.send(signIned);

        if (signIned === false) {
            res.render('pages/users/login', {
                data: "Email or Password is incorrect"
            });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        return res.status(500).send({
            error: "Server Error"
        });
    }
}

let profile = async function (req, res) {
    try {
        let profile = req.session.user;
        delete profile.password;
        res.render('pages/users/profile', {
            data: req.session.user
        });
    } catch (error) {
        return res.status(500).send({
            error: "Server Error"
        });
    }
}

let logout = async function (req, res) {
    try {
        let isLogged = await UserRepository.isLogging(req);
        if (isLogged === false) {
            res.redirect('/login');
        }
        req.session.user = null;
        res.redirect('/login');

    } catch (error) {
        return res.status(500).send({
            error: "Server Error"
        });
    }
}

let getAll = async function (req, res) {
    try {
        let result = await ORM_Service.All_User(req);

        res.render('pages/users/list-user', {
            data: result
        })
    } catch (error) {
        return res.status(500).send({
            error: "Server Error"
        });
    }

}

let deleteUser = async function (req, res) {
    try {
        let result = await UserRepository.deleteUser(req);
        res.redirect('/list-user');
    } catch (error) {
        return res.status(500).send({
            error: "Server Error"
        });
    }
}

let updateProfile = async function (req, res) {
    try {
        let result = await UserRepository.updateUser(req);
        if (result == false) {
            res.send({
                message: 'ID not exist'
            });
        }
        res.redirect('/list-user');
    } catch (error) {
        return res.status(500).send({
            error: "Server Error"
        });
    }
}

let AjaxupdateProfile = async (req, res) => {
    try {
        let result = await UserRepository.updateUser(req);
        if (result == false) {
            res.send({
                message: 'ID not exist'
            });
        }
        res.send({
            message: 'success'
        });
    } catch (error) {
        return res.status(500).send({
            error: "Server Error"
        });
    }
}

let updatePassword = async function (req, res) {
    try {
        const v = new Validator(req.body, {
            old_password: 'required|string|minLength:6|maxLength:255',
            password: 'required|string|minLength:6|maxLength:255',
            re_password: 'required|same:password'
        });
        v.check().then((matched) => {
            console.log(v.errors);
            if (!matched) {
                return res.status(201).json({
                    status: false,
                    error: v.errors
                });
            }
        });

        let result = await UserRepository.changePassword(req);
        
        if (result === false) {
            let old_password = {
                message:'Old Password is incorrect'
            }
            return res.status(201).json({
                status: false,
                error: {old_password}
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Success'
        });

    } catch (error) {
        return res.status(500).send({
            error: "Server Error"
        });
    }
}

let detailUser = async (req, res) => {
    try {
        let result = await UserRepository.detailUser(req);
        res.render('pages/users/edit-user', {
            data: result
        });

    } catch (error) {
        return res.status(500).send({
            error: "Server Error"
        });
    }
}

let register = async (req, res) => {
    try {
        const v = new Validator(req.body, {
            email: 'required|email|string|maxLength:255',
            password: 'required|string|minLength:6|maxLength:255',
            re_password: 'required|same:password'
        });
        v.check().then((matched) => {
            if (!matched) {
                return res.status(201).json({
                    status: false,
                    error: v.errors
                });
            }
        });

        let result = await UserRepository.registerUser(req);
       
        if (result === false) {
            let email = {
                message:'Emai exist'
            }
            return res.status(201).json({
                status: false,
                error: {email}
            });
        }
        return res.status(200).json({
            status: true,
            message: 'success',
            data: result
        });

    } catch (error) {
        return res.status(500).send({
            error: "Server Error"
        });
    }
}



module.exports = {
    login,
    logout,
    profile,
    getAll,
    deleteUser,
    updateProfile,
    updatePassword,
    detailUser,
    register,
    AjaxupdateProfile
};