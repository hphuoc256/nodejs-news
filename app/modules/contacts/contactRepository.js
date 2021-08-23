const {
    Contact
} = require('./contactModel');

class Contacts {
    async getListcontacts(req, res) {
        let result = await Contact.findAll();

        return result;
    }

    async getDetailcontact(req, res) {
        let result = await Contact.findOne({
            where: {
                id: req.params.id
            }
        })

        return result;
    }
}

module.exports = new Contacts;