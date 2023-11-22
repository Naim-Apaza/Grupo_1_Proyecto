// Controlador de productos
const db = require("../database/models/index.js");
const { Op } = require("sequelize");

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
  products: async (req, res) => {
    try {
      const productos = await db.Producto.findAll({});

      const plataformas = await db.Plataforma.findAll();

      res.render("products", {
        titulo: null,
        productos: productos,
        plataformas: plataformas,
        usuario: req.session.userLogged,
      });
    } catch (error) {
      console.log("Error:" + error);
      res.render("error404");
    }
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
        cant_desc: req.body.descuento,
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
        cant_desc: req.body.descuento,
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
    db.Producto.destroy({
      where: {
        id_producto: req.params.id,
      },
    }).then(function (response) {
      res.redirect("/");
    });
  },
  search: async (req, res) => {
    try {
      let titulo = req.body.searcher;
      let products = await db.Producto.findAll({
        where: {
          nombre: { [Op.like]: `%${titulo}%` },
        },
      });

      return res.render("products", {
        titulo: titulo,
        productos: products,
        usuario: req.session.userLogged,
      });
    } catch (error) {
      console.log(error);
      res.render("error404");
    }
  },
};

module.exports = controller;
