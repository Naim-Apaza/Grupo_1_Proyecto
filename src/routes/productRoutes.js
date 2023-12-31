// Módulos

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Controladores

const productController = require("../controllers/productController");

//Middlewares

const logProductMiddleware = require("../middlewares/logProductMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const productMiddleware = require("../middlewares/productValidator");

// Multer

const multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    let folder = path.join(__dirname, "../../public/images/products");
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
router.post("/", productController.search)
router.get("/detail/:id", authMiddleware, productController.detail);
router.post("/detail/:id", authMiddleware, productController.agregar)
router.get("/create", authMiddleware, productController.create);
router.post(
  "/create",
  authMiddleware,
  logProductMiddleware,
  fileUpload.single("imagen"),
  productMiddleware,
  productController.store
);
router.get("/edit/:id", authMiddleware, productController.edit);
router.put("/edit/:id", authMiddleware, fileUpload.single("imagen"), productMiddleware, productController.actualizar);
router.delete("/delete/:id", authMiddleware, productController.borrar);

module.exports = router;
