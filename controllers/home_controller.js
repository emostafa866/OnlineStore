const productModel = require('../models/home_model')
exports.gethome = (req, res, next) => {


    let category = req.query.category
    let productPromise;
    if (category && category !== 'all') {
        productPromise = productModel.productbycategory(category)

    } else {
        productPromise = productModel.getAllProducts()
    }
    productPromise.then(products => {
        res.render('index', {
            products: products,
            IsUser: req.session.user_id,
            IsAdmin: req.session.admin
        })
    })
}

