const { body } = require("express-validator");

module.exports = [
  body("nombre")
    .notEmpty()
    .withMessage(
      "El nombre es obligatorio"
    )
    .isLength({ min: 5, max: 60 })
    .withMessage(
      "El titulo del juego debe tener como minimo 5 caracteres y como maximo 60"
    ),
  body("precio")
    .custom((value) => {
      const numericValue = parseFloat(value.replace(",", ".")); // Reemplazar comas por puntos para aceptar formatos como '13,45'
      if (isNaN(numericValue)) {
        throw new Error("El precio debe ser un valor numérico válido.");
      }
      return true;
    })
    .withMessage("El precio NO puede contener letras, signos, etc."),
  body("descuento")
    .optional({ checkFalsy: true })
    .isInt({
      min: 0,
      max: 100,
      allow_leading_zeroes: false,
      allow_negatives: false,
    })
    .withMessage("El descuento debe ser un numero entero entre 0 y 100."),
  body("detalle")
    .notEmpty()
    .withMessage(
      "La descripción es obligatoria"
    )
    .isLength({ min: 20 })
    .withMessage(
      "El detalle debe tener como minimo 20 caracteres."
    ),
  body("plataforma")
    .notEmpty()
    .withMessage("Debe de elegir alguna plataforma."),
  body("tag").notEmpty().withMessage("Debe de elegir alguna categoria."),
  body("imagen").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Debe seleccionar una imagen.");
    }
    value = req.file.originalname;
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const fileExtension = value.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      req.file.path = undefined;
      throw new Error("La imagen debe ser JPG, JPEG, PNG, WEBP o GIF.");
    }

    return true;
  }),
];
