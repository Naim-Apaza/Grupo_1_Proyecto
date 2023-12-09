// Controlador de productos
const db = require("../database/models/index.js");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const controller = {
  detail: async (req, res) => {
    try {
      const producto = await db.Producto.findByPk(req.params.id, {
        include: [{ model: db.Plataforma, as: "plataformas"}, { model: db.Categoria, as: "categorias"}]
      });

      res.render("productDetail", {
        producto: producto,
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
    try {
      const id = req.params.id;
      const categorias = await db.Categoria.findAll();
      const plataformas = await db.Plataforma.findAll();
      const producto = await db.Producto.findByPk(id, {
        include: [
          {
            model: db.Plataforma,
            as: "plataformas",
          },
          {
            model: db.Categoria,
            as: "categorias",
          },
        ],
      });

      if (categorias && plataformas && producto) {
        const categoriasFiltradas = categorias.filter(
          (categoria) =>
            !producto.categorias.find(
              (prodCategoria) =>
                prodCategoria.id_categoria === categoria.id_categoria
            )
        );

        res.render("productEdit", {
          categorias: categoriasFiltradas,
          plataformas: plataformas,
          usuario: req.session.userLogged,
          producto: producto,
        });
      }
    } catch (error) {
      console.log(error);
      res.render("error404");
    }
  },
  actualizar: async (req, res) => {
    let resultValidation = validationResult(req);
    let errores = resultValidation.mapped();
    const id = req.params.id;
    const categorias = await db.Categoria.findAll();
    const plataformas = await db.Plataforma.findAll();
    const producto = await db.Producto.findByPk(id, {
      include: [
        {
          model: db.Plataforma,
          as: "plataformas",
        },
        {
          model: db.Categoria,
          as: "categorias",
        },
      ],
    });
    if (resultValidation.isEmpty()) {
      const actualizado = await db.Producto.update(
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
            id_producto: id,
          },
        }
      );
      for (let i = 0; i < req.body.tag.length; i++) {
        const element = req.body.tag[i];
        
      }
      // for (let i = 0; i < producto.categorias.length; i++) {
      //   const element = producto.categorias[i].id_categoria;
      //   await db.ProductoCategoria.destroy({
      //     where: {
      //       id: element,
      //     },
      //   });
      // }

      if (actualizado) {
        res.redirect("/products");
      }
    } else {
      if (categorias && plataformas) {
        const categoriasFiltradas = categorias.filter(
          (categoria) =>
            !producto.categorias.find(
              (prodCategoria) =>
                prodCategoria.id_categoria === categoria.id_categoria
            )
        );
        res.render("productEdit", {
          categorias: categoriasFiltradas,
          plataformas: plataformas,
          usuario: req.session.userLogged,
          producto: req.body,
          error: errores,
        });
      }
    }
  },
  borrar: (req, res) => {
    db.Producto.destroy({
      where: {
        id_producto: req.params.id,
      },
    })
    .then(() => res.redirect("/products"))
    .catch((error) => console.log(error));
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
