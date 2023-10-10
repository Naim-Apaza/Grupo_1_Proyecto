const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const logUserMiddleware = require("../middlewares/logUserMiddleware");
const userController = require("../controllers/userController");

// Multer

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

router.get("/login", userController.login);
router.post("/login", userController.loadLogin);
router.get("/register", userController.register);
router.post(
  "/register",
  fileUpload.single("fotocopia"),
  logUserMiddleware,
  userController.saveRegister
);

module.exports = router;
