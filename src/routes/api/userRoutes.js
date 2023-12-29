const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/userController');

router.get('/api/users/:id', userController.detail);

module.exports = router;