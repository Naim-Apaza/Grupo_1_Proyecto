// Middleware de validacion del registro

const { body } = require('express-validator')

const registerValidator = [
    body('repass').custom((value, { req }) => {
        return value === req.body.password;
    })
]

module.exports = registerValidator