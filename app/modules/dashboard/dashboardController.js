const ContactRepository = require('../contacts/contactRepository')
const UserRepository = require('../users/userRepository')


async function index(req, res) {

    let contact = await ContactRepository.getListcontacts();
    let user = await UserRepository.getAll();

    res.render('pages/dashboard/dashboard', {
        contact,
        user
    });
}

module.exports = {
    index,
}