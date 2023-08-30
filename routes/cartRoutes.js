// Módulos

const express = require("express");
const router = express.Router();

// Controladores

const cartController = require("../controllers/cartController");

// Ruteos

router.get("/", cartController.cart);

module.exports = router;
