// Controlador de usuarios

const path = require("path");
const fs = require("fs");

const controller = {
  register: (req, res) => {
    res.render("users/register");
  },
  saveRegister: (req, res) => {
    let saveImage = req.file;
    //console.log(saveImage)
    if (saveImage !== undefined) {
      let User = req.body;
      console.log(User);
      res.redirect("/products");
    } else {
      res.render("users/register");
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

module.exports = controller