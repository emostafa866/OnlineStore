const authModel = require('../models/auth_model')
const validationResult = require('express-validator').validationResult
exports.getsignup = (req, res, next) => {
    res.render("signup", {
        IsUser: false,
        IsAdmin: false,
        signuperror: req.flash('signuperrors')
    })
};
exports.postSignup = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel.CreateUser(req.body.username, req.body.email, req.body.password).then(() => {
            res.redirect('/login')
        }).catch((err) => {
            console.log(err)
            res.redirect('/signup')
        })
    }
    else {
        req.flash('signuperrors', validationResult(req).array())
        res.redirect('/signup')
    }

};

exports.getlogin = (req, res, next) => {
    res.render("login", {
        IsUser: false,
        IsAdmin: false,
        authEror: req.flash('autherr')[0],
        validationErr: req.flash('validationError')
    });
};
exports.postlogin = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel.login(req.body.email, req.body.password).then((result) => {
            req.session.user_id = result.id;
            req.session.admin = result.admin;
            res.redirect('/')
        }).catch(err => {

            req.flash('autherr', err)
            res.redirect('/login')
            console.log(req.flash('autherr', err))
        })
    }
    else {
        req.flash('validationError', validationResult(req).array())
        res.redirect('/login')
    }

};
exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}
