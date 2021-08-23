const Service = require("./serviceModel")
const imageRepo = require("../images/imageRepository")


let findServiceID = async (req) => {
    let serviceID = await Service.findOne({
        where: {
            id: req.params.id,
        },
    });
    return serviceID;
}

let _allService = async (req, res) => {
    let list_services = await Service.findAll({
        where: {
            status: '1'
        },
    })
    if (list_services === null) {
        return false;
    }
    return list_services;
}

let _detailService = async (req, res) => {
    let _detaiID = await findServiceID(req)
    return _detaiID;
}

let Created = async (req, res) => {
    let data = {
        name,
        parent_id,
        title,
        description,
        price,
        sell,
        slug,
        image,
        status,
        meta_keyword,
        meta_description
    } = req.body

    if(req.file != null){
        const fileName = await imageRepo.upload(req);
        req.body.image =  process.env.APP_URL + ':' + process.env.APP_PORT + '/image/' + fileName;
    }

    let createService = await Service.create(data);
    if (!createService || createService == '' || createService == null) throw null;
    return createService;
}

let updateService = async (req, res) => {
    let data = {
        name,
        parent_id,
        title,
        description,
        price,
        sell,
        slug,
        image,
        status,
        meta_keyword,
        meta_description
    } = req.body;

    if(req.file != null){
        const fileName = await imageRepo.upload(req);
        req.body.image =  process.env.APP_URL + ':' + process.env.APP_PORT + '/image/' + fileName;
    }

    let updateService = await Service.update(data, {
        where: {
            id: req.params.id
        }
    });
    return updateService;
}

let GetListServiceHasParentId = async (req, res) => {
    let root = [];
    let _allService = await Service.findAll({ raw: true });
  
    _allService.forEach(node => {
        if (!node['parent_id'] || node['parent_id'] == 0) return root.push(node);

        let parentIndex = _allService.findIndex(x => x.id === node['parent_id']);

        if (!_allService[parentIndex].hasOwnProperty('children')) {
            return _allService[parentIndex]['children'] = [node];
        }

        _allService[parentIndex]['children'].push(node);
    });

    return root;
}

module.exports = {
    _allService,
    _detailService,
    Created,
    updateService,
    GetListServiceHasParentId
}