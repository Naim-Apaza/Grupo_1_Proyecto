// Encriptador

const bcrypt = require("bcryptjs");

// Validador de resultados

const { validationResult } = require("express-validator");

// Usuarios

const db = require("../database/models/index.js");

// Controlador de usuarios

const controller = {
  register: (req, res) => {
    res.render("users/register", { errores: [] });
  },

  saveRegister: (req, res) => {
    let errors = validationResult(req);
    let saveImage = req.file;
    if (errors.isEmpty() && saveImage != null) {
      try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        db.Usuario.create({
          nombre: req.body.name,
          apellido: req.body.lastName,
          correo: req.body.correo,
          clave: hashedPassword,
          img_usuario: saveImage.filename,
        });

        // Responder con algún mensaje o redirigir a otra página
        res.redirect("/users/login");
      } catch (error) {
        console.error(error);
        res.render("users/register");
      }
    } else {
      res.render("users/register", { errores: errors.mapped(), old: req.body });
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
          req.session.userLogged = usuario;
          res.redirect("/");
        } else {
          res.render("users/login", {
            error: "Las credenciales son inválidas.",
          });
        }
      } else {
        res.render("users/login", { error: "No existe este usuario." });
      }
    } catch (error) {
      console.error(error);
      res.render("users/login");
    }
  },
  mostrarPerfil: async (req, res) => {
    const usuario = await db.Usuario.findOne({
      where: {
        correo: req.session.userLogged.correo,
      },
    });
    const rol = await db.Rol.findByPk(usuario.id_rol);
    res.render("users/profile", { usuario: usuario, rol: rol });
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
          rol: rol,
          error: "La contraseña actual es incorrecta.",
        });
      }
    } catch (error) {
      console.error(error);
      res.render("users/profile", {
        usuario: usuario,
        rol: rol,
        error: "Ha ocurrido un error al cambiar la contraseña.",
      });
    }
  },
};

module.exports = controller;
