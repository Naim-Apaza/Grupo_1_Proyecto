// Controlador de usuarios
const bcrypt = require('bcryptjs');
const path = require("path");
const fs = require("fs");

const userPath = path.join(__dirname, "../data/users.json");
const usersJSON = fs.readFileSync(userPath);
const users = JSON.parse(usersJSON);

const controller = {
  register: (req, res) => {
    res.render("users/register");
  },
  saveRegister: (req, res) => {
    let saveImage = req.file.filename;

    if (saveImage != undefined) {
      //Hash de la contraseña
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      
      // Agregar los datos del nuevo registro al arreglo de usuarios
      users.push({
        ...req.body,
        password: hashedPassword,
        repass: hashedPassword,
        fotocopia: saveImage,
      });

      // Convertir el objeto actualizado a formato JSON
      const updatedJson = JSON.stringify(users, null, 2);

      // Escribir los datos actualizados en el archivo JSON
      fs.writeFileSync(userPath, updatedJson);

      // Responder con algún mensaje o redirigir a otra página
      res.redirect("/users/login");
    } else {
      console.log("Ocurrió un error guardando la imagen :(")
      res.render("users/register")
    }
  },
  login: (req, res) => {
    res.render("users/login");
  },
  loadLogin: (req, res) => {
    let save_Login = req.body;
    res.redirect("/products");
  },
};

module.exports = controller;
