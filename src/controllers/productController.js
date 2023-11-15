// Controlador de productos
const fs = require("fs");
const path = require("path");
const db = require("../database/models/index.js");

const controller = {
  detail: (req, res) => {
    db.Producto.findByPk(req.params.id)
      .then(function (producto) {
       /*  res.status(200).json({
          data:producto,
          status:200
        }) */
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
       /*  return res.status(200).json({
          total:productos.length,
          data:productos,
          status:200
        }) */
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
    /* res.status(200).json({
      data:req.body,
      status:200
    }) */
    let imageFile = req.file;
/*     res.send(req.file.filename)
 */    if (imageFile !== undefined) {
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
    
    /*     res.send(req.params.id)
     */ db.Producto.destroy({
      where: {
        id_producto: req.params.id,
      },
    }).then(function (response) {
      /* return res.json(response) */
      res.redirect("/");
    });
  },
  search: async (req,res) => {
   let titulo = req.body.searcher 
   let products = await db.Producto.findAll({
    where:{
      nombre:{[Op.like]:`%${titulo}%`} 
    }
   })


   return res.render("search",
   {
    productos:products,
    usuario:req.session.userLogged,
   }) 
  }
};

module.exports = controller;
