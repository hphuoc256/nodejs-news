let path = require("path");
let imageRepo = require("./imageRepository");

module.exports = {
    upload : async (req, res)=>{
        // console.log(req.file)
        var rs = await imageRepo.upload(req)
        return rs;
    }
}