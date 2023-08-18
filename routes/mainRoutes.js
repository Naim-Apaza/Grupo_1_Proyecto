// Módulos

const express = require("express");
const router = express.Router();
const mainController = require('../controllers/mainController')
const productController = require('../controllers/productController')
const loginController = require('../controllers/loginController')

// Ruteos

router.get('/', mainController.index)
router.get('/productDetail', productController.detail)
router.get('/login', loginController.login)

module.exports = router