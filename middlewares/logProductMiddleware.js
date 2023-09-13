const fs = require("fs")
function logProductMiddleware (req,res,next){
    fs.appendFileSync('logProduct.txt','Se creo un regitro al ingresar en ' + req.url)

    next()
}

module.exports=logProductMiddleware