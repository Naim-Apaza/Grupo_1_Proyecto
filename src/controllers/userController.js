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
    let saveImage = req.file.filename;
    if (errors.isEmpty()) {
      try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const usuario = {
          nombre: req.body.name,
          apellido: req.body.lastName,
          correo: req.body.correo,
          clave: hashedPassword,
          img_usuario: saveImage,
          id_rol: 1,
        };
        db.Usuario.create(usuario);
        res.redirect("/users/login");
      } catch (error) {
        console.error(error);
        res.render("users/register");
      }
    } else {
      res.render("users/register", { errores: errors.array() });
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
        correo: req.session.userLogged.correo
      }
    })
    const rol = await db.Rol.findByPk(usuario.id_rol)
    res.render("users/profile", { usuario: usuario, rol: rol});
  },
};

module.exports = controller;
