
const authorizeUser = function(req, res, next) {
    if(req.locals.user.role == 'admin') {
        next();
    } else {
        res.status(403).send('you are not authorized to access this page');
    }
}

module.exports = {
    authorizeUser
}