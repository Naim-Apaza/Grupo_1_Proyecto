// Middleware de validacion del registro

let path = require("path");
const { body } = require("express-validator");
const { Usuario } = require("../database/models");

const registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres."),
  body("lastName")
    .notEmpty()
    .withMessage("El apellido es obligatorio.")
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener al menos 2 caracteres."),
  body("correo")
    .notEmpty()
    .withMessage("El correo es obligatorio.")
    .isEmail()
    .withMessage("Debe ser un formato de e-mail válido.")
    .custom(async (value, { req }) => {
      const existingUser = await Usuario.findOne({ where: { correo: value } });
      if (existingUser) {
        throw new Error("El correo electrónico ya está registrado.");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres."),
  /* body("repass").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
  }), */
  body("userImage").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Debe subir una imagen.");
    }
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new Error(
        "La imagen debe tener una extensión válida (JPG, JPEG, PNG, GIF, WEBP)."
      );
    }
    return true;
  }),
];

module.exports = registerValidator;
