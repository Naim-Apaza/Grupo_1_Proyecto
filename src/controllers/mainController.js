// Controlador del index
const db = require("../database/models/index.js");

const controller = {
  index: async (req, res) => {
    try {
      const ofertas = await db.Producto.findAll({
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

      const novedades = await db.Producto.findAll({
        order: [["id_producto", "DESC"]],
        limit: 8,
        include: [{
          model: db.Plataforma,
          as: "plataformas"
        }]
      })

      res.render("index", {
        ofertas: ofertas,
        novedades: novedades,
        usuario: req.session.userLogged,
      });
    } catch (error) {
      res.render("error", { error: "Problema conectando a la base de datos" });
    }
  },
};

module.exports = controller;
