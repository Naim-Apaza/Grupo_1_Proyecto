// Controlador del index
const fs = require("fs");
const path = require("path");
const db = require("../database/models/index.js");
const Op = db.Sequelize.Op;

const controller = {
  index: (req, res) => {
    db.Producto.findAll({
      where:{
        descuento: {[db.Sequelize.Op.gt]:0}
      },
      order: [
        ["descuento",'DESC']
      ],
      limit:8
  })
      .then(function(productos){
        res.render("index", { productos:productos,usuario: req.session.userLogged });
      })
      .catch(function(error){
        console.log(error)
        res.render("error404")
      })
  },
};

module.exports = controller