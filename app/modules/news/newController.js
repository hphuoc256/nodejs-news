const { Validator } = require('node-input-validator');
let newRepository = require('./newRepository');
let { New } = require("./newModel")

module.exports = {
    CreatedAsync: async function (req, res) {
        try{
            let result = await newRepository.Created(req);
            if (!result) { res.redirect('/add-news') }
            res.redirect('/list-news');
        }catch(err){
            return res.status(500).send({ error: "Server Error" });
        }
        
    },

    UpdateAsync: async function (req, res) {
        try{
            let result = await newRepository.Updated(req);
            if (!result) throw null;
            res.redirect('/list-news');
        }catch(err){
            return res.status(500).send({ error: "Server Error" });
        }
    },

    DeleteAsync: async (req, res) => {
        try {
            let result = await newRepository.Deleted(req);
            if (!result) throw null
    
            res.redirect('/list-news');
    
        } catch (err) {
    
            return res.status(500).send({ error: "Server Error" });
        }
    },

    GetByIdAsync: async (req, res) => {
        try{
            let result = await newRepository.GetById(req);
           
            if (!result) throw null;
            res.render('pages/news/edit-news', {data: result});
        }catch(err){
            return res.status(500).send({ error: "Server Error" });
        }
    },

    GetAllAsync : async (req, res) => {
        try {
            let result = await newRepository.GetAll();
            if(!result) throw null;
            res.render('pages/news/list-news', {data: result})
        } catch (err) {
            return res.status(500).send({ error: "Server Error" });
        }
    }

};