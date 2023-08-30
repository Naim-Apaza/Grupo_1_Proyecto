// Módulos

const express = require("express");
const router = express.Router();

// Controladores

const mainController = require("../controllers/mainController");
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");

// Ruteos

router.get("/", mainController.index);
router.get("/login", loginController.login);
router.get("/register", registerController.register);

module.exports = router;
