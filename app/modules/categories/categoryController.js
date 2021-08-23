const categoryRepository = require('./categoryRepository');


let index = async (req, res) => {
    let result = await categoryRepository.getAll();
    
    res.render('pages/categories/list-category', {data: result})
}

let addCategory = async (req, res) => {
    let result = await categoryRepository.GetListCategoryHasParentId();

    res.render('pages/categories/add-category', {data: result})
}

let CreateAsync = async (req, res) => {
    try {
        let result = await categoryRepository.Created(req);
        if (!result) throw null;
        res.redirect('/list-category')
    } catch (err) {
        return res.status(500).send({ error: "Server Error" });
    }
}

let UpdateAsync = async (req, res) => {
    try {
        let result = await categoryRepository.Updated(req);
        if (!result) throw null;
        res.redirect('/list-category')
    } catch (err) {
        return res.status(500).send({ error: "Server Error" });
    }
}

let DeleteAsync = async (req, res) => {
    try {
        let result = await categoryRepository.Deleted(req);

        if (!result) throw null

        res.redirect('/list-category');

    } catch (err) {

        return res.status(500).send({ error: "Server Error" });
    }
}

let GetListCategoryHasParentIdAsync = async (req, res)=>{
    try {
        let result = await categoryRepository.GetListCategoryHasParentId();
        if(!result) throw null;
        return res.json({success: true, data: result});
    } catch(err) {
        return res.status(500).send({ error: "Server Error" });
    }
}

let detailCategory = async (req, res) => {
    try {
        let result = await categoryRepository.getdetailCategory(req);

        if(!result) throw null;
        
        res.render('pages/categories/edit-category', {
            'data' : result.result,
            'list_category' : result.list_category
        })
    } catch(err){
        return res.status(500).send({ error: "Server Error" });
    }
}

module.exports = {
    index,
    addCategory,
    CreateAsync,
    UpdateAsync,
    DeleteAsync,
    GetListCategoryHasParentIdAsync,
    detailCategory
}