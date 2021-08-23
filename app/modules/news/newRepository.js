let { New } = require("./newModel")
const imageRepo = require("../images/imageRepository")

module.exports = {
    Created: async function (req, res) {
        try {
            let data = {
                user_id: user.id,
                name: req.body.name,
                slug: req.body.slug,
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                status: req.body.status,
                hot: req.body.hot,
                views: req.body.views,
                meta_keyword: req.body.meta_keyword,
                meta_description: req.body.meta_description
            }

            if(req.file != null){
                const fileName = await imageRepo.upload(req);
                data.image =  process.env.APP_URL + ':' + process.env.APP_PORT + '/image/' + fileName;
            }

            let result = await New.create(data);
            if (!result || result == '' || result == null) {
                return false
            } else {
                return result
            }

        } catch (err) {
            return err;
        }
    },

    Updated: async function (req, res) {
        try {
            let data = {
                user_id: user.id,
                name: req.body.name,
                slug: req.body.slug,
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                status: req.body.status,
                hot: req.body.hot,
                views: req.body.views,
                meta_keyword: req.body.meta_keyword,
                meta_description: req.body.meta_description
            }
            
            if(req.file != null){
                const fileName = await imageRepo.upload(req);
                data.image =  process.env.APP_URL + ':' + process.env.APP_PORT + '/image/' + fileName;
            }
            let updateNew = await New.update(data, {
                where: {
                    id: req.params.id
                }
            });
            return updateNew;
        } catch (err) {
            return err;
        }
    },

    Deleted: async (req) => {
        await New.destroy({
            where: {
                id: req.params.id
            }
        })
        return true;
    },

    GetById: async (req, res) => {
        let _new = await New.findOne({
            where: {
                id: req.params.id 
            }
        });
        if (!_new) throw null;
        return _new;
    },

    GetAll: async (req, res) => {
        let listNew = await New.findAll();
        if (!listNew)  throw null;
        return listNew;
    }

};