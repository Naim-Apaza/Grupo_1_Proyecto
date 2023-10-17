//Verificar que NO este logueado

const guesMiddleware = (req, res, next) => {
    if (req.session.userLogged === undefined) {
        next();
    } else {
        res.render("auth-guestError", {usuario: req.session.userLogged});
    }
};

module.exports = guesMiddleware;
