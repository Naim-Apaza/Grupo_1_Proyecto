const express = require('express')
const router = express.Router();
const path = require("path");
const multer = require("multer")
const logUserMiddleware=require("../middlewares/logUserMiddleware")
const UserController = require("../controllers/userController")
 
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

router.get("/login", UserController.login);
router.post("/login",UserController.loadLogin)
router.get("/register",UserController.register);
router.post("/register",fileUpload.single("fotocopia"),logUserMiddleware,UserController.saveRegister) 

module.exports=router;