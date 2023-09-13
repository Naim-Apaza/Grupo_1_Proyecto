// Middleware de productos

const fs = require("fs");
const path = require("path");

function logProductMiddleware(req, res, next) {
  fs.appendFileSync(
    path.join(__dirname, "../logs/logProduct.txt"),
    `Se creo un regitro al ingresar en ${req.url}.\n`
  );

  next();
}

module.exports = logProductMiddleware;
