// Middleware de usuarios

const fs = require("fs");
const path = require("path")

function logUserMiddleware(req, res, next) {
  fs.appendFileSync(
    path.join(__dirname, "../logs/logUser.txt"),
    `Se creo un regitro de usuario al ingresar en ${req.url}.\n`
  );

  next();
}

module.exports = logUserMiddleware;
