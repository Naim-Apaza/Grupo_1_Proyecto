// Middleware de sesiones

const fs = require("fs");
const path = require("path")

function logMiddleware(req, res, next) {
  fs.appendFileSync(path.join(__dirname, "../logs/log.txt"),
  `Se ingresó a la página ${req.url}.\n`);
  //lo de arriba es para que escriba una oracion y se sobrescriba
  //fs.appendFileSync('log.txt','Se ingreso en la pagina' + req.url +"-")
  //este appendFile es para que se guarde pero no se sobreescriba
  next();
}

module.exports = logMiddleware;
