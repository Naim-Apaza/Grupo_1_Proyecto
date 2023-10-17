// Controlador del index

const controller = {
  index: (req, res) => {
    res.render("index", { usuario: req.session.userLogged });
  },
};

module.exports = controller