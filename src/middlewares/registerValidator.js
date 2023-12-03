// Middleware de validacion del registro
let path = require("path");
const { body } = require("express-validator");

const registerValidator = [
  body("name").notEmpty().withMessage("debes completar el campo nombre"),
  body("lastName").notEmpty().withMessage("Debes completar el campo apellido"),
  body("correo").isEmail().withMessage("debe ser un correo valido"),
  body("password").notEmpty().withMessage("debe completar el campo contraseña"),
  body("userImage").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif"];
    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtensions = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtensions)) {
        throw new Error(
          "Las extensiones de archivos permitidas son JPG PNG GIF"
        );
      }
    }

    return true;
  }),
  body("repass").custom((value, { req }) => {
    return value === req.body.password;
  }),
];

module.exports = registerValidator;
