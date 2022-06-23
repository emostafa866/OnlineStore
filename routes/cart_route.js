const Router = require('express').Router();
const check = require('express-validator').check
const bodyparser = require('body-parser').urlencoded({
    extended: true
});
const CartController = require('../controllers/cart_controller')
const authprotector = require('./guards/auth.guard')
console.log('cart route working')
Router.get('/', CartController.Showcarts)
Router.post('/', bodyparser, authprotector.IsAuth, CartController.AddToCart)
Router.post('/save', bodyparser, CartController.postSave)
Router.post('/delete', bodyparser, CartController.postDelete)





module.exports = Router