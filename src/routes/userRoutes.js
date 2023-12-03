// Router

const express = require("express");
const router = express.Router();

// Controllador

const userController = require("../controllers/userController");

// Path

const path = require("path");

// Middlewares

const logUserMiddleware = require("../middlewares/logUserMiddleware");
const registerValidator = require("../middlewares/registerValidator");
const guestMiddleware = require("../middlewares/guestMiddleware"); 
const authMiddleware = require("../middlewares/authMiddleware");

// Multer

const multer = require("multer");
const multerDiskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    let folder = path.join(__dirname, "../../public/images/users/");
    callback(null, folder);
  },
  filename: (req, file, callback) => {
    //console.log(file)
    let imageName = "user-" + Date.now() + path.extname(file.originalname);
    callback(null, imageName);
  },
});

let fileUpload = multer({ storage: multerDiskStorage });

// Ruteos
router.post("/change-password", authMiddleware, userController.changePassword);
router.get("/profile", authMiddleware,userController.mostrarPerfil);
router.post("/profile", authMiddleware, userController.logout)
router.get("/login", guestMiddleware, userController.login);
router.post("/login", guestMiddleware,userController.loadLogin);
router.get("/register", guestMiddleware, userController.register);
router.post(
  "/register",
guestMiddleware,fileUpload.single("userImage"),registerValidator,
  logUserMiddleware,
  userController.saveRegister
);

module.exports = router;
