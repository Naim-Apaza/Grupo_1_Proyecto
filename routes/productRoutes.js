// Módulos

const express = require("express");
const router = express.Router();

// Controladores

const productController = require("../controllers/productController");

// Ruteos

router.get('/', productController.products)
router.get("/detail", productController.detail);
router.get("/create", productController.create);
router.get("/edit", productController.edit);

module.exports = router;
