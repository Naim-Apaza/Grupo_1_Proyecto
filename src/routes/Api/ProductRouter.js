const express = require("express")
const routes = express.Router()

const ApiControllerProduct = require("../../controllers/Api/ApiProductController")

routes.get("/Products/",ApiControllerProduct.list);
routes.get("/Products/:id",ApiControllerProduct.idProduct)
routes.post("/Products/",ApiControllerProduct.createProduct)
routes.delete("/Products/:id",ApiControllerProduct.deleteProduct)
module.exports = routes;