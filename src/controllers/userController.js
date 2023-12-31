const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models/index.js");

// Controlador de usuarios

const controller = {
  register: (req, res) => {
    res.render("users/register", { imagen: null });
  },

  saveRegister: async (req, res) => {
    let errores = validationResult(req);
    let saveImage = req.file;
    if (errores.isEmpty()) {
      try {
        const hashedPassword = await bcrypt.hashSync(req.body.password, 10);

        await db.Usuario.create({
          nombre: req.body.name,
          apellido: req.body.lastName,
          correo: req.body.correo,
          clave: hashedPassword,
          img_usuario:
            saveImage != undefined ? saveImage.filename : "default.jpg",
          id_rol: 1,
        });

        // Responder con algún mensaje o redirigir a otra página
        res.redirect("/users/login");
      } catch (error) {
        console.log(error)
        res.render("error", {
          error: "Problema conectando a la base de datos",
        });
      }
    } else {
      res.render("users/register", {
        errores: errores.mapped(),
        old: req.body,
        imagen: saveImage != undefined ? saveImage.filename : "default.jpg",
      });
    }
  },
  login: (req, res) => {
    res.render("users/login", { error: null });
  },
  loadLogin: async function (req, res) {
    try {
      const usuario = await db.Usuario.findOne({
        where: { correo: req.body.correo },
        include: [{ model: db.Carrito, as: "carritos" }],
      });
      if (usuario) {
        const validarPass = await bcrypt.compare(
          req.body.password,
          usuario.clave
        );
        if (validarPass) {
          let loginData = {
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            img_usuario: usuario.img_usuario,
            id_rol: usuario.id_rol
          }

          let carrito = usuario.carritos.find((cart) => cart.status == true);

          if (carrito) {
            loginData.id_carrito = carrito.id_carrito;
          } else {
            const carrito = await db.Carrito.create({
              status: 1,
              id_usuario: usuario.id_usuario,
            });
            loginData.id_carrito = carrito.id_carrito;
          }

          req.session.userLogged = loginData;
          res.redirect("/");
        } else {
          res.render("users/login", {
            old: req.body,
            error: "Contraseña incorrecta.",
          });
        }
      } else {
        res.render("users/login", {
          old: req.body,
          error: "No existe un usuario con este correo.",
        });
      }
    } catch (error) {
      res.render("error", { error: "Problema conectando a la base de datos" });
    }
  },
  mostrarPerfil: async (req, res) => {
    try {
      const usuario = await db.Usuario.findOne({
        where: {
          correo: req.session.userLogged.correo,
        },
        include: [{ model: db.Carrito, as: "carritos" }],
      });

      res.render("users/profile", { usuario: usuario });
    } catch (error) {
      res.render("error", { error: "Problema conectando a la base de datos" });
    }
  },

  logout: async (req, res) => {
    req.session.destroy(() => {
      res.redirect("/users/login");
    });
  },

  changePassword: async (req, res) => {
    try {
      const usuario = await db.Usuario.findOne({
        where: {
          correo: req.session.userLogged.correo,
        },
        include: [{ model: db.Carrito, as: "carritos" }],
      });

      const validarPass = await bcrypt.compare(
        req.body.currentPassword,
        usuario.clave
      );

      if (validarPass) {
        const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
        await db.Usuario.update(
          { clave: hashedPassword },
          { where: { correo: req.session.userLogged.correo } }
        );
        res.redirect("/users/profile");
      } else {
        res.render("users/profile", {
          usuario: usuario,
          error: "La contraseña actual es incorrecta.",
        });
      }
    } catch (error) {
      res.render("error", { error: "Problema conectando a la base de datos" });
    }
  },
};

module.exports = controller;
