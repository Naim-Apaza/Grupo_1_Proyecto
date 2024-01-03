// Módulos

const express = require("express")
const router = express.Router()

// Controlador

const apiProductController = require("../../controllers/api/apiProductController")

// Ruteo

router.get("/api/products/",apiProductController.list);
router.get("/api/products/:id",apiProductController.idProduct)
router.post("/api/products/",apiProductController.createProduct)
router.delete("/api/products/:id",apiProductController.deleteProduct)

module.exports = router;