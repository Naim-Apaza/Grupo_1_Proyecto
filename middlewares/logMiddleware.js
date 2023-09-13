const fs = require("fs")
function logMiddleware(req,res,next){
   fs.writeFileSync('log.txt','Se ingreso en la pagina ' + req.url)
   //lo de arriba es para que escriba una oracion y se sobrescriba
   //fs.appendFileSync('log.txt','Se ingreso en la pagina' + req.url +"-")
   //este appendFile es para que se guarde pero no se sobreescriba
   next();
}

module.exports=logMiddleware