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
      });

      const plataformas = await db.Plataforma.findAll()

      res.render("index", {
        productos: productos,
        plataformas: plataformas,
        usuario: req.session.userLogged,
      });
    } catch (error) {
      console.log("Error:" + error);
      res.render("error404");
    }
  },
};

module.exports = controller;
