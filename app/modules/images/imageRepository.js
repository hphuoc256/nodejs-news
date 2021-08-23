let fs = require("fs");
const path = require('path');
const ImageModel = require('./imageModel');
const Resize = require('../../../Resize');

const upload = async (req, res) => {
    const imagePath = path.join(__dirname, 'public/uploads').replace('app\\modules\\images\\', '');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        return false;
    }
    console.log(req.file.buffer);
    const filename = await fileUpload.save(req.file.buffer);
    return filename;
};

module.exports = {
    upload,
};
