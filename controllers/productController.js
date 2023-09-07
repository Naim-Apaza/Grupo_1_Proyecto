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
  store: (req, res) => {
    console.log(req.body);
  },
  edit: (req, res) => {
    res.render("productEdit");
  },
  modify: (req, res) => {
    console.log(req.body);
  }
};

module.exports = controller;
