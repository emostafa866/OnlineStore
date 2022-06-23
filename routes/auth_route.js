const Router = require('express').Router();
const check = require('express-validator').check
const bodyparser = require('body-parser').urlencoded({
    extended: true
});
const authController = require('../controllers/auth_controller')
const authprotector = require('./guards/auth.guard')


Router.get('/signup', authprotector.NotAuth, authController.getsignup);
Router.post('/signup', bodyparser,
    check('username').notEmpty(),
    check('email').notEmpty().isEmail(),
    check('password').isLength({ min: 6 }),
    check('confirmpassword').custom((value, { req }) => {
        if (value === req.body.password) return true
        else throw 'password is not the same'
    })
    , authController.postSignup);
Router.get('/login', authprotector.NotAuth, authController.getlogin);
Router.post('/login', bodyparser,
    check('email').notEmpty().isEmail(),
    check('password').notEmpty(),
    authController.postlogin);
Router.all('/logout', authController.logout)

module.exports = Router

