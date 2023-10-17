// Módulos

const express = require("express");
const router = express.Router();

//middleware
const authMiddleware = require("../middlewares/authMiddleware");

// Controladores

const cartController = require("../controllers/cartController");

// Ruteos

router.get("/", authMiddleware, cartController.cart);

module.exports = router;
