const CategoryModel = require('./categoryModel');

let Created = async (req, res) => {
    let data = {
        name,
        parent_id,
        slug,
        link,
        image,
        status
    } = req.body;

    let category = await CategoryModel.create(data);

    if (!category || category == '' || category == null) throw null;

    return category;
}

let Updated = async (req, res) => {
    let data = {
        name,
        parent_id,
        slug,
        link,
        image,
        status
    } = req.body;
    let updateCategory = await CategoryModel.update(data, {
        where: {
            id: req.params.id
        }
    });
    if (!updateCategory || updateCategory == '' || updateCategory == null) throw null;
    return updateCategory;
}

let Deleted = async (req) => {
    await CategoryModel.destroy({
        where: {
            id: req.params.id
        }
    });
    return true;
}

let getAll = async (req, res) => {
    let allCategory = await CategoryModel.findAll({ raw: true });

    if (allCategory === null) {
        return false;
    }

    return allCategory;
}

let GetListCategoryHasParentId = async (req, res) => {
    let root = [];
    let category = await getAll();
  
    category.forEach(node => {
        if (!node['parent_id'] || node['parent_id'] == 0) return root.push(node);

        let parentIndex = category.findIndex(x => x.id === node['parent_id']);

        if (!category[parentIndex].hasOwnProperty('children')) {
            return category[parentIndex]['children'] = [node];
        }

        category[parentIndex]['children'].push(node);
    });

    return root;
}

let getdetailCategory = async (req, res) => {
    let result = await CategoryModel.findOne({
        where: {
            id: req.params.id
        }
    })

    let list_category = await GetListCategoryHasParentId();
    
    return {result, list_category};
}



module.exports = {
    getAll,
    Created,
    Updated,
    Deleted,
    GetListCategoryHasParentId,
    getdetailCategory
}
