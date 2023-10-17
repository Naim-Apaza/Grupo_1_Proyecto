// Controlador de carrito

const controller = {
  cart: (req, res) => {
    res.render("productCart", { usuario: req.session.userLogged });
  },
};

module.exports = controller;
