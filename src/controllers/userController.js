const path = require('path')
const fs = require("fs")
module.exports={
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
      login: (req, res) => {
        res.render("login");
      },
      loadLogin: (req, res) => {
        let save_Login = req.body;
        res.redirect("/products");
      },
}