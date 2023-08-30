// Módulos

const express = require("express");
const router = express.Router();

// Controladores

const productController = require("../controllers/productController");

// Ruteos

router.get('/', productController.products)
router.get("/detail", productController.detail);

module.exports = router;
