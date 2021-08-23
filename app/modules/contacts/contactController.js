const ContactRepository = require('./contactRepository');

let getListcontacts = async (req, res) => {
    let result = await ContactRepository.getListcontacts();

    res.render('pages/contacts/list-contact', {
        data: result
    })
}

let getDetailcontact = async (req, res) => {
    let result = await ContactRepository.getDetailcontact(req);

    res.render('pages/contacts/edit-contact', {
        data: result
    })
}
module.exports = {
    getListcontacts,
    getDetailcontact
}