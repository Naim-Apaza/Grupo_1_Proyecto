// Controlador de productos
const db = require("../database/models/index.js");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const { render } = require("ejs");

const controller = {
  detail: async (req, res) => {
    try {
      const productos = await db.Producto.findByPk(req.params.id);

      const plataformas = await db.Plataforma.findAll();

      res.render("productDetail", {
        titulo: null,
        producto: productos,
        plataforma: plataformas,
        usuario: req.session.userLogged,
      });
    } catch (error) {
      console.log("Error:" + error);
      res.render("error404");
    }
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
  store: async (req, res) => {
    let imageFile = req.file;
    let resultValidation = validationResult(req);
    let errores = resultValidation.mapped();
    if (resultValidation.isEmpty()) {
      if (imageFile !== undefined) {
        const producto = await db.Producto.create({
          nombre: req.body.nombre,
          descripcion: req.body.detalle,
          precio: req.body.precio,
          img_prod: req.file.filename,
          cant_desc: req.body.descuento,
          id_plataforma: req.body.plataforma,
        });
        for (let i = 0; i < req.body.tag.length; i++) {
          const tag = req.body.tag[i];
          producto.addCategorias(Number(tag));
        }
        res.redirect("/");
      } else {
        db.Categoria.findAll()
          .then(function (categoria) {
            db.Plataforma.findAll()
              .then(function (plataforma) {
                res.render("productCreate", {
                  categoria: categoria,
                  plataforma: plataforma,
                  usuario: req.session.userLogged,
                  error: errores,
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
      }
    } else {
      db.Categoria.findAll()
        .then(function (categoria) {
          db.Plataforma.findAll()
            .then(function (plataforma) {
              res.render("productCreate", {
                categoria: categoria,
                plataforma: plataforma,
                usuario: req.session.userLogged,
                error: errores,
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
    }
  },
  edit: async (req, res) => {
    // db.Categoria.findAll()
    //   .then((categoria) => {
    //     db.Plataforma.findAll().then(function (plataforma) {
    //       db.Producto.findByPk(req.params.id, {
    //         include: [{ association: "plataformas" }],
    //       })
    //         .then(function (productsToEdit) {
    //           res.render("productEdit", {
    //             categoria: categoria,
    //             plataforma: plataforma,
    //             usuario: req.session.userLogged,
    //             productsToEdit: productsToEdit,
    //           });
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //           res.render("error404");
    //         });
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     res.render("error404");
    //   });
    try {
      const id = req.params.id;
      const categorias = await db.Categoria.findAll();
      const plataformas = await db.Plataforma.findAll();
      const productosCategorias = await db.ProductoCategoria.findAll();
      const producto = await db.Producto.findByPk(id, {
        include: [{ association: "plataformas" }],
      });

      if (categorias && plataformas && producto) {
        res.render("productEdit", {
          categorias: categorias,
          plataformas: plataformas,
          pivot: productosCategorias,
          usuario: req.session.userLogged,
          producto: producto,
        });
      }
    } catch (error) {
      console.log(error);
      res.render("error404");
    }
  },
  actualizar: (req, res) => {
    let resultValidation = validationResult(req);
    let errores = resultValidation.mapped();
    if (resultValidation.isEmpty()) {
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
    } else {
      res.render("productEdit", {
        categoria: categoria,
        plataforma: plataforma,
        usuario: req.session.userLogged,
        productsToEdit: productsToEdit,
        error: errores,
      });
    }
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
