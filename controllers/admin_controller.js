const AdminModel = require('../models/admin _model')

exports.getAdd = (req, res, next) => {
    res.render("Addprod", {
        IsUser: true,
        IsAdmin: true
    });
};

exports.postAdd = (req, res, next) => {
    console.log(req.body)
    console.log(req.file)
    AdminModel.AddProduct({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        image: req.file.filename
    })
        .then(() => {
            console.log('product added')
        })

};