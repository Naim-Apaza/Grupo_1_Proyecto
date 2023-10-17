//Verificar que SI este logueado

const authMiddleware = (req, res, next) => {
    if (req.session.userLogged != undefined) {
        next();
    } else {
        res.render("auth-guestError", {usuario: req.session.userLogged});
    }
};

module.exports = authMiddleware;