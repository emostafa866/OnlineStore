const req = require('express/lib/request')
const CartModel = require('../models/cart_model')

exports.Showcarts = (req, res, next) => {
    CartModel.viewcart(req.session.user_id).then(carts => {
        res.render('cart', {
            carts: carts,
            IsUser: true,
            IsAdmin: req.session.admin
        })
    }).catch(err => console.log(err))

};

exports.AddToCart = (req, res, next) => {
    console.log(req.body)
    CartModel.CreateCart({
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        userId: req.session.user_id,
        productID: req.body.id,
    })
        .then(() => {
            res.redirect('/cart')

        })
        .catch((err) => {
            console.log('err ')
            res.redirect('/')
        })
    console.log('cart data posted')

};
exports.postSave = (req, res, next) => {
    CartModel.editCart(req.body.card_id, { amount: req.body.amount }).then(() => {
        res.redirect('/cart')
        console.log('cart edited')
        console.log(req.body)
    }).catch(err => console.log(err))
};

exports.postDelete = (req, res, next) => {
    CartModel.DeleteCart(req.body.card_id).then(() => {
        res.redirect('/cart')
        console.log('cart deleted')
    }).catch(err => console.log(err))
}


