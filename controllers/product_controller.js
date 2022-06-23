const detailsModel = require('../models/home_model')

exports.getproductDetail = (req, res, next) => {

    let id = req.params.id
    detailsModel.productbyId(id).then((product) => {
        res.render('product', {
            product: product,
            IsUser: req.session.user_id,
            IsAdmin: req.session.admin

        })
    })
}