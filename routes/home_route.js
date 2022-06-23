const Router = require('express').Router()
const homecontroller = require('../controllers/home_controller')

Router.get('/', homecontroller.gethome)

module.exports = Router