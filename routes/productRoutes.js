// Módulos

const express = require("express");
const router = express.Router();

// Controladores

const productController = require("../controllers/productController");

// Ruteos

router.get("/", productController.products);
router.post("/", productController.store);
router.get("/detail/:id", productController.detail);
router.post("/detail/:id", productController.modify);
router.get("/create", productController.create);
router.get("/edit/:id", productController.edit);
router.put("/edit",productController.actualizar)

module.exports = router;
