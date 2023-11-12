// Controlador de productos

const fs = require("fs");
const path = require("path");
const db = require("../database/models/index.js");
const Producto = require("../database/models/Producto.js");
const Op = db.Sequelize.Op;

const controller = {
  detail: (req, res) => {
    db.Producto.findByPk(req.params.id)
      .then(function (producto) {
        res.render("productDetail", {
          producto: producto,
          usuario: req.session.userLogged,
        });
      })
      .catch(function (error) {
        console.log(error);
        res.render("error404");
      });
  },
  products: (req, res) => {
    db.Producto.findAll({
      include: [{ association: "plataformas" }],
    })
      .then(function (productos) {
        res.render("products", {
          productos: productos,
          usuario: req.session.userLogged,
        });
      })
      .catch(function (error) {
        console.log(error);
        res.render("error404");
      });
  },
  create: (req, res) => {
    db.Categoria.findAll()
      .then(function (categoria) {
        db.Plataforma.findAll()
          .then(function (plataforma) {
            res.render("productCreate", {
              categoria: categoria,
              plataforma: plataforma,
              usuario: req.session.userLogged,
            });
          })
          .catch(function (error) {
            console.log(error);
            res.render("error404");
          });
      })
      .catch(function (error) {
        console.log(error);
        res.render("error404");
      });
  },
  store: (req, res) => {
    let imageFile = req.file;
    if (imageFile !== undefined) {
      db.Producto.create({
        nombre: req.body.nombre,
        descripcion: req.body.detalle,
        precio: req.body.precio,
        img_prod: req.file.filename,
        descuento: req.body.descuento,
        id_plataforma: req.body.plataforma,
      });
      res.redirect("/");
    } else {
      res.render("productCreate");
    }
  },
  edit: (req, res) => {
    db.Categoria.findAll()
      .then((categoria) => {
        db.Plataforma.findAll().then(function (plataforma) {
          db.Producto.findByPk(req.params.id, {
            include: [{ association: "plataformas" }],
          })
            .then(function (productsToEdit) {
              res.render("productEdit", {
                categoria: categoria,
                plataforma: plataforma,
                usuario: req.session.userLogged,
                productsToEdit: productsToEdit,
              });
            })
            .catch(function (error) {
              console.log(error);
              res.render("error404");
            });
        });
      })
      .catch(function (error) {
        console.log(error);
        res.render("error404");
      });
    
  },
  actualizar: (req, res) => {
    db.Producto.update(
      {
        nombre: req.body.nombre,
        precio: req.body.precio,
        descuento: req.body.descuento,
        descripcion: req.body.detalle,
        img_prod: req.file.filename,
        id_plataforma: req.body.plataforma,
      },
      {
        where: {
          id_producto: req.params.id,
        },
      }
    );

    res.redirect("/products");
  },
  borrar: (req, res) => {
    /*     res.send(req.params.id)
     */ db.Producto.destroy({
      where: {
        id_producto: req.params.id,
      },
    }).then(function () {
      res.redirect("/");
    });
  },
};

module.exports = controller;
