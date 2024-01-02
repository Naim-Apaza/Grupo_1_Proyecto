// Módulos

const express = require("express");
const router = express.Router();

// Middleware
const authMiddleware = require("../middlewares/authMiddleware");

// Controlador

const cartController = require("../controllers/cartController");

// Ruteos

router.get("/", authMiddleware, cartController.cart);
router.put("/remove/:id", authMiddleware, cartController.remover)
router.delete("/delete/:id", authMiddleware, cartController.quitar)
router.put("/comprar", authMiddleware, cartController.comprar)

module.exports = router;
