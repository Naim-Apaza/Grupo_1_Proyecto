// Controlador del registro
const path = require("path");
const controller = {
  register: (req, res) => {
    res.render("register");
  },
  saveRegister: (req, res) => {
    let saveImage = req.file;
    //console.log(saveImage)
    if (saveImage !== undefined) {
      let User = req.body;
      console.log(User);
      res.redirect("/products");
    } else {
      res.render("register");
    }
  },
};

module.exports = controller;
