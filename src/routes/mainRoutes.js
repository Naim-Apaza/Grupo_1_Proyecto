// Módulos
const fs = require("fs")
const express = require("express");
const router = express.Router();
const path = require("path")

// Controladores

const mainController = require("../controllers/mainController");

// Ruteos

router.get("/", mainController.index);


module.exports = router;
