// Módulos

const express = require("express");
const router = express.Router();
const mainController = require('../controllers/mainController')
const productController = require('../controllers/productController')

// Ruteos

router.get('/', mainController.index)
router.get('/productDetail', productController.detail)

module.exports = router