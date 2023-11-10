// Controlador de productos

const fs = require("fs");
const path = require("path");
const db = require("../database/models/index.js");
const Producto = require("../database/models/Producto.js");
const Op = db.Sequelize.Op;

/* let productsJSON = fs.readFileSync(
  path.join(__dirname, "../data/products.json"),
  "utf-8"
); 

let products = JSON.parse(productsJSON);
*/
const controller = {
  detail: (req, res) => {
   console.log("sdadsadad----------------------"+req.params.id)
    db.Producto.findByPk(req.params.id)
      .then(function(producto){
        console.log("sda-------"+producto)
        res.render("productDetail", 
        {
          producto:producto,
          usuario: req.session.userLogged 
        })
      })
      .catch(function(error){
        console.log(error)
        res.render("error404")
      })
  },
  products: (req, res) => {
    db.Producto.findAll({
      include:[{association:"plataformas"}]
    })
      .then(function(productos){  
            /* res.send(productos) */ 
          res.render("products", 
          {
            productos:productos,
            usuario: req.session.userLogged 
          });
        })
      .catch(function(error){
        console.log(error)
        res.render("error404")
      })
      },
  create: (req, res) => {
    db.Categoria.findAll()
      .then(function(categoria){
        db.Plataforma.findAll()
          .then(function(plataforma){
            res.render("productCreate", { 
              categoria:categoria,
              plataforma:plataforma,
              usuario: req.session.userLogged });
          })
          .catch(function(error){
            console.log(error)
            res.render("error404")
          })
      }) 
      .catch(function(error){
        console.log(error)
        res.render("error404")
      })
  },
  store: (req, res) => {
    let imageFile = req.file;
    console.log(imageFile)
    let product = req.body;
      console.log(product);
    if (imageFile !== undefined) {
      db.Producto.create({
        nombre:req.body.nombre,
        descripcion:req.body.detalle,
        precio:req.body.precio,
        img_prod:"images/products/"+req.file.filename,
        descuento:req.body.descuento,
        id_plataforma:req.body.plataforma,
      })
     /*  db.ProductoCategoria.create({
        id_categoria:req.body.tag,
        id_producto:req.body.id,
      }) */
      
      res.redirect("/");
    } else {
      res.render("productCreate");
    }
  },
  edit: (req, res) => {
    db.Categoria.findAll()
   .then(categoria=>{   
    db.Plataforma.findAll()
      .then(function(plataforma){
        db.Producto.findByPk(req.params.id,{
          include:[
            {association:"plataformas"}
          ]
        })
          .then(function(productsToEdit){
          res.render("productEdit",{
            categoria:categoria,
            plataforma:plataforma,
            usuario:req.session.userLogged, 
            productsToEdit: productsToEdit})
         })  
        .catch(function(error){
          console.log(error)
          res.render("error404")
        })
      })
    })
    .catch(function(error){
      console.log(error)
          res.render("error404")
    }) 
    /*  let idProduct = req.params.id;

    let productsToEdit = products.find((e) => e.id == idProduct);

    res.render("productEdit", { usuario: req.session.userLogged, productsToEdit: productsToEdit});
   */
  },
  actualizar: (req, res) => {
    db.Producto.update({
      nombre:req.body.nombre,
      precio:req.body.precio,
      descuento:req.body.descuento,
      descripcion:req.body.detalle,
      img_prod:"images/products/"+req.file.filename,
      id_plataforma:req.body.plataforma
    },{
  
      where:{
        id_producto:req.params.id
      }
    })

    let product = req.body;
    console.log("Producto guardado: ", product);
    res.redirect("/products");
  },
  borrar: (req, res) => {
/*     res.send(req.params.id)
 */    db.Producto.destroy({
        where:{
           id_producto:req.params.id
      }
    })
      .then(function(){
        console.log("Se borro el producto con ID:", req.params.id);
        res.redirect("/");
      })
    
   
  },
};

module.exports = controller;
