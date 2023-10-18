//Verificar que SI este logueado

const authMiddleware = (req, res, next) => {
    if (req.session.userLogged != undefined) {
        next();
    } else {
        res.redirect("/users/login");
    }
};

module.exports = authMiddleware;