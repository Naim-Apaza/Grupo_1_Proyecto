// Controlador de carrito
const db = require("../database/models/index.js");

const controller = {
  cart: async (req, res) => {
    try {
      const carrito = await db.Carrito.findAll({
        where: { id_carrito: req.session.userLogged.id_carrito },
        include: [
          {
            model: db.Producto,
            as: "productos",
          },
        ],
      });

      function calcularTotal(carrito) {
        let total = 0.0;

        carrito.forEach((itemCarrito) => {
          itemCarrito.productos.forEach((producto) => {
            const cantidad = producto.CarritoProducto.cantidad;
            const precio = producto.precio;
            const descuento = producto.cant_desc;

            const precioConDescuento = precio - precio * (descuento / 100);

            const subtotal = cantidad * precioConDescuento;

            total += subtotal;
          });
        });

        return total;
      }

      const total = calcularTotal(carrito);

      res.render("productCart", {
        carrito: carrito,
        total: total,
        usuario: req.session.userLogged,
      });
    } catch (error) {
      console.error(error);
      res.render("error", { error: "Problema conectando a la base de datos" });
    }
  },
  remover: async (req, res) => {
    try {
      const idProducto = req.params.id;

      const carrito = await db.Carrito.findByPk(
        req.session.userLogged.id_carrito,
        {
          include: [
            {
              model: db.Producto,
              as: "productos",
            },
          ],
        }
      );

      let productoEncontrado = carrito.productos.find(
        (p) => p.id_producto == idProducto
      );

      if (productoEncontrado) {
        await db.CarritoProducto.update(
          {
            cantidad: productoEncontrado.CarritoProducto.cantidad - 1,
          },
          {
            where: {
              id_carrito: req.session.userLogged.id_carrito,
              id_producto: idProducto,
            },
          }
        );

        res.redirect("/cart");
      }
    } catch (error) {
      console.error(error);
      res.render("error", { error: "Problema conectando a la base de datos" });
    }
  },
  quitar: async (req, res) => {
    try {
      const idProducto = req.params.id;

      const carrito = await db.Carrito.findByPk(
        req.session.userLogged.id_carrito,
        {
          include: [
            {
              model: db.Producto,
              as: "productos",
            },
          ],
        }
      );

      let productoEncontrado = carrito.productos.find(
        (p) => p.id_producto == idProducto
      );

      if (productoEncontrado) {
        await db.CarritoProducto.destroy({
          where: {
            id_carrito: req.session.userLogged.id_carrito,
            id_producto: idProducto,
          },
        });

        res.redirect("/cart");
      }
    } catch (error) {
      console.error(error);
      res.render("error", { error: "Problema conectando a la base de datos" });
    }
  },
  comprar: async (req, res) => {
    try {
      await db.Carrito.update(
        {
          status: 0,
        },
        {
          where: {
            id_usuario: req.session.userLogged.id_usuario,
            id_carrito: req.session.userLogged.id_carrito,
          },
        }
      );
      
      const carritoNuevo = await db.Carrito.create({
        status: 1,
        id_usuario: req.session.userLogged.id_usuario,
      });

      req.session.userLogged.id_carrito = carritoNuevo.id_carrito

      res.redirect("/")
    } catch (error) {
      console.error(error);
      res.render("error", { error: "Problema conectando a la base de datos" })
    }
  },
};

module.exports = controller;
