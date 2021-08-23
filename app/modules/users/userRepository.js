const User = require("./userModel");
const bcrypt = require('bcrypt');

let isLogging = async (req) => {
    if (req.session && req.session.user) {
        return true;
    } else {
        return false;
    }
}

let findUser = async (body) => {
    return await User.findOne({
        where: {
            email: body.email,
        },
    });
}

let findUserID = async (req) => {
    let userID = await User.findOne({
        where: {
            id: req.params.id,
        },
    });
    return userID;
}

let signIn = async (req) => {
    let user = await findUser(req.body);
    if (user === null || user.dataValues.level !== 1) {
        return false;
    } else {
        let comparePass = await bcrypt.compare(req.body.password, user.password);
        if (comparePass === false) {
            return false;
        } else {
            req.session.user = user;
            delete user.password;
            return true;
        }
    };
};

let getAll = async (req) => {
    let allUser = await User.findAll();
    if (allUser === null) {
        return [];
    }
    return allUser;
}

let deleteUser = async (req) => {
    await User.destroy({
        where: {
            id: req.params.id
        }
    });
    return true;
}

let updateUser = async (req, res) => {
    let findID = await findUserID(req);
    if (findID === null) {
        return false;
    } else {
        let data = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthday: req.body.birthday,
            address: req.body.address,
            gender: req.body.gender,
            phone: req.body.phone,
            avatar: req.body.avatar,
            status: req.body.status,
            level: req.body.level,
        }

        await User.update(data, {
            where: {
                id: req.params.id
            }
        });
        return true;
    }
}

let changePassword = async (req, res) => {
    let user = await findUserID(req);

    if (user === null) {
        return false;
    }

    let comparePass = await bcrypt.compare(req.body.old_password, user.password);

    if (comparePass === false) {
        return false;
    } else {
        const salt = await bcrypt.genSalt(10);
        const password = {
            password: await bcrypt.hash(req.body.password, salt)
        };
        await User.update(password, {
            where: {
                id: user.id
            }
        });
        return true;
    }
}

let detailUser = async (req, res) => {
    let detail = await findUserID(req);
    return detail;
}

let registerUser = async (req, res) => {
    let checkEmail = await findUser(req.body);
    if (checkEmail !== null) {
        return false;
    }

    const salt = await bcrypt.genSalt(10);
    let data = {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
        status: '1'
    }

    let insertData = await User.create(data);
    return insertData;
}

module.exports = {
    signIn,
    isLogging,
    getAll,
    deleteUser,
    updateUser,
    changePassword,
    detailUser,
    registerUser
};