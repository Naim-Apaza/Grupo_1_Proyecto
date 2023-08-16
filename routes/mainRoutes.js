// Módulos

const express = require("express");
const router = express.Router();
const mainController = require('../controllers/mainController')

// Ruteos

router.get('/', mainController.index)

module.exports = router