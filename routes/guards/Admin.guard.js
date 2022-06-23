exports.IsAdmim = (req, res, next) => {
    if (req.session.admin) next();
    else res.redirect('/');
}