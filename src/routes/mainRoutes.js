// Módulos
const fs = require("fs")
const express = require("express");
const router = express.Router();
const path = require("path")

// Controladores

const mainController = require("../controllers/mainController");
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const multer = require("multer")
//Middlewares

const logUserMiddleware=require("../middlewares/logUserMiddleware")
//Multer

const multerDiskStorage = multer.diskStorage({
    destination:(req,file,callback)=>{
     let folder = path.join(__dirname, '../public/images/user')
     callback(null, folder)   
    },
    filename: (req,file,callback)=>{
        //console.log(file)
        let imageName = "user-"+Date.now() + path.extname(file.originalname)
        callback(null,imageName)
    } 
})

let fileUpload = multer({ storage:multerDiskStorage}) 
// Ruteos

router.get("/", mainController.index);
router.get("/login", loginController.login);
router.post("/login",loginController.loadLogin)
router.get("/register",registerController.register);
router.post("/register",fileUpload.single("fotocopia"),logUserMiddleware,registerController.saveRegister)


module.exports = router;
