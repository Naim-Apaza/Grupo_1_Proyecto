// Módulos

const express = require('express');
const router = express.Router();

// Controlador 

const apiUserController = require('../../controllers/api/apiUserController');

// Ruteo

router.get('/api/users/:id', apiUserController.detail);
router.get('/api/users', apiUserController.listado);

module.exports = router;