const fs = require("fs")
function logUserMiddleware (req,res,next){
    fs.writeFileSync('logUser.txt','Se creo un regitro de usuario al ingresar en ' + req.url)

    next()
}

module.exports=logUserMiddleware