// Controlador de productos
const fs = require("fs").promises;
const db = require("../database/models/index.js");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const controller = {
  detail: async (req, res) => {
    try {
      const producto = await db.Producto.findByPk(req.params.id, {
        include: [
          { model: db.Plataforma, as: "plataformas" },
          { model: db.Categoria, as: "categorias" },
        ],
      });

      res.render("productDetail", {
        producto: producto,
        usuario: req.session.userLogged,
      });
    } catch (error) {
      res.render("error", { error: error });
    }
  },
  products: async (req, res) => {
    try {
      const productos = await db.Producto.findAll({
        include: [
          {
            model: db.Plataforma,
            as: "plataformas",
          },
        ],
      });

      res.render("products", {
        titulo: null,
        productos: productos,
        usuario: req.session.userLogged,
      });
    } catch (error) {
      res.render("error", { error: error });
    }
  },
  create: async (req, res) => {
    try {
      const categorias = await db.Categoria.findAll();
      const plataformas = await db.Plataforma.findAll();

      res.render("productCreate", {
        usuario: req.session.userLogged,
        categorias: categorias,
        plataformas: plataformas,
        imagen: null,
        errores: null,
        seleccionadas: null,
        old: null,
      });
    } catch (error) {
      res.render("error", { error: error });
    }
  },
  store: async (req, res) => {
    let errores = validationResult(req);
    if (errores.isEmpty()) {
      try {
        const producto = await db.Producto.create({
          nombre: req.body.nombre,
          descripcion: req.body.detalle,
          precio: req.body.precio,
          img_prod: req.file != undefined ? req.file.filename : "204.jpg",
          cant_desc: req.body.descuento,
          id_plataforma: req.body.plataforma,
        });

        for (let i = 0; i < req.body.tag.length; i++) {
          const tag = req.body.tag[i];
          await producto.addCategorias(Number(tag));
        }

        res.redirect("/");
      } catch (error) {
        res.render("error", { error: error });
      }
    } else {
      let categorias = await db.Categoria.findAll();
      const plataformas = await db.Plataforma.findAll();
      let seleccionadas =
        req.body.tag != undefined
          ? req.body.tag.map((tag) => Number(tag))
          : undefined;
      let categoriasFiltradas;
      let categoriasSeleccionadas;
      if (seleccionadas != undefined) {
        categoriasFiltradas = categorias.filter((categoria) => {
          return !seleccionadas.includes(categoria.id_categoria);
        });

        categoriasSeleccionadas = categorias.filter((categoria) => {
          return seleccionadas.includes(categoria.id_categoria);
        });
      }

      res.render("productCreate", {
        usuario: req.session.userLogged,
        categorias:
          categoriasFiltradas != undefined ? categoriasFiltradas : categorias,
        seleccionadas: categoriasSeleccionadas,
        plataformas: plataformas,
        errores: errores.mapped(),
        imagen: req.file != undefined ? req.file.filename : "204.jpg",
        old: req.body,
      });
    }
  },
  edit: async (req, res) => {
    try {
      const id = req.params.id;
      let categorias = await db.Categoria.findAll();
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
        old: null,
        producto: producto,
        errores: null,
        seleccionadas: null,
        imagen: "204.jpg",
      });
    } catch (error) {
      res.render("error", { error: error });
    }
  },
  actualizar: async (req, res) => {
    let errores = validationResult(req);
    const id = req.params.id;
    const oldProduct = await db.Producto.findOne({
      where: {
        id_producto: id,
      },
      include: [
        {
          model: db.Categoria,
          as: "categorias",
        },
      ],
    });
    if (errores.isEmpty()) {
      try {
        await db.Producto.update(
          {
            nombre: req.body.nombre,
            precio: req.body.precio,
            cant_desc: req.body.descuento,
            descripcion: req.body.detalle,
            img_prod:
              req.file != undefined ? req.file.filename : oldProduct.img_prod,
            id_plataforma: req.body.plataforma,
          },
          {
            where: {
              id_producto: id,
            },
          }
        );

        for (let i = 0; i < oldProduct.categorias.length; i++) {
          const idCategoria = oldProduct.categorias[i].id_categoria;
          await db.ProductoCategoria.destroy({
            where: {
              id: idCategoria,
            },
          });
        }

        for (let i = 0; i < req.body.tag.length; i++) {
          const idCategoria = req.body.tag[i];
          await oldProduct.addCategorias(Number(idCategoria));
        }

        res.redirect("/products/detail/" + id);

      } catch (error) {
        console.log(error);
        res.render("error", { error: error });
      }
    } else {
      const plataformas = await db.Plataforma.findAll();
      const categorias = await db.Categoria.findAll();
      const seleccionadas =
        req.body.tag != undefined
          ? req.body.tag.map((tag) => Number(tag))
          : undefined;
      let categoriasFiltradas;
      let categoriasSeleccionadas;
      if (seleccionadas != undefined) {
        categoriasFiltradas = categorias.filter(
          (categoria) => !seleccionadas.includes(categoria.id_categoria)
        );
        categoriasSeleccionadas = categorias.filter((categoria) =>
          seleccionadas.includes(categoria.id_categoria)
        );
      }

      res.render("productEdit", {
        categorias:
          categoriasFiltradas != undefined ? categoriasFiltradas : categorias,
        plataformas: plataformas,
        usuario: req.session.userLogged,
        seleccionadas: categoriasSeleccionadas,
        old: req.body,
        producto: null,
        imagen: req.file != undefined ? req.file.filename : oldProduct.img_prod,
        id: id,
        errores: errores.mapped(),
      });
    }
  },
  borrar: async (req, res) => {
    try {
      const producto = await db.Producto.findOne({
        where: {
          id_producto: req.params.id,
        },
      });
      await fs.unlink(`../../images/products/${producto.img_prod}`);
      const productoBorrado = await db.Producto.destroy({
        where: {
          id_producto: req.params.id,
        },
      });
      if (productoBorrado == 1) {
        res.redirect("/products");
      }
    } catch (error) {
      res.render("error", { error: error });
    }
  },
  search: async (req, res) => {
    try {
      const titulo = req.body.searcher;
      const productos = await db.Producto.findAll({
        where: {
          nombre: { [Op.like]: `%${titulo}%` },
        },
        include: [
          {
            model: db.Plataforma,
            as: "plataformas",
          },
        ],
      });

      res.render("products", {
        titulo: titulo,
        productos: productos,
        usuario: req.session.userLogged,
      });
    } catch (error) {
      res.render("error", { error: error });
    }
  },
};

module.exports = controller;
