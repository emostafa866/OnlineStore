const Router = require('express').Router()
const productconroller = require('../controllers/product_controller')

Router.get('/:id', productconroller.getproductDetail)

module.exports = Router