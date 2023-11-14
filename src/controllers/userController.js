// Modulos de control de archivos

const path = require("path");
const fs = require("fs");

// Encriptador

const bcrypt = require("bcryptjs");

// Validador de resultados

const { validationResult } = require("express-validator");

// Usuarios

const userPath = path.join(__dirname, "../data/users.json");
const usersJSON = fs.readFileSync(userPath);
const users = JSON.parse(usersJSON);
const db = require("../database/models/index.js");

// Controlador de usuarios

const controller = {
  register: (req, res) => {
    res.render("users/register", { errores: [] });
  },

  saveRegister: async function(req, res) {
    let errors = validationResult(req);
    let saveImage = req.file.filename;
    if (errors.isEmpty()) {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const usuario = await db.Usuario.create({
          nombre: req.body.name,
          apellido: req.body.lastName,
          correo: req.body.correo,
          clave: hashedPassword,
          img_usuario: saveImage,
          id_rol: null
        });
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
  loadLogin: async function(req, res) {
    try {
      const usuario = await db.Usuario.findOne({
        where: { correo: req.body.correo }
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
          res.render("users/login", { error: "Las credenciales son inválidas." });
        }
      } else {
        res.render("users/login", { error: "No existe este usuario." });
      }
    } catch (error) {
      console.error(error);
      res.render("users/login");
    }
  },
  create: async function(req, res) {
    try {
      const usuario = await db.Usuario.create({
        nombre: req.body.name,
        apellido: req.body.lastName,
        correo: req.body.correo,
        clave: req.body.password,
        img_usuario: req.file.filename,
        id_rol: null
      });
      return res.redirect("/user/login");
    } catch (error) {
      console.error(error);
      return res.render("users/register");
    }
  },

  mostrarPerfil: (req, res) => {
    res.render("profile", { usuario: req.session.userLogged });
  },
  };


module.exports = controller;
