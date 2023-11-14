//Verificar que NO este logueado

const guesMiddleware = (req, res, next) => {
    if (req.session.userLogged == undefined) {
        next();
    } else {
        res.redirect("/");
    }
};

module.exports = guesMiddleware;
