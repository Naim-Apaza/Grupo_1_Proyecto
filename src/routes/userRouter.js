const express = require('express')
const router = express.Router();
const path = require("path");

const Usercontroller = require("../controllers/userController")


 router.get("/register",Usercontroller.register)

module.exports=router;