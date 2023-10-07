// Controlador de productos

const fs = require("fs");
const path = require("path");

let productsJSON = fs.readFileSync(
  path.join(__dirname, "../data/products.json"),
  "utf-8"
);

let products = JSON.parse(productsJSON);

const controller = {
  detail: (req, res) => {
    res.render("productDetail");
  },
  products: (req, res) => {
    res.render("products");
  },
  create: (req, res) => {
    res.render("productCreate");
  },
  store: (req, res) => {
    let imageFile = req.file;
    //console.log(imageFile)
    if (imageFile !== undefined) {
      let product = req.body;
      console.log(product);
      res.redirect("/");
    } else {
      res.render("productCreate");
    }
  },
  edit: (req, res) => {
    let idProduct = req.params.id;

    let productsToEdit = products.find((e) => e.id == idProduct);

    res.render("productEdit", { productsToEdit: productsToEdit });
  },
  actualizar: (req, res) => {
    let product = req.body;
    console.log("Producto guardado: ", product);
    res.redirect("/products");
  },
  borrar: (req, res) => {
    let productId = req.params.id;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == productId) {
        products.slice(products[i])
      }
      break;
    }
    console.log("Se borro el producto con ID:", productId);
    res.redirect("/");
  },
};

module.exports = controller;
