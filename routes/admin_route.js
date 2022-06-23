const Router = require('express').Router();
const check = require('express-validator').check
const bodyparser = require('body-parser').urlencoded({
    extended: true
});
const multer = require('multer')
const adminProtector = require('./guards/Admin.guard')
const adminController = require('../controllers/admin_controller');
const req = require('express/lib/request');
Router.get('/Addprod', adminProtector.IsAdmim, adminController.getAdd)

Router.post('/Addprod', adminProtector.IsAdmim, multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'photos')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }

    })
}).single('image'), bodyparser, adminController.postAdd)

module.exports = Router  