// Controlador del index
const db = require("../database/models/index.js");

const controller = {
  index: async (req, res) => {
    try {
      const productos = await db.Producto.findAll({
        where: {
          cant_desc: { [db.Sequelize.Op.gt]: 0 },
        },
        order: [["cant_desc", "DESC"]],
        limit: 8,
        include: [{
          model: db.Plataforma,
          as: "plataformas"
        }]
      });

      res.render("index", {
        productos: productos,
        usuario: req.session.userLogged,
      });
    } catch (error) {
      res.render("error", { error: error });
    }
  },
};

module.exports = controller;
