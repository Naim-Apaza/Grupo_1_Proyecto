// Controlador de productos

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
  edit: (req, res) => {
    res.render("productEdit");
  },
};

module.exports = controller;
