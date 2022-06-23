exports.NotAuth = (req, res, next) => {
    if (!req.session.user_id) next();
    else res.redirect('/');
}
exports.IsAuth = (req, res, next) => {
    if (req.session.user_id) next();
    else res.redirect('/');
}