// Módulos

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Controladores

const productController = require("../controllers/productController");
//Middlewares

const logProductMiddleware = require("../middlewares/logProductMiddleware");
//multer

const multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    let folder = path.join(__dirname, "../public/images/products");
    callback(null, folder);
  },
  filename: (req, file, callback) => {
    //console.log(file)
    let imageName = "product-" + Date.now() + path.extname(file.originalname);
    callback(null, imageName);
  },
});

let fileUpload = multer({ storage: multerDiskStorage });

// Ruteos

router.get("/", productController.products);

router.get("/detail/:id", productController.detail);
router.get("/create", productController.create);
router.post(
  "/create",
  logProductMiddleware,
  fileUpload.single("imagen"),
  productController.store
);
router.get("/edit/:id", productController.edit);
router.put("/edit/:id", fileUpload.single("imagen"), productController.actualizar);
router.delete("/:id", productController.borrar);

module.exports = router;
