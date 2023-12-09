// Controlador de productos
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
        old: null
      });
    } catch (error) {
      res.render("error", { error: error });
    }
  },
  store: async (req, res) => {
    try {
      let resultValidation = validationResult(req);
      let errores = resultValidation.mapped();
      if (resultValidation.isEmpty()) {
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
        const categorias = db.Categoria.findAll();
        const plataformas = db.Plataforma.findAll();
        const seleccionadas = req.body.tag
        const categoriasFiltradas = await categorias.filter(
          (categoria) =>
            !seleccionadas.find(
              (prodCategoria) =>
                prodCategoria.id_categoria === categoria.id_categoria
            )
        );

        res.render("productCreate", {
          usuario: req.session.userLogged,
          categorias: categoriasFiltradas,
          plataformas: plataformas,
          errores: errores,
          imagen: req.file.filename,
          old: req.body
        })
      }
    } catch (error) {
      res.render("error", {error: error})
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

      const categoriasFiltradas = await categorias.filter(
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
    } catch (error) {
      res.render("error", { error: error });
    }
  },
  actualizar: async (req, res) => {
    let resultValidation = validationResult(req);
    let errores = resultValidation.mapped();
    const id = req.params.id;
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
        res.redirect("/detail/" + id);
      }
    } else {
      const plataformas = await db.Plataforma.findAll();
      const categorias = await db.Categoria.findAll();
      const seleccionadas = req.body.tag;
      const categoriasFiltradas = categorias.filter(
        (categoria) =>
          !seleccionadas.find(
            (prodCategoria) =>
              prodCategoria.id_categoria === categoria.id_categoria
          )
      );

      res.render("productEdit", {
        categorias: categoriasFiltradas,
        plataformas: plataformas,
        usuario: req.session.userLogged,
        producto: req.body,
        img: req.file.filename,
        id: id,
        error: errores,
      });
    }
  },
  borrar: async (req, res) => {
    try {
      const productoBorrado = await db.Producto.destroy({
        where: {
          id_producto: req.params.id,
        },
      });
      if (productoBorrado) {
        return res.json(productoBorrado);
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
