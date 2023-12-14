// Encriptador

const bcrypt = require("bcryptjs");

// Validador de resultados

const { validationResult } = require("express-validator");

// Usuarios

const db = require("../database/models/index.js");

// Controlador de usuarios

const controller = {
  register: (req, res) => {
    res.render("users/register", { errores: [], imagen: null });
  },

  saveRegister: async (req, res) => {
    let errores = validationResult(req);
    let saveImage = req.file;
    if (errores.isEmpty()) {
      try {
        const hashedPassword = await bcrypt.hashSync(req.body.password, 10);

        const producto = await db.Usuario.create({
          nombre: req.body.name,
          apellido: req.body.lastName,
          correo: req.body.correo,
          clave: hashedPassword,
          img_usuario: saveImage != undefined ? saveImage.filename : "204.jpg",
          id_rol: 1,
        });

        // Responder con algún mensaje o redirigir a otra página
        res.redirect("/users/login");
      } catch (error) {
        res.render("error", { error: error });
      }
    } else {
      res.render("users/register", {
        errores: errores.mapped(),
        old: req.body,
        imagen: saveImage != null ? saveImage.filename : "204.jpg",
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
      });
      if (usuario) {
        const validarPass = await bcrypt.compare(
          req.body.password,
          usuario.clave
        );
        if (validarPass) {
          delete usuario.clave;
          delete usuario.id_rol;
          req.session.userLogged = usuario;
          res.redirect("/");
        } else {
          res.render("users/login", {
            error: "Las credenciales son inválidas.",
          });
        }
      } else {
        res.render("users/login", { error: "Correo incorrecto." });
      }
    } catch (error) {
      res.render("error", { error: error });
    }
  },
  mostrarPerfil: async (req, res) => {
    try {
      const usuario = await db.Usuario.findOne({
        where: {
          correo: req.session.userLogged.correo,
        },
      });

      res.render("users/profile", { usuario: usuario });
    } catch (error) {
      res.render("error", { error: error });
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
      res.render("error", { error: error });
    }
  },
};

module.exports = controller;
