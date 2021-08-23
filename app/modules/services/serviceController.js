const ServiceRepository = require('./serviceRepository');
const ORM_Service = require('../../services/ORM-Service');

let allService = async (req, res) => {
    try {
        let result = await ServiceRepository._allService();
        res.render('pages/services/list-service', {data: result})
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
}

let detailService = async (req, res) => {
    try {
        let list_services = await ServiceRepository.GetListServiceHasParentId();
        let result = await ServiceRepository._detailService(req, res);
       
        res.render('pages/services/edit-service', {data: result, list_service:list_services})
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
}

let childService = async (req, res) => {
    let result = await ORM_Service.services()
    res.send(result)
}

let addService = async (req, res) => {
    try {
        let list_services = await ORM_Service.All_Service();
        res.render('pages/services/add-service', {data: list_services})
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
}

let updateService = async (req, res) => {
    try {
        let result = await ServiceRepository.updateService(req);
        if(!result) { res.redirect('back') }
        res.redirect('/list-service');
    } catch (error) {
        return res.status(500).send({ error: "Server Error" });
    }
}

let CreateAsync = async (req, res)=>{
    try{
        let result = await ServiceRepository.Created(req);
        if(!result) { res.redirect('/add-service') }
        res.redirect('/list-service');
    }catch(err){
        return res.json({success: false, message: err.message});
    }
}


module.exports = {
    allService,
    detailService,
    childService,
    addService,
    updateService,
    CreateAsync
}