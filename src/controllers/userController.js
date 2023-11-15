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
  saveRegister: (req, res) => {
    let errors = validationResult(req);
    /* res.send(errors) */
    
  let saveImage = req.file;
   
    if (errors.isEmpty()) {
      if (saveImage != undefined) {
        //Hash de la contraseña
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        // Agregar los datos del nuevo registro al arreglo de usuarios
        users.push({
          id: 6,
          firstName: req.body.name,
          lastName: req.body.lastName,
          email: req.body.correo,
          password: hashedPassword,
          userImage: saveImage.filename,
        });

        // Convertir el objeto actualizado a formato JSON
        const updatedJson = JSON.stringify(users, null, 2);

        // Escribir los datos actualizados en el archivo JSON
        fs.writeFileSync(userPath, updatedJson);

        // Responder con algún mensaje o redirigir a otra página
        res.redirect("/users/login");
      } else {
        console.log("Ocurrió un error guardando la imagen :(");
        res.render("users/register");
      }
    } else {
      res.render("users/register", { errores: errors.mapped(),old: req.body });
    }
  },
  login: (req, res) => {
    res.render("users/login", { error: null });
  },
  loadLogin: (req, res) => {
    let usuario = users.find((user) => user['email'] === req.body.correo);

    if (usuario) {
      let validarPass = bcrypt.compareSync(req.body.password, usuario.password);

      if (validarPass) {
        delete usuario.password;
        req.session.userLogged = usuario
        res.redirect("/");
      }

      res.render('users/login', { error: 'Las credenciales son inválidas.'})
    }

    res.render('users/login', { error: 'No existe este usuario.' })
  },
};

module.exports = controller;
