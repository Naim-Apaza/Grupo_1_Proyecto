
const path = require("path");
const fs = require("fs");
const db = require("../database/models")
const Op=db.Sequelize.Op

function recordameMiddleware(req,res,next){
    if(req.cookies.recordame != undefined && 
        req.session.userLogged==undefined)
    {
        db.Users.findOne({
            where:{
              dirreccion:req.cookie.recordame
            }
          }).then(function(usuario){
           /*  console.log("usuario "+usuario) */
          if (usuario){
            let validarPass = bcrypt.compareSync(req.body.password, usuario.password);
           if (validarPass) {
              delete usuario.password;
              req.session.userLogged = usuario
              usuarioLoguedo=req.session.userLogged;
            }
          }})
          .catch(function(error){
          res.render('error404')
          })
    }
    next();

}

module.exports = recordameMiddleware